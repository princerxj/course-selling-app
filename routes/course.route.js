const {Router} = require("express");
const courseRouter = Router();

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