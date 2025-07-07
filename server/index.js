// const exp=require("express")
// const app=exp();


// const cors=require("cors")
// app.use(cors());

// app.use(exp.static('public'))

// const bodyParser=require("body-parser")
// app.use(bodyParser.urlencoded())
// app.use(bodyParser.json())

// const expressFileupload=require("express-fileupload")
// app.use(expressFileupload());

// const mongoose=require("mongoose")
// mongoose.connect("mongodb+srv://Jyotirmay7:p1234@cluster0.yrkjp9h.mongodb.net/dbkishan?retryWrites=true&w=majority&appName=Cluster0")

// app.get("/",(req,res)=>{
//     res.send("Hello Jyotirmay");
// });

// const pr=require("./routes/product_r");
// app.use("/product",pr);


// const ar=require("./routes/admin");
// app.use("/admin",ar);



// const userRoutes = require("./routes/user");
// app.use("/user", userRoutes);

// app.use("/scheme", require("./routes/scheme"));



// app.listen(2000)
const exp = require("express");
const app = exp();

const cors = require("cors");
app.use(cors());

app.use(exp.static("public"));
app.use("/uploads", exp.static("uploads")); // For serving uploaded files

app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());

const expressFileupload = require("express-fileupload");
app.use(expressFileupload());

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Jyotirmay7:p1234@cluster0.yrkjp9h.mongodb.net/dbkishan?retryWrites=true&w=majority&appName=Cluster0");

// Default route
app.get("/", (req, res) => {
  res.send("Hello Jyotirmay");
});

// Route modules
app.use("/product", require("./routes/product_r"));
app.use("/admin", require("./routes/admin"));
app.use("/user", require("./routes/user"));
app.use("/scheme", require("./routes/scheme"));

// Start server
app.listen(2000, () => {
  console.log("Server running on http://localhost:2000");
});
