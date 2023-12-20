const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const bodyParser = require('body-parser');
const cors = require('cors');

// Parse JSON request bodies
app.use(bodyParser.json());
app.use(cors());
// Parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));



function capitalizeFirstLetter(text) {
    // Check if the input is a valid string
    if (typeof text !== 'string' || text.length === 0) {
      return text;
    }
  
    // Convert the first letter to uppercase and the rest to lowercase
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }


// Define a route
app.post('/email', async (req, res) => {
  let { firstName, lastName, code, phone, email, activity, divingActivity, divingCourse, tour, date} = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'freewayscuba@gmail.com',
        pass: 'cfexinviycvrkmyj'
      }
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./views'),
      extName: ".handlebars",
    };
    transporter.use('compile', hbs(handlebarOptions));

    const customerMailOptions = {
      from: 'Freeway Scuba Diving',
      to: ['freewayscuba@gmail.com', email.toLowerCase(), 'tecnodael@gmail.com'],
      subject: 'Booking Confirmation',
      template: 'notification',
      context: {
        name:capitalizeFirstLetter(firstName), 
        lastName:capitalizeFirstLetter(lastName),
        code:code, 
        phone:phone, 
        email:email.toLowerCase(), 
        activity:activity, 
        divingActivity:divingActivity, 
        divingCourse:divingCourse, 
        tour:tour, 
        date:date
      }
    };

    const customerEmail = await transporter.sendMail(customerMailOptions);
    console.log('Email sent: ' + customerEmail.response);
    res.status(400).send('EMAIL SENT !');

  } catch (error) {
    console.log(error);
    res.status(500).send('Error sending email');
  }
});




// Start the server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
  