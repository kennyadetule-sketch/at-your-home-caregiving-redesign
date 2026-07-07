const express = require("express");

const router = express.Router();


const {
    sendContactEmail
} = require("../controllers/contactController");


const {
    validateContact
} = require("../middleware/validation");


const rateLimiter = require("../middleware/rateLimiter");



router.post(
    "/",
    rateLimiter,
    validateContact,
    sendContactEmail
);



module.exports = router;