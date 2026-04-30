const express = require("express");
const jwt = require("jsonwebtoken");
const {userRouter} = require("./routes/user.route");
const {courseRouter} = require("./routes/course.route");
const app = express();

app.use(express.json())

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

app.listen(8080, () => {
    console.log(`App is lisetning at port 8080`);
})