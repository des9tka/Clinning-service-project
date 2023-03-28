import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {orderActions, userActions} from "../../redux";
import {EmployeeOrder} from "../Order";
import {ErrorPage, LoadingPage} from "../Pages";

const EmployeeOrders = () => {

    const dispatch = useDispatch();
    const {orders, loading, error} = useSelector(state => state.orderReducer)
    const {user} = useSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(orderActions.setAllowEmployeesOrders())
        dispatch(userActions.setSelfUser())
    }, [])

    if (orders === []) {
        return (
            <div>
                <LoadingPage/>
            </div>
        )
    }


    return (
        <div>
            {loading && <LoadingPage/>}
            {error && <ErrorPage error={error}/>}

            {user && orders && orders.filter(order => order.employees_current !== order.employees_current.includes(user.id)).map(order => <EmployeeOrder order={order}/>)}
        </div>
    )
}
export {
    EmployeeOrders
};
