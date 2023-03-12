import {useEffect} from "react";
import {order_service} from "../../services";
import {useDispatch, useSelector} from "react-redux";
import {orderActions} from "../../redux";
import {AdminOrder} from "../Order";
import {useSearchParams} from "react-router-dom";
import {LoadingPage} from "../Pages";


const AdminOrders = () => {

    const dispatch = useDispatch();
    const {orders, prevPage, nextPage} = useSelector(state => state.orderReducer);
    const [query, setQuery] = useSearchParams({page: '1', status: '1'});

    console.log(query.get('page'));

    const prev = () => {
        setQuery(value => ({page: value.get('page') - 1, status: value.get('status')}))
    }

    const next = () => {
        setQuery(value => ({page: +value.get('page') + 1, status: value.get('status')}))
    }

    useEffect(() => {
        order_service.getAll(query.get('page'), query.get('status')).then(({data}) => {
            dispatch(orderActions.setOrders(data.data))
            dispatch(orderActions.setPrevPage(data.prev_page))
            dispatch(orderActions.setNextPage(data.next_page))
        })
    }, [query])

    const ordersChange = () => {
        const statusValue = document.getElementById('select').value
        setQuery(value => ({page: '1', status: statusValue}))
    }

    if (!orders) {
        return (
            <div>
                <LoadingPage/>
            </div>
        )
    }

    return (
        <div>
            {console.log('return')}
            <select id={'select'} onChange={() => ordersChange()}>
                <option value={1}>waiting for approved</option>
                <option value={5}>taken</option>
                <option value={4}>rejected</option>
            </select>
            <hr/>
            <button disabled={!prevPage} onClick={() => prev()}>Prev</button>
            <button disabled={!nextPage} onClick={() => next()}>Next</button>
            <hr/>
            {orders && orders.map(order => <AdminOrder key={order.id} order={order}/>)}
        </div>
    )
}

export {
    AdminOrders
};
