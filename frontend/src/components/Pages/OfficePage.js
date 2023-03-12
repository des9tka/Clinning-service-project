import {UserOrders} from "../Orders/UserOrders";
import {OrderForm} from "../Forms";
import {useNavigate} from "react-router-dom";



const OfficePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate('/office/services')}>Make an Order</button>
            <button onClick={() => navigate('/office/profile')}>Profile</button>
            <UserOrders/>
        </div>
    )
}

export {OfficePage};
