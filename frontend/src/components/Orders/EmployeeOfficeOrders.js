import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {orderActions} from "../../redux";
import {ErrorPage, LoadingPage} from "../Pages";
import {EmployeeOrder} from "../Order/EmployeeOrder";

const EmployeeOfficeOrders = () => {

    const dispatch = useDispatch();
    const {orders, loading, error} = useSelector(state => state.orderReducer)

    useEffect(() => {
        dispatch(orderActions.setEmployeeOrders())
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

            <div>
                <h3>Taken:</h3>
                {orders !== [] && orders.filter(order => order.status === 5 || order.status === 3).map(order => <EmployeeOrder order={order}/>)}
            </div>
            <hr/>
            <div>
                <h3>Done:</h3>
                 {orders !== [] && orders.filter(order => order.status === 6 || order.status === 7).map(order => <EmployeeOrder order={order}/>)}
            </div>

        </div>
    )
}

export {
    EmployeeOfficeOrders
};
