const {Router} = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");
const {adminMiddleware} = require("../middlewares/admin");
const bcrypt = require("bcrypt");
const {z} = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");

const requiredBody = z.object({
    email : z.string().min(3).max(100).email(),
    firstName : z.string().min(3).max(100),
    lastName : z.string().min(3).max(100),
    password : z.string().min(6).max(100)
                .refine((val) => /[A-Z]/.test(val))
                .refine((val) => /[a-z]/.test(val))
                .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val))
})

adminRouter.post("/signup", async (req, res) => {
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

        const admin = await adminModel.findOne({
            email : email
        });

        if(!admin) {
            const hashedPassword = await bcrypt.hash(password, 10);

            await adminModel.create({
                email : email,
                password : hashedPassword,
                firstName : firstName,
                lastName : lastName
            })

            res.json({
                message : "Admin has successfully signed up"
            })
        } else {
            res.status(409).json({
                message : "An admin already exists with this email id"
            })
        }
    } catch(error) {
        res.status(500).json({
            message : "Error while signing up"
        })
    }
})

adminRouter.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await adminModel.findOne({
        email : email
    });

    if(admin) {
        const checkPass = await bcrypt.compare(password, admin.password);

        if(checkPass) {
            const token = jwt.sign({id : admin._id.toString()}, JWT_ADMIN_PASSWORD);
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
})

adminRouter.post("/course", adminMiddleware, (req, res) => {
    res.json({
        message : "course Endpoint"
    })
})

adminRouter.put("/course", adminMiddleware, (req, res) => {
    res.json({
        message : "Update the Course Details"
    })
})

adminRouter.get("/bulk", adminMiddleware, (req, res) => {
    res.json({
        message : "See all the Courses in Bulk"
    })
})

module.exports = {
    adminRouter : adminRouter
}