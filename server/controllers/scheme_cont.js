const Productmod = require("../db/productdb");

module.exports={
    async addproduct(req,res){
                var insobj={
                        pname: "Hell",
                        pprice: 120,
                        pdetails: "Energy drink",
                        pimg: "hell.jpeg"  
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