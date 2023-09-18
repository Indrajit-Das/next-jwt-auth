import users from '@/lib/users';
import { NextResponse } from "next/server";

export async function POST(req,res){
    try{
        const JSONBody = await req.json();
        let email=JSONBody['email'];
        let password = JSONBody['password'];
        let name = JSONBody['name'];
        const newUser = {name,email,password};
        // i need to make a email verification here
        users.push(newUser);
        return NextResponse.json({ status:true, msg:"registered successfully",newUser},{status:201});
    }catch(e){
        return NextResponse.json({msg:"user registration fail",status:false},{status:402});
    }
}