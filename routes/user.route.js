const express = require("express");
const Router = express.Router();
const userRouter = Router();

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