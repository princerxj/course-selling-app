const {Router} = require("express");
const courseRouter = Router();
const {courseModel} = require("../db");

courseRouter.post("/purchase", (req, res) => {
    res.json({
        message : "Endpoint to purchase a course"
    })
})

courseRouter.get("/preview", (req, res) => {
    res.json({
        message : 'Get all the courses'
    })
})

module.exports = {
    courseRouter : courseRouter,
}