import {useState} from "react";

import {AdminOrderButtons} from "../Order";
import {BASE_URL} from "../../configs";
import {ImageModal} from "../Modals";

const EmployeesBuilder = ({status, order_id, employee, setState}) => {

    const link = employee.profile.user_photo?.replace("http://localhost", "");
    const [isActive, setIsActive] = useState(false);


    return (
        <div className={'order-employee-wrap'}>
            <div>Name : {employee && employee.profile?.name}</div>
            <div>Surname : {employee && employee.profile?.surname}</div>

            {employee?.profile.user_photo &&
                <img onClick={() => setIsActive(true)} className={'order-employee-img'} src={`${BASE_URL + link}`} alt="user_photo"/>}
            <AdminOrderButtons setState={setState} status={status} employee={employee} order_id={order_id}/>
            {isActive && <ImageModal setIsActive={setIsActive} url={`${BASE_URL}/${link}`}/>}
            <br/>
        </div>
    )
}

export {
    EmployeesBuilder
};
