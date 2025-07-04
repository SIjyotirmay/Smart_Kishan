const Productmod = require("../db/productdb");

module.exports={
    async addproduct(req,res){
                var insobj={
                        pname: "Phone",
                        pprice: 12000,
                        pdetails: "smart phone (iphone)",
                        pimg: "apple.jpeg"  
                };
        await Productmod.create(insobj);
        res.json({msg: "I am Add Controller"})
    },
    selproduct(req,res){
        
            res.json({msg: "I am Select Controller"})
    },
    delproduct(req,res){
            res.json({msg: "I am Delete Controller"})
    },
    editproduct(req,res){
            res.json({msg: "I am Edit Controller"})
    }
}