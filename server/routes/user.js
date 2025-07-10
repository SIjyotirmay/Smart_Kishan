const express = require("express");
const router = express.Router();
const uc = require("../controller/user_cont");

// Requires express-fileupload middleware
router.post("/create", uc.addUser);
router.get("/all", uc.getAllUsers);
router.post("/delete", uc.deleteUser);
router.get("/getuser", uc.getUserById); // for edit user
router.post("/update", uc.updateUser);
router.post("/login", uc.login);

module.exports = router;
