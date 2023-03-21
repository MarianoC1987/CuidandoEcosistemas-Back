const express = require("express");
const {
  createUser,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require("../controllers/authController");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:token", resetPassword);

// Protect all routes after this middleware
router.use(protect);

router.get("/me", getMe, getUserById);
router.patch("/updatemypassword", updatePassword);
router.patch("/updateme", uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete("/deleteme", deleteMe);

router.use(restrictTo("admin"));

router.get("/getusers", getAllUsers);
router.get("/getusers/:id", getUserById);
router.patch("/updateuser/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
