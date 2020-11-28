const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (userName, mail) =>{
    sgMail.send({
        to:mail,
        from:'paulsoumen349@gmail.com',
        subject:'Thanks for Registration',
        text:`Hi ${userName}! Welcome to our Webapp..`
    })
}

const sendCancelationEmail = (userName, mail) =>{
    sgMail.send({
        to:mail,
        from:'paulsoumen349@gmail.com',
        subject:'Successfully! deleted your account',
        text:`Hi ${userName}! Goodbye. come agian..`
    })
}

module.exports ={
    sendWelcomeEmail,
    sendCancelationEmail
}