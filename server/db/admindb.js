/*const mongoose=require("mongoose")
const aschema=mongoose.Schema({
  name:String,
  email:String,
  password:String,

});

module.exports=mongoose.model("Admin",aschema)*/
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "admin" }
});

module.exports = mongoose.model("Admin", adminSchema);
