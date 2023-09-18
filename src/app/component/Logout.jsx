"use client";
import { useRouter } from 'next/navigation';

const Logout = async()=> {
    const router = useRouter();
    // handle logout
    const handleLogout = async()=> {
        const config = {method:'DELETE'};
        const cookieDeleteRes = await fetch('api/login',config);
        let cookie =await cookieDeleteRes.json(); 
       
        // Redirect to the login page after logout
        if(cookie.status==true){
            router.replace('/login');
        }
        
    };
    return (
        <div>
            <button className='bg-yellow-600 text-white rounded p-3' onClick={handleLogout}>logout</button>
        </div>
    );
};

export default Logout;