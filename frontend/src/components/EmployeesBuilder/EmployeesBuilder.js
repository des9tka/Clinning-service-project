import {AdminOrderButtons} from "../Order";
import {BASE_URL} from "../../configs";

const EmployeesBuilder = ({status, order_id, employee}) => {

    const link = employee.profile.user_photo.replace("http://localhost", "");

    return (
        <div className={'order-employee-wrap'}>
            <div>Name : {employee && employee.profile?.name}</div>
            <div>Surname : {employee && employee.profile?.surname}</div>

            {employee?.profile.user_photo && <img onClick={() =>  window.open(`${BASE_URL + link}`, '_blank')} className={'order-employee-img'} src={`${BASE_URL + link}`} alt="user_photo"/>}
            <AdminOrderButtons status={status} employee={employee} order_id={order_id}/>
            <br/>
        </div>
    )
}


export {
    EmployeesBuilder
};
