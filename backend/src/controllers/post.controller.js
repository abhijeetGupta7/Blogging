const { StatusCodes } = require('http-status-codes');
const errorHandler = require('../utils/error.js');
const Post = require('../models/post.model.js');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const config = require('../config/server-config');

// Cloudinary Configuration
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

// Create Post
const createPost = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(StatusCodes.FORBIDDEN, 'You are not allowed to create a post'));
    }

    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }

    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');

    let imageUrl;

    // Cloudinary image upload logic
    if (req.file) {
        const publicId = `${req.body.title.replace(/\s+/g, '-')}-${Date.now()}`;
        const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "blog_images",
                        public_id: publicId,
                        overwrite: true,
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                streamifier.createReadStream(buffer).pipe(stream);
            });
        };

        try {
            const result = await streamUpload(req.file.buffer);
            imageUrl = result.secure_url;
        } catch (err) {
            return next(errorHandler(500, 'Image upload failed'));
        }
    }

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
        ...(imageUrl && { image: imageUrl }), // Only override if image was uploaded
    });

    try {
        const savedPost = await newPost.save();
        return res.status(StatusCodes.CREATED).json(savedPost);
    } catch (error) {
        next(error);
    }
};

// Get Posts
const getPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && req.query.category!=='uncategorized' && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalPosts = await Post.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        return res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Post
const deletePost = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(StatusCodes.FORBIDDEN, 'You are not allowed to delete this post'));
    }

    try {
        await Post.findByIdAndDelete(req.params.postId);
        return res.status(200).json('The post has been deleted');
    } catch (error) {
        next(error);
    }
};

// Update Post
const updatePost = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(StatusCodes.FORBIDDEN, 'You are not allowed to update this post'));
    }

    try {
        const existingPost = await Post.findById(req.params.postId);
        if (!existingPost) {
            return next(errorHandler(StatusCodes.NOT_FOUND, 'Post not found'));
        }

        let imageUrl = existingPost.image; // Default to current image

        // Handle new image upload if provided
        if (req.file) {
            const publicId = `${req.body.title.replace(/\s+/g, '-')}-${Date.now()}`;
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "blog_images",
                            public_id: publicId,
                            overwrite: true,
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    streamifier.createReadStream(buffer).pipe(stream);
                });
            };

            try {
                const result = await streamUpload(req.file.buffer);
                imageUrl = result.secure_url;
            } catch (err) {
                return next(errorHandler(500, 'Image upload failed'));
            }
        }

        const slug = req.body.title
            ? req.body.title
                  .split(' ')
                  .join('-')
                  .toLowerCase()
                  .replace(/[^a-zA-Z0-9-]/g, '')
            : existingPost.slug;

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: {
                    title: req.body.title || existingPost.title,
                    content: req.body.content || existingPost.content,
                    category: req.body.category || existingPost.category,
                    image: imageUrl,
                    slug: slug,
                },
            },
            { new: true }
        );

        return res.status(StatusCodes.OK).json(updatedPost);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPost,
    getPosts,
    deletePost,
    updatePost,
};
