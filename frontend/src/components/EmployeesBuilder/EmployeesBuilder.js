import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {userActions} from "../../redux";
import {ErrorPage, LoadingPage} from "../Pages";
import {AdminOrderButtons} from "../Order";
import {EmployeePhotoBuilder} from "../EmployeePhotoBuilder/EmployeePhotoBuilder";

const EmployeesBuilder = ({employee_id: id, status, order_id}) => {

    const dispatch = useDispatch();
    const {user, loading, error} = useSelector(state => state.userReducer);
    //
    useEffect( () => {
        dispatch(userActions.setUserById({id}))
    }, [])


    return (
        <div>
            {loading && <LoadingPage/>}
            {error && <ErrorPage error={error}/>}

            <div>Name : {user && user.profile?.name}</div>
            <div>Surname : {user && user.profile?.surname}</div>

            <div>Photo: <EmployeePhotoBuilder photo={user && user.profile?.user_photo}/></div>
            <AdminOrderButtons status={status} employee={user} order_id={order_id}/>
            <br/>
        </div>
    )
}
export {
    EmployeesBuilder
};
