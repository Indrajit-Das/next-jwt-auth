export async function createCookie(payload){
    return {'Set-Cookie':`token=${payload};Max-Age=7200;Path=/;SameSite=Strict`}
}
