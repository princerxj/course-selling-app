const express = require("express");
const userRouter = express.Router();
const {userModel} = require("../db");
const bcrypt = require("bcrypt");
const {z} = require("zod");
const {JWT_USER_PASSWORD} = require("../config");
const jwt = require("jsonwebtoken");

const requiredBody = z.object({
    email : z.string().min(3).max(100).email(),
    firstName : z.string().min(3).max(100),
    lastName : z.string().min(3).max(100),
    password : z.string().min(6).max(100)
                .refine((val) => /[A-Z]/.test(val))
                .refine((val) => /[a-z]/.test(val))
                .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val))
})

userRouter.post("/signup", async (req, res) => {
    try {
        const parsedDataWithSuccess = requiredBody.safeParse(req.body);
        if(!parsedDataWithSuccess.success) {
            res.json({
                message : "Incorrect Format",
                error : parsedDataWithSuccess.error
            });
            return;
        }

        const { email, password, firstName, lastName } = parsedDataWithSuccess.data;

        const user = await userModel.findOne({
            email : email
        });

        if(!user) {
            const hashedPassword = await bcrypt.hash(password, 10);

            await userModel.create({
                email : email,
                password : hashedPassword,
                firstName : firstName,
                lastName : lastName
            })

            res.json({
                message : "User has successfully signed up"
            })
        } else {
            res.status(409).json({
                message : "User already exists with this email id"
            })
        }
    } catch(error) {
        res.status(500).json({
            message : "Error while signing up"
        })
    }
});

userRouter.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
        email : email
    });

    if(user) {
        const checkPass = await bcrypt.compare(password, user.password);

        if(checkPass) {
            const token = jwt.sign({id : user._id.toString()}, JWT_USER_PASSWORD);
            res.status(200).json({
                token : token,
                message : "successfully signed in"
            })
        } else {
            res.status(401).json({
                message : "Incorrect Credentials"
            })
        }
    } else {
        res.status(401).json({
            message : "Incorrect Credentials"
        })
    }
});

userRouter.get("/purchases", (req, res) => {
    res.json({
        message : "Purchased Courses"
    })
})

module.exports = {
    userRouter : userRouter
}