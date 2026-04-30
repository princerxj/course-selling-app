const express = require("express");
const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
    res.json({
        message : "Signup Endpoint",
    })
});

userRouter.post("/signin", (req, res) => {
    res.json({
        message : "Signin endpoint"
    })
});

userRouter.get("/purchases", (req, res) => {
    res.json({
        message : "Purchased Courses"
    })
})

module.exports = {
    userRouter : userRouter
}