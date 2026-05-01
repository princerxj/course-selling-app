require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const {userRouter} = require("./routes/user.route");
const {courseRouter} = require("./routes/course.route");
const {adminRouter} = require("./routes/admin.route")
const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json())

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(8080, ()=> {
        console.log(`App is listening at port 8080`)
    })
}

main();