const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();



app.listen(8080, () => {
    console.log(`App is lisetning at port 8080`);
})