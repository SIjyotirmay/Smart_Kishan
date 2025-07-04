const Productmod=require("../db/productdb");
module.exports={
   async addproduct(req,res){

       var objimg=req.files.pimg;
       objimg.mv("./public/productimg/"+objimg.name,async(err)=>{
                  if(err){
                     throw err;
                  }else{

       var insobj={
         pname:req.body.pname,
         pprice:req.body.pprice,
         pdetails:req.body.pdetails,
         pimg:objimg.name
        };
          await Productmod.create(insobj);

      res.json({msg:"I am Product Add"});


                  }
       })

     
     },
     async selproduct(req,res){
     var data=await Productmod.find();

            res.json(data);
     },
     async delproduct(req,res){
         var id=req.body.id;
         await Productmod.findByIdAndDelete(id)

        res.json({msg:"I am Product Delete"});
     },


     async editproduct(req,res){
      var id=req.body.id;
      var data=await Productmod.findById(id)
      res.json(data)
     },

     async updproduct(req,res){

    var id=req.body.id;

    if(req.files!=null){
       var objimg=req.files.pimg;
       objimg.mv("./public/productimg/"+objimg.name,async(err)=>{
                  if(err){
                     throw err;
                  }else{

       var insobj={
         pname:req.body.pname,
         pprice:req.body.pprice,
         pdetails:req.body.pdetails,
         pimg:objimg.name
        };
          await Productmod.findByIdAndUpdate(id,insobj);

      res.json({msg:"I am Product Update"});


                  }
       })
      }else{

         var insobj={
         pname:req.body.pname,
         pprice:req.body.pprice,
         pdetails:req.body.pdetails,
        
        };
          await Productmod.findByIdAndUpdate(id,insobj);

      res.json({msg:"I am Product Update"});
      }
     }


}