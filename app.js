// Following tutorial for nodemailer
// Traversey media on YouTube

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
// the path module deals with file paths
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// view engine setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Static folder
// Uses the path module
// __dirname represents the current directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.get('/',(request, response) =>{
    // response.send('Hello');

    // handlebars views rendering
    response.render('contact');
});

app.post('/send',(request, response) =>{
    // console.log(request.body);
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${request.body.name}</li>
            <li>Company: ${request.body.company}</li>
            <li>Email: ${request.body.email}</li>
            <li>Phone: ${request.body.phone}</li>
        </ul>
        <h3>Message<h3>
        <p>${request.body.message}</p>
    `;

    // nodemailer.com
    let transporter = nodemailer.createTransport({
    service: "hotmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'makeonereservation@outlook.com', // generated ethereal user
      pass: 'Team9project2', // generated ethereal password
    }
    
    // if mailing from a local server
    // the following must be added to the transporter
    ,
    tls:{
        rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"Nodemailer test 👻" <makeonereservation@outlook.com>', // sender address
    to: "basa206@hotmail.com, makeonereservation@outlook.com", // list of receivers
    subject: "Hello ✔ Nodemail test", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        response.render('contact', {msg:'Email has been sent'})
  })
})

app.listen(3000, ()=> console.log('Server started...'));