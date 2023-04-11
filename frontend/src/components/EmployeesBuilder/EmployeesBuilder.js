import {AdminOrderButtons} from "../Order";
import {BASE_URL} from "../../configs";

const EmployeesBuilder = ({status, order_id, employee}) => {

    return (
        <div>
            <div>Name : {employee && employee.profile?.name}</div>
            <div>Surname : {employee && employee.profile?.surname}</div>

            <div>Photo: {employee.profile.user_photo && <img className={'img'} src={`${BASE_URL + employee.profile?.user_photo}`} alt="user_photo"/>}</div>
            <AdminOrderButtons status={status} employee={employee} order_id={order_id}/>
            <br/>
        </div>
    )
}
export {
    EmployeesBuilder
};
