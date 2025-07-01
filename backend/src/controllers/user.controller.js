const User = require("../models/user.model");
const { hashPassword } = require("../utils/authUtils");
const errorHandler = require("../utils/error");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function updateProfile(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json(errorHandler(404, 'User not found'));
    }

    // Update fields
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) {
      user.password = await hashPassword(req.body.password);
    }

    // Upload image if present
    if (req.file) {
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "profile_images",
              public_id: user.username, 
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req.file.buffer);
      user.profilePicture = result.secure_url;
    }

    await user.save();

    const { password, ...rest } = user.toObject();
    return res.status(200).json({
      message: "Profile updated successfully",
      user: rest,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(errorHandler(500, "Something went wrong while updating profile"));
  }
}


module.exports = {
  updateProfile,
};
