const express = require("express");
const router = express.Router();
let path = require("path");
router
    .route("/")
    .get((req, res) => res.render(path.resolve("views/about.ejs")))
    .post((req, res) => res.send("POST"))
module.exports = router;