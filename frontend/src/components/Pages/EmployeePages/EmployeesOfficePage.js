import {useNavigate} from "react-router-dom";

import {EmployeeOfficeOrders} from "../../Orders";

const EmployeesOfficePage = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className={'office-button-wrapper'}>
                 <button className={'about-text'} onClick={() => navigate('/employee/office/profile')}>Profile</button>
            </div>
            <h1 className={'about-text'}>My orders</h1>
            <EmployeeOfficeOrders/>
        </div>
    )
}

export {
    EmployeesOfficePage
};
