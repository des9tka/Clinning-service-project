import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";


import {UserOrder} from "../Order/UserOrder";
import {user_service} from "../../services";
import {orderActions} from "../../redux";
import {useSearchParams} from "react-router-dom";


const UserOrders = () => {
    const dispatch = useDispatch();
    const {orders, nextPage, prevPage} = useSelector(state => state.orderReducer)
    const [query, setQuery] = useSearchParams({page: '1', status: '1'});

    useEffect(() => {
        user_service.getOrders(query.get('page'), query.get('status')).then(value => {
            dispatch(orderActions.setOrders(value.data.data))
            dispatch(orderActions.setPrevPage(value.data.prev_page))
            dispatch(orderActions.setNextPage(value.data.next_page))
        })
    }, [query])

    const prev = () => {
        setQuery(value => ({page: value.get('page') - 1, status: value.get('status')}))
    }

    const next = () => {
        setQuery(value => ({page: +value.get('page') + 1, status: value.get('status')}))
    }

    const ordersChange = () => {
        const statusValue = document.getElementById('select').value
        setQuery(value => ({page: '1', status: statusValue}))
    }

    return (
        <div>
            <hr/>
            <select id={'select'} onChange={() => ordersChange()}>
                <option value={1}>pending</option>
                <option value={2}>waiting for approved</option>
                <option value={3}>approved</option>
                <option value={4}>rejected</option>
                <option value={5}>taken</option>
                <option value={6}>done</option>
                <option value={7}>paid</option>
            </select>
            <hr/>
            <button disabled={!prevPage} onClick={() => prev()}>Prev</button>
            <button disabled={!nextPage} onClick={() => next()}>Next</button>
            <hr/>
            <div>
                {orders && orders.map(order => <UserOrder key={order.id} order={order}/>)}
            </div>
        </div>
    )
}
export {UserOrders};
