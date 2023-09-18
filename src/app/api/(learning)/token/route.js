import {SignJWT,jwtVerify} from 'jose';
import { NextResponse } from 'next/server';

// encoding the token
export async function GET(req,res){
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    // now getting the email
    const payload = {
        email:"info@gmail.com",
        name:"Himesh",
        id:"1"
    }
    // according to the email we get 

    let token = await new SignJWT(payload)
            .setProtectedHeader({alg:'HS256'})
            .setIssuedAt()
            .setIssuer("http://localhost:3000")
            .setExpirationTime('2h')
            .sign(secretKey);

    return NextResponse.json({token})
}

// decoding the token
export async function POST(req,res){
    const JSONBody =await req.json();
    const token = JSONBody['token'];
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

    const decoded = await jwtVerify(token,secretKey);
    return NextResponse.json({decoded});
}