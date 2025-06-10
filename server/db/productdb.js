const mongoose = require("mongoose")  // importing mangoose (mongodb driver)
//creating product schema (p=product)
const pschema = mongoose.Schema({
    pname: String,
    pprice: Number,
    pdetails: String,
    pimg: String
})

module.exports = mongoose.model("Product",pschema)
