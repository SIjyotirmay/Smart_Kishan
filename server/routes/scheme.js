const exp = require("express");
const router = exp.Router();//Set up router
const sc = require("../controllers/scheme_cont");

router.get("/add",sc.addproduct);

router.get("/sel",sc.selproduct);

router.get("/del",sc.delproduct);

router.get("/edit",sc.editproduct);
/*
router.get("/add",(req,res)=>{
    res.json({msg: "I am add"})
});

router.get("/sel",(req,res)=>{
    res.json({msg: "I am select"})
});

router.get("/del",(req,res)=>{
    res.json({msg: "I am Delete"})
});

router.get("/edit",(req,res)=>{
    res.json({msg: "I am Edit"})
});
*/

router.post("/test",(req,res)=>{
    console.log()
    res.json({msg:"I am Node"})
})






module.exports=router;