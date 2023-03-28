import {useNavigate} from "react-router-dom";

import {UserOrders} from "../../Orders";



const UserOfficePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate('/office/services')}>Make an Order</button>
            <button onClick={() => navigate('/office/profile')}>Profile</button>
            <UserOrders/>
        </div>
    )
}

export {UserOfficePage};
