import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {orderActions} from "../../redux";
import {EmployeeOrder} from "../Order/EmployeeOrder";
import {ErrorPage, LoadingPage} from "../Pages";

const EmployeeOrders = () => {

    const dispatch = useDispatch();
    const {orders, loading, error} = useSelector(state => state.orderReducer)

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

            {orders && orders.map(order => <EmployeeOrder order={order}/>)}
        </div>
    )
}
export {
    EmployeeOrders
};
