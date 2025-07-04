const User=require("../db/userdb");
const bcrypt=require("bcrypt");
module.exports={

  async adduser(req, res) {
    try {
        const salt=await bcrypt.genSalt(10);
        const hp=await bcrypt.hash("x1234",salt);

        var ins={
            name:"user1",
            email:"user@gmail.com",
            password:hp,
        }

        await User.create(ins);
        res.json({msg:"I am adding user"});

        // registration logic here
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
    }

  ,
  async login(req,res){
    var e=req.body.email;
    var p=req.body.pass;
    var data=await User.findOne({email:e});
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


}/*
const User = require("../db/userdb");
const bcrypt = require("bcrypt");

module.exports = {
  // 🟢 Register new user
  async adduser(req, res) {
    try {
      const { name, email, password } = req.body;

      // check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = new User({ name, email, password: hash });
      await newUser.save();

      res.json({ msg: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ msg: "Registration failed", error: err.message });
    }
  },

  // 🔐 User login
  async login(req, res) {
    try {
      const { email, pass } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ msg: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid email or password" });
      }

      // No JWT, just returning user info
      res.json({
        msg: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        }
      });
    } catch (err) {
      res.status(500).json({ msg: "Login failed", error: err.message });
    }
  }
};
*/