import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(req,res){
    const {searchParams} = new URL(req.url);
    let email = searchParams.get('email');

    // transporter
    const transporter = nodemailer.createTransport({
        host: "mail.teamrabbil.com",
        port: 25,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "info@teamrabbil.com",
          pass: "~sR4[bhaC[Qs",
        },
        tls:{
            rejectUnauthorized: false
        }
    });
    // preparing the mail
    let myEmail = {
        from:"Test email from Next.js application <info@teamrabbil.com>",
        to:email,
        subject:"Test email from Next.js application",
        text:"test email from next.js application "
    }
    // sending the email
    try{
        await transporter.sendMail(myEmail);
        return NextResponse.json({status:true,msg:"successfully send the mail"},{status:200});
    }catch(e){
        return NextResponse.json({status:true,msg:"fail"},{status:401});
    }
}