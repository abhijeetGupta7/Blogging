const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } = require("../config/server-config");
const User = require("../models/user.model");
const { hashPassword } = require("../utils/authUtils");
const errorHandler = require("../utils/error");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Cloudinary Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

async function updateProfile(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json(errorHandler(404, 'User not found'));
    }

    // Update basic fields
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) {
      user.password = await hashPassword(req.body.password);
    }

    // Upload new image if provided
    if (req.file) {
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "profile_images",
              public_id: req.user.id, 
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

async function deleteUser(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json(errorHandler(404, "User not found"));
    }

    // Delete profile image if exists
    if (user.profilePicture) {
      try {
        await cloudinary.uploader.destroy(`profile_images/${req.user.id}`);
      } catch (err) {
        console.log("Cloudinary image deletion failed:", err.message);
      }
    }

    const deletedUser = await User.findByIdAndDelete(req.user.id);

    if (deletedUser) {
      return res.status(200).json({
        message: "User deleted successfully",
      });
    } else {
      return res.status(404).json(errorHandler(404, 'User not found '));
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json(errorHandler(500, "Something went wrong while deleting user"));
  }
}

async function deleteUserByAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  
  try {
    const user = await User.findById(req.params.userId); 
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    
    // Delete profile image if exists
    if (user.profilePicture) {
      try {
        await cloudinary.uploader.destroy(`profile_images/${user._id}`);  
      } catch (err) {
        console.log("Cloudinary image deletion failed:", err.message);
      }
    }
    
    await User.findByIdAndDelete(req.params.userId);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(errorHandler(500, 'Something went wrong while deleting user'));
  }
}

async function signoutUser(req, res) {
  try {
    res
      .clearCookie('access_token', {
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'User signed out successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(errorHandler(500, 'Something went wrong'));
  }
}

async function getUsers(req,res,next) {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user.toObject();
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateProfile,
  deleteUser,
  signoutUser,
  getUsers,
  deleteUserByAdmin
}
