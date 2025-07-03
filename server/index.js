const exp = require("express");
const app=exp();

const cors = require("cors")
app.use(cors());

const bodyParser= require("body-parser")
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const expressFileupload = require("express-fileupload")
app.use(expressFileupload());

const mongoose = require("mongoose");
//mongoose.connect("mongodb+srv://Jyotirmay7:p1234@cluster0.yrkjp9h.mongodb.net/dbkishan?retryWrites=true&w=majority&appName=Cluster0");
mongoose.connect("mongodb+srv://Jyotirmay7:p1234@cluster0.yrkjp9h.mongodb.net/dbkishan?retryWrites=true&w=majority&appName=Cluster0");

app.get("/",(req,res)=>{
     res.send("Hello Saujatya");
});

const  sr = require("./routes/scheme");  //scheme (page) router = sr and importing or adding scheme.js
app.use("/scheme",sr);

app.listen(3000)

    