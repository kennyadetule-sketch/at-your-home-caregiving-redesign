require("dotenv").config();


const express = require("express");
const cors = require("cors");
const helmet = require("helmet");


const contactRoutes = require("./routes/contactRoutes");



const app = express();



app.use(
    cors()
);


app.use(
    helmet()
);


app.use(
    express.json()
);



app.use(
    express.urlencoded({
        extended:true
    })
);




// Routes

app.use(
    "/api/contact",
    contactRoutes
);




// Health check

app.get("/", (req,res)=>{

    res.json({
        message:"At Your Home Caregiving API is running"
    });

});


// 404 Handler

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route not found."

    });

});



// Server start

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});