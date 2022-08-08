import dotenv from 'dotenv'
dotenv.config();
import sgMail from '@sendgrid/mail'
import Handlebars from 'handlebars'
sgMail.setApiKey(process.env.API_KEY)
const adminMail = "imtiazahmed026@gmail.com";
const messages = [];

const source =
    "{{#if male}}" +
    "<h1>hello Sir {{name}}</h1>" +
    "{{else if female}}" +
    "<h1>hello  Ma'am {{name}}</h1>" +
    "{{/if}}" +
    "<h1>Your delivery fee is {{fee}}" + "<br>" +
    "<button><a href='https://www.google.com'</a>Confirm purchase </button> "

const htmlTemplate = Handlebars.compile(source);
const data = [{
    "name": "imtiaz",
    "male": true,
    "fee": 220,
    "email": "imtiazahmed026@gmail.com"
},
{
    "name": "sadek vai",
    "male": true,
    "fee": 120,
    "email": "sadek.hkm@gmail.com"
}

]
for (let i = 0; i < data.length; i++) {
    messages.push({
        to: data[i].email,
        from: adminMail,
        subject: "confirm your order",
        text: "attention!!!",
        html: htmlTemplate(data[i]),
    })
}
sgMail.send(messages)
    .then(() => {
        console.log("email sent successfull");
    }).catch((err => {
        console.log(err.response.body);
    }))