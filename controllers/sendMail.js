const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",

    auth: {
        user: 'rushthegreat10@gmail.com',
        pass: 'nbcpvjdebyiinlaq'
    },

    secure: true,
});

const mail = (req, res) => {

    console.log(req.body.uname);
    console.log(req.body.email);
    console.log(req.body.message);

    const mailData = {
        from: 'rushthegreat10@gmail.com',
        to: 'rushthegreat10@gmail.com',
        subject: 'A message from ' + req.body.uname,
        text: req.body.message
    }

    transporter.sendMail(mailData, (error, info) => {

        if (error){
            return console.log(error);
        }

        res.redirect("/");
        res.status(200).send({message: "Mail Sent", message_id: info.messageId});

    });
    
}

module.exports = mail