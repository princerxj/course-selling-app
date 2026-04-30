const {Router} = require("express");
const courseRouter = Router();
const {courseModel, purchaseModel} = require("../db");
const {userMiddleware} = require("../middlewares/user")

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    const alreadyPurchased = await purchaseModel.findOne({
        userId,
        courseId
    });

    if (alreadyPurchased) {
        return res.status(400).json({
            message: "You have already purchased this course"
        });
    }

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message : "You have successfully bought the course"
    })
})

courseRouter.get("/preview", async (req, res) => {
    const courses = await courseModel.find({});

    res.json({
        message : 'Get all the courses',
        courses
    })
})

module.exports = {
    courseRouter : courseRouter,
}