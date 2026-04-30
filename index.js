const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.post("/user/signup", (req, res) => {
    res.json({
        message : "SIgnup Endpoint",
    })
});

app.post("/user/signin", (req, res) => {
    res.json({
        message : "Signin endpoint"
    })
});

app.get("/user/purchases", (req, res) => {
    res.json({
        message : "Purchased Courses"
    })
})

app.post("/course/purchase", (req, res) => {
    res.json({
        message : "Endpoint to purchase a course"
    })
})

app.get("/courses", (req, res) => {
    message : 'Get all the courses'
})

app.listen(8080, () => {
    console.log(`App is lisetning at port 8080`);
})