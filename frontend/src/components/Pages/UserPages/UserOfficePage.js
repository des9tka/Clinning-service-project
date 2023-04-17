import {useNavigate} from "react-router-dom";

import {UserOrders} from "../../Orders";


const UserOfficePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className={'office-button-div'}>
                <button onClick={() => navigate('/office/services')}>Make an Order</button>
                <button onClick={() => navigate('/office/profile')}>Profile</button>
            </div>
            <UserOrders/>
        </div>
    )
}


export {UserOfficePage};
