const express = require("express");
const router = express.Router();
const sc = require("../controller/scheme_cont");

router.post("/add", sc.addScheme);       // Admin adds scheme
router.get("/all", sc.getSchemes);       // User views schemes
router.post("/del", sc.delscheme);   // delete scheme by id
router.post("/edit", sc.editscheme); // fetch one scheme for editing
router.post("/upd", sc.updscheme);   // update scheme
module.exports = router;

