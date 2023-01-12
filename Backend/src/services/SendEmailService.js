require('dotenv').config()
import { reject } from 'lodash';
import nodemailer from 'nodemailer'


let sendEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD  // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"HeartHospital" <doanchuyennghanhhoahongdainam@gmail.com>', // sender address
        to: dataSend.receiversEmail, // list of receivers
        subject: "ĐỒ ÁN CHUYÊN NGHÀNH ĐẶT LỊCH KHÁM BỆNH", // Subject line
        html: getHTMLtext(dataSend)
    });
}



let getHTMLtext = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {

        result = `
                <div>
                <h3>Xin Chào ${dataSend.patientName} </h3>
                <p> Bạn đã đặt lịch trên HeartHospital </p>
                <p> Thông tin đặt lịch khám bệnh:</p>
                <div> <b> Thời gian ${dataSend.time} </b>   </div>
                <div><b>Bác sĩ là :  ${dataSend.doctorName} </b> </div>
                <p> Vui lòng nhấn vào link bên dưới để xác nhận đặt lịch khám bệnh </p>
                <div> <a href=${dataSend.linkConfirm}> <p>Nhấn vào đây!! </p> </a></div>
                
                <div>Xin cảm ơn !!! </div>
                </div>
                `
    }
    if (dataSend.language === 'en') {
        result = `<div>
                <h3>Dear: ${dataSend.patientName} </h3>
                <p> You have an appointment on HeartHospital </p>
                <p> Information to book a medical appointment:</p>
                <div> <b> Time: ${dataSend.time} </b>   </div>
                <div><b>Doctor is :  ${dataSend.doctorName} </b> </div>
                <p> Please click on the link below to confirm your appointment</p>
                <div> <a href=${dataSend.linkConfirm}> <p>Click here!! </p> </a></div>
                
                <div>Thank you!!! </div>
                </div>`
    }
    return result;

}



let sendRemedy = async (dataSend) => {
    return new Promise(async (resolve, reject) => {

        try {
            //`console.log(dataSend)
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP, // generated ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD  // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"HeartHospital" <doanchuyennghanhhoahongdainam@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch khám bệnh", // Subject line
                html: getSendAttachment(dataSend),
                attachments: [{   // encoded string as an attachment
                    filename: 'data.png',
                    content: dataSend.imgBase64.split("base64,")[1],
                    encoding: 'base64'
                },],
            });

            resolve({
                errCode: 0,
                errMessage: "Send remedy successfull"
            })


        } catch (e) {
            reject(e)
        }


    })
}


let getSendAttachment = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {

        result = `
                <div>
                <h3>Xin Chào ${dataSend.fullname} </h3>
                <p> Bạn nhận được email này sau khi khám bệnh thành công </p>
                <p> Thông tin đơn thuốc và hóa đơn được gửi trong file đính kèm </p>
                
                <div>Xin cảm ơn !!! </div>
                </div>
                `
    }
    if (dataSend.language === 'en') {
        result = `<div>
                <h3>Hello ${dataSend.fullname}</h3>
                <p>You received this email after successful medical examination </p>
                <p> Information on prescriptions and invoices is sent in the attachment </p>
                <div>Thank you!!! </div>
                </div>`
    }
    return result;
}





module.exports = {
    sendEmail: sendEmail,
    sendRemedy: sendRemedy
}