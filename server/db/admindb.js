const mongoose=require("mongoose")
const aschema=mongoose.Schema({
  name:String,
  email:String,
  password:String,

});

module.exports=mongoose.model("Admin",aschema)