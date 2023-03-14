import {useNavigate} from "react-router-dom";
import {EmployeeOfficeOrders} from "../Orders/EmployeeOfficeOrders";

const EmployeesOfficePage = () => {

    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/office/profile')}>Profile</button>
            My orders:
            <EmployeeOfficeOrders/>
        </div>
    )
}
export {
    EmployeesOfficePage
};
