const {Router} = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");

// adminRouter.use(adminMiddleware);

adminRouter.post("/signup", (req, res) => {
    res.json({
        message : "Signup Endpoint"
    })
})

adminRouter.post("/signin", (req, res) => {
    res.json({
        message : "Signin Endpoint"
    })
})

adminRouter.post("/course", (req, res) => {
    res.json({
        message : "course Endpoint"
    })
})

adminRouter.put("/course", (req, res) => {
    res.json({
        message : "Update the Course Details"
    })
})

adminRouter.get("/course/bulk", (req, res) => {
    res.json({
        message : "See all the Courses in Bulk"
    })
})

module.exports = {
    adminRouter : adminRouter
}