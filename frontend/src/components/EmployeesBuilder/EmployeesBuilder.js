import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {user_service} from "../../services";
import {userActions} from "../../redux";
import {AdminOrderButtons} from "../Order";
import {LoadingPage} from "../Pages";

const EmployeesBuilder = ({employee_id , status, order_id}) => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.userReducer);

    useEffect(async () => {
        await user_service.getById(employee_id).then(value => {
            dispatch(userActions.setUser(value.data))
        })
    }, [])

    if (!user) {
        return (
            <div>
                <LoadingPage/>
            </div>
        )
    }

    return (
        <div>
            <div>Name : {user && user.profile.name}</div>
            <div>Surname : {user && user.profile.surname}</div>
            <div>photo</div>
            <AdminOrderButtons status={status} employee={user} order_id={order_id}/>
            <hr/>
        </div>
    )
}
export {
    EmployeesBuilder
};
