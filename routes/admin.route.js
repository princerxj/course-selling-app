const {Router} = require("express");
const adminRouter = Router();
const {adminModel, courseModel} = require("../db");
const {adminMiddleware} = require("../middlewares/admin");
const bcrypt = require("bcrypt");
const {z} = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

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

adminRouter.post("/course", adminMiddleware, upload.single("image"), async (req, res) => {
    try {
        const adminId = req.userId;

        if(!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        const imageUrl = req.file.path;

        const {title, description, price} = req.body;

        const course = await courseModel.create({
            title : title,
            description : description,
            imageUrl : imageUrl,
            price : Number(price),
            creatorId : adminId
        })

        res.json({
            message : "course created",
            courseId : course._id
        })
    } catch(error) {
        res.status(500).json({
            message : "Error creating course"
        })
    }
    
})

adminRouter.put("/course", adminMiddleware, upload.single("image"), async (req, res) => {
    try {
        const adminId = req.userId;
        const { title, description, price, courseId } = req.body;

        const currentCourse = await courseModel.findOne({ _id: courseId, creatorId: adminId });

        if (!currentCourse) {
            return res.status(404).json({ message: "Course not found or unauthorized" });
        }

        let imageUrl = currentCourse.imageUrl;

        if (req.file) {
            if (currentCourse.imageUrl) {
                const publicId = currentCourse.imageUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`Coursera/${publicId}`);
            }
            imageUrl = req.file.path;
        }

        await courseModel.updateOne(
            { _id: courseId, creatorId: adminId },
            { 
                title, 
                description, 
                price: Number(price), 
                imageUrl 
            }
        );

        res.json({ 
            message: "Course Updated", 
            courseId: courseId 
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating course" });
    }
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId : adminId
    });

    res.json({
        message : "See all the Courses in Bulk",
        courses
    })
})

module.exports = {
    adminRouter : adminRouter
}