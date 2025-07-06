const express = require("express");
const router = express.Router();
const controller = require("../controller/scheme_cont");

router.post("/add", controller.addScheme);       // Admin adds scheme
router.get("/all", controller.getSchemes);       // User views schemes

module.exports = router;
