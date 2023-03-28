import {useNavigate} from "react-router-dom";

import {EmployeeOfficeOrders} from "../../Orders";

const EmployeesOfficePage = () => {

    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/employee/office/profile')}>Profile</button>
            <br/>
            My orders:
            <EmployeeOfficeOrders/>
        </div>
    )
}
export {
    EmployeesOfficePage
};
