const Admin=require("../db/admindb");
const bcrypt=require("bcrypt");
module.exports={
   async addadmin(req,res){

  const salt=await bcrypt.genSalt(10);
   const hp=await bcrypt.hash("1234",salt);

    var ins={
  name:"jack",
  email:"j1@gmail.com",
  password:hp,
    }

    await Admin.create(ins);

      res.json({msg:"I am Admin Add"});

  } ,
  async login(req,res){
    var e=req.body.email;
    var p=req.body.pass;
    var data=await Admin.findOne({email:e});
    if(data!=null){
        bcrypt.compare(p,data.password,(err,result)=>{
            if(err){
                throw err;
            }else{
                if(result==true){
                    var udata={
                        name:data.name,
                        id:data.id
                    };
                    res.json(udata)

                }else{
                    res.json({msg:"Invalid login"})
                }
            }
        })

    }else{
        res.json({msg:"Invalid login"});

    }


  }


}