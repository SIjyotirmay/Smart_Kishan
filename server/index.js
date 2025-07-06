const exp=require("express")
const app=exp();


const cors=require("cors")
app.use(cors());

app.use(exp.static('public'))

const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const expressFileupload=require("express-fileupload")
app.use(expressFileupload());

const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://Jyotirmay7:p1234@cluster0.yrkjp9h.mongodb.net/dbkishan?retryWrites=true&w=majority&appName=Cluster0")

app.get("/",(req,res)=>{
    res.send("Hello Jyotirmay");
});

const pr=require("./routes/product_r");
app.use("/product",pr);


const ar=require("./routes/admin");
app.use("/admin",ar);



const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

app.use("/scheme", require("./routes/scheme"));



app.listen(2000)
