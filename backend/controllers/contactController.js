const sendEmail = require("../services/emailService");



exports.sendContactEmail = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            service,
            message
        } = req.body;



        await sendEmail({

            name,
            email,
            phone,
            service,
            message

        });



        return res.status(200).json({

            success: true,

            message:
                "Thank you! Your request has been submitted successfully. A member of our care team will contact you shortly."

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message:
                "Unable to send your request at this time. Please try again later."

        });

    }

};