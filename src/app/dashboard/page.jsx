import { headers } from 'next/headers';
import Logout from '../component/Logout';
const Dashboard =()=> {
    // headers data 
    const headerList = headers();
    const email = headerList.get('email');
    const name = headerList.get('name');
   
    return (
        <div>
            <h1>{name}</h1>
            <h1>{email}</h1>
            <h1>Dashboard</h1>
            <Logout/>
        </div>
    );
};

export default Dashboard;