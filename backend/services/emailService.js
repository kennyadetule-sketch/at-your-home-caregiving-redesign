const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});



const sendEmail = async ({
    name,
    email,
    phone,
    service,
    message
}) => {

    // ===========================
    // Email sent to the company
    // ===========================

    const companyMail = {

        from: `"At Your Home Caregiving Website" <${process.env.EMAIL_USER}>`,

        to: process.env.COMPANY_EMAIL,

        subject: "New Care Assessment Request",

        html: `

        <div style="font-family:Arial,sans-serif;padding:30px;background:#f7f7f7;">

            <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;">

                <div style="background:#4B8B3B;padding:25px;text-align:center;color:white;">

                    <h2>New Care Assessment Request</h2>

                </div>

                <div style="padding:30px;">

                    <p><strong>Name:</strong> ${name}</p>

                    <p><strong>Email:</strong> ${email}</p>

                    <p><strong>Phone:</strong> ${phone}</p>

                    <p><strong>Service Needed:</strong> ${service}</p>

                    <hr>

                    <h3>Message</h3>

                    <p>${message}</p>

                </div>

            </div>

        </div>

        `

    };



    // ===========================
    // Auto Reply
    // ===========================

    const customerMail = {

        from: `"At Your Home Caregiving" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: "We've Received Your Request",

        html: `

        <div style="font-family:Arial,sans-serif;padding:30px;background:#f4f4f4;">

            <div style="max-width:650px;margin:auto;background:white;border-radius:10px;overflow:hidden;">

                <div style="background:#4B8B3B;color:white;padding:25px;text-align:center;">

                    <h2>Thank You For Contacting Us</h2>

                </div>

                <div style="padding:30px;">

                    <p>Hello <strong>${name}</strong>,</p>

                    <p>

                        Thank you for contacting <strong>At Your Home Caregiving</strong>.

                    </p>

                    <p>

                        We have successfully received your request.

                    </p>

                    <p>

                        A member of our care team will contact you shortly to discuss your needs.

                    </p>

                    <br>

                    <p>

                        We appreciate the opportunity to serve you and your family.

                    </p>

                    <br>

                    <strong>

                        At Your Home Caregiving

                    </strong>

                </div>

            </div>

        </div>

        `

    };



    await transporter.sendMail(companyMail);

    await transporter.sendMail(customerMail);

};



module.exports = sendEmail;