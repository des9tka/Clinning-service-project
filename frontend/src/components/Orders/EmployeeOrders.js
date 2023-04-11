import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {orderActions, userActions} from "../../redux";
import {EmployeeOrder} from "../Order";
import {ErrorPage, LoadingPage} from "../Pages";

const EmployeeOrders = () => {

    const dispatch = useDispatch();
    const {orders, loading, error} = useSelector(state => state.orderReducer)
    const {self} = useSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(orderActions.setAllowEmployeesOrders())
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

            {self && orders && orders.filter(order => order.employees_current !== order.employees_current.includes(self.id)).map(order => <EmployeeOrder order={order}/>)}
        </div>
    )
}
export {
    EmployeeOrders
};
