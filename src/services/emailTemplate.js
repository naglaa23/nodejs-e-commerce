import nodemailer from 'nodemailer';
import { emailTemplate } from './emailTemplate.js';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Naglaafawzi20@gmail.com", 
      pass: "",
    },
  }); 

  async function sendEmail(email ,url) {
    
    const info = await transporter.sendMail({
      from: '<Naglaafawzi20@gmail.com>', 
      to: email, 
      subject: "Hello ", 
      text: "Hello world?",
      html: emailTemplate(url), 
    });
  
    console.log("Message sent: %s", info.messageId);

  }

  export default sendEmail;