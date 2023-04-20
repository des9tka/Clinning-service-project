import {useNavigate} from "react-router-dom";

import {EmployeeOfficeOrders} from "../../Orders";

const EmployeesOfficePage = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className={'office-button-wrapper'}>
                 <button onClick={() => navigate('/employee/office/profile')}>Profile</button>
            </div>
            <h1>My orders</h1>
            <EmployeeOfficeOrders/>
        </div>
    )
}

export {
    EmployeesOfficePage
};
