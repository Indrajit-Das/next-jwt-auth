import { NextResponse } from "next/server";
import users from "@/lib/users";
import { generateToken } from "@/lib/token";
import { createCookie, deleteCookie } from "@/lib/cookie";
import { cookies } from 'next/headers'

export async function POST(req,res){
    const JSONBody = await req.json();
    let email=JSONBody['email'];
    let password = JSONBody['password'];

    const matchedUser = users.find(user => user.email === email && user.password === password);
    if(matchedUser){
        let token =await generateToken(matchedUser);
        // setting the header and setting the cookie
        const cookieData = await createCookie(token);
        return NextResponse.json({msg:"user found",status:true,cookieData},{status:'200',headers:cookieData});
    }else{
        return NextResponse.json({msg:"no user found",status:false},{status:401});
    }
}

export async function DELETE(req,res){
    // deleteCookie('token');
    cookies().delete('token');
    return NextResponse.json({status:true,msg:"Successfully logged out"},{status:200,headers:{}});
}