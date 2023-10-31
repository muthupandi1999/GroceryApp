
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "mahespandi0321@gmail.com",
        pass: "ylnpyuucpviibkrt"
    }
});

export default transporter