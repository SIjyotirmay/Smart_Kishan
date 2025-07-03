const exp=require("express");
const router=exp.Router();
const ac=require("../controller/admin_cont");

router.get("/reg",ac.addadmin);
router.post("/login",ac.login);

module.exports=router;