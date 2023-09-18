import {SignJWT,jwtVerify} from 'jose';

export async function generateToken(payload){
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    // now getting the email
    let token = await new SignJWT(payload)
            .setProtectedHeader({alg:'HS256'})
            .setIssuedAt()
            .setIssuer("https://assignment-module-14-3dzzvxhd5-indrojit70.vercel.app")
            .setExpirationTime('2h')
            .sign(secretKey);

    return token;
}
// decoding the token
export async function decodeToken(encodedToken){
    const token = encodedToken;
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const decoded = await jwtVerify(token,secretKey);
    
    return decoded['payload'];
}
