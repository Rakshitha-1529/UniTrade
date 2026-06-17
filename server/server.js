const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const path = require("path");


// Routes

const authRoutes = require("./routes/auth");

const resourceRoutes = require("./routes/resource");

const downloadRoutes = require("./routes/download");

const chatRoutes = require("./routes/chat");


const app = express();


// Middleware

app.use(cors());

app.use(express.json());
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
app.use(express.urlencoded({

  extended: true

}));


// Upload folder access

app.use(

"/uploads",

express.static(

path.join(__dirname,"uploads")

)

);


// Routes

app.get("/", (req,res)=>{

res.send("Backend Running");

});

app.use("/api/auth",authRoutes);

app.use("/api/resources",resourceRoutes);

app.use("/api/download",downloadRoutes);

app.use("/api/chat",chatRoutes);


// MongoDB

mongoose.connect(

process.env.MONGO_URI

)

.then(()=>{

console.log("MongoDB Connected");

})

.catch((error)=>{

console.log(error);

});


// Server

const PORT=

process.env.PORT||5000;

app.listen(PORT,()=>{

console.log(

`Server running on ${PORT}`

);

});