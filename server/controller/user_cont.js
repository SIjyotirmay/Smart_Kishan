// const User=require("../db/userdb");
// const bcrypt=require("bcrypt");
// module.exports={

//   async adduser(req, res) {
//     try {
//         const salt=await bcrypt.genSalt(10);
//         const hp=await bcrypt.hash("x1234",salt);

//         var ins={
//             name:"user1",
//             email:"user@gmail.com",
//             password:hp,
//         }

//         await User.create(ins);
//         res.json({msg:"I am adding user"});

//         // registration logic here
//     } catch (err) {
//         res.status(500).json({ msg: "Server error", error: err.message });
//     }
//     }

//   ,
//   async login(req,res){
//     var e=req.body.email;
//     var p=req.body.pass;
//     var data=await User.findOne({email:e});
//     if(data!=null){
//         bcrypt.compare(p,data.password,(err,result)=>{
//             if(err){
//                 throw err;
//             }else{
//                 if(result==true){
//                     var udata={
//                         name:data.name,
//                         id:data.id
//                     };
//                     res.json(udata)

//                 }else{
//                     res.json({msg:"Invalid login"})
//                 }
//             }
//         })

//     }else{
//         res.json({msg:"Invalid login"});

//     }


//   }


/*
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
// */
// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// // Register with image and hashed password
// exports.addUser = async (req, res) => {
//   try {
//     const { name, email, password, role, status } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ msg: "Email already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);

//     const image = req.file ? req.file.filename : "";

//     const user = new User({
//       name,
//       email,
//       password: hashed,
//       role: role || "user",
//       status: status === "false" ? false : true,
//       image,
//     });

//     await user.save();
//     res.json({ msg: "User registered" });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// };

// // Login with bcrypt
// exports.login = async (req, res) => {
//   const { email, pass } = req.body;

//   try {
//     const data = await User.findOne({ email });
//     if (!data) return res.json({ msg: "Invalid login" });

//     const match = await bcrypt.compare(pass, data.password);
//     if (match) {
//       return res.json({
//         id: data._id,
//         name: data.name,
//         role: data.role,
//         email: data.email,
//       });
//     } else {
//       return res.json({ msg: "Invalid login" });
//     }
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// };

// // Get all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch {
//     res.status(500).json({ msg: "Server Error" });
//   }
// };

// // Delete user
// exports.deleteUser = async (req, res) => {
//   const { id } = req.body;
//   try {
//     const deleted = await User.findByIdAndDelete(id);
//     if (deleted) res.json({ msg: "User deleted" });
//     else res.status(404).json({ msg: "User not found" });
//   } catch {
//     res.status(500).json({ msg: "Server Error" });
//   }
// };
const User = require("../db/userdb");
const bcrypt = require("bcryptjs");
const fs = require("fs");

module.exports = {
  // Create new user
  async addUser(req, res) {
    try {
      const { name, email, password, role, status } = req.body;
      let imageFileName = "";

      if (req.files && req.files.image) {
        const image = req.files.image;
        imageFileName = Date.now() + "_" + image.name;
        await image.mv("uploads/" + imageFileName);
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        status,
        image: imageFileName,
      });

      await user.save();
      res.json({ msg: "User created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Error creating user", error: err.message });
    }
  },

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Error fetching users" });
    }
  },

  // Delete user
  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.body.id);
      if (user && user.image) {
        const filePath = `uploads/${user.image}`;
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
      await User.findByIdAndDelete(req.body.id);
      res.json({ msg: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ msg: "Error deleting user", error: err.message });
    }
  },
  async getUserById(req, res) {
    const { id } = req.body;
    console.log(id)

    // Validate the ID before querying
    if (!id ) {
      return res.status(400).json({
        msg: "Invalid or missing user ID",
        error: true
      });
    }

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: "User not found", error: true });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ msg: "Error fetching user", error: err.message });
    }
  },


  // Update user
  async updateUser(req, res) {
    try {
      const { id, name, email, password, role, status } = req.body;
      const updateObj = { name, email, role, status };

      // Only hash and update password if provided
      if (password) {
        updateObj.password = await bcrypt.hash(password, 10);
      }

      if (req.files && req.files.image) {
        const img = req.files.image;
        const imgName = Date.now() + "_" + img.name;
        await img.mv("uploads/" + imgName);
        updateObj.image = imgName;
      }

      await User.findByIdAndUpdate(id, updateObj);
      res.json({ msg: "User updated successfully" });
    } catch (err) {
      res.status(500).json({ msg: "Error updating user", error: err.message });
    }
  },

  // Login
   async login(req, res) {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
       console.log("Sending login response:", {
      id: user._id,
      name: user.name,
      email: user.email
    });
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // ✅ Step 1: Log response before sending
    console.log("Sending login response:", {
      id: user._id,
      name: user.name,
      email: user.email
    });

    // ✅ Flat response (matches frontend expectation)
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      status: user.status
    });

  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
},
};