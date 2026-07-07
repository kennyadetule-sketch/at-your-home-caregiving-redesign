const {
    body,
    validationResult
} = require("express-validator");




exports.validateContact = [

    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),



    body("email")
    .isEmail()
    .withMessage("Valid email required"),



    body("message")
    .trim()
    .isLength({
        min:10
    })
    .withMessage(
        "Message is too short"
    ),

    body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

    body("service")
    .trim()
    .notEmpty()
    .withMessage("Please select a service"),


    (req,res,next)=>{


        const errors =
        validationResult(req);



        if(!errors.isEmpty()){

            return res.status(400).json({

            success: false,

            errors: errors.array()

});

        }



        next();

    }

];