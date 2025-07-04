const express = require("express");
const router = express.Router();
const uc = require("../controller/user_cont");

router.post("/reg", uc.adduser);
router.post("/login", uc.login);

module.exports = router;
