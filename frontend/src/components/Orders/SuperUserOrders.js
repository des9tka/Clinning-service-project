import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";

import {order_service} from "../../services";
import {orderActions} from "../../redux";
import {SuperUserOrder} from "../Order";


const SuperUserOrders = () => {

    const dispatch = useDispatch();
    const {orders, nextPage, prevPage} = useSelector(state => state.orderReducer);
    const [query, setQuery] = useSearchParams({page: '1', status: '1'});
    const [searcher, setSearcher] = useState(null)


    useEffect(() => {
        if (!searcher) {
            order_service.getAll(query.get('page'), query.get('status')).then(value => {
                dispatch(orderActions.setOrders(value.data.data))
                dispatch(orderActions.setPrevPage(value.data.prev_page))
                dispatch(orderActions.setNextPage(value.data.next_page))
            }).catch((e) => console.log(e))
        } else if (searcher) {
            order_service.search(searcher, query.get('page')).then(value => {
                dispatch(orderActions.setOrders(value.data.data))
                dispatch(orderActions.setPrevPage(value.data.prev_page))
                dispatch(orderActions.setNextPage(value.data.next_page))
            }).catch((e) => console.log(e))
        }
    }, [query, searcher])

    const prev = () => {
        setQuery(value => ({page: value.get('page') - 1, status: value.get('status')}))
    }

    const next = () => {
        setQuery(value => ({page: +value.get('page') + 1, status: value.get('status')}))
    }

    const searchPrev = () => {
        setQuery(value => ({page: value.get('page') - 1}))
    }

    const searchNext = () => {
        setQuery(value => ({page: +value.get('page') + 1}))
    }

    const ordersChange = () => {
        const statusValue = document.getElementById('select').value
        setQuery(value => ({page: '1', status: statusValue}))
    }

    const search = (e) => {
        let data = e.target.value
        let symbol = "&";
        data = data.replace(/\s+/g, symbol);
        if (data === ' ') {
            setSearcher(null)
        } else {
            setSearcher(data)
        }
    }

    return (
        <div>
            <hr/>
            <div className={'pagination-buttons-div'}>
                {!search && <button className={'office-buttons'} disabled={!prevPage} onClick={() => prev()}>Prev</button>}
                {search && <button className={'office-buttons'} disabled={!prevPage} onClick={() => searchPrev()}>Prev</button>}

                <select className={'order-select'} disabled={searcher} id={'select'} onChange={() => ordersChange()}>
                    <option value={1}>pending</option>
                    <option value={2}>admin confirmed</option>
                    <option value={3}>user approved</option>
                    <option value={4}>rejected</option>
                    <option value={5}>taken</option>
                    <option value={6}>done</option>
                    <option value={7}>paid</option>
                </select>

                {!search && <button className={'office-buttons'} disabled={!nextPage} onClick={() => next()}>Next</button>}
                {search && <button className={'office-buttons'} disabled={!nextPage} onClick={() => searchNext()}>Next</button>}
            </div>

            <hr/>

            <div className={'searcher-div'}>
                <input className={'searcher'} type="text" id={'searcher'} placeholder={'search...'} onChange={(e) => search(e)} value={searcher}/>
            </div>
            <div className={'user-orders-div'}>
                {orders && orders.map(order => <SuperUserOrder key={order.id} order={order}/>)}
            </div>
        </div>
    )
}
export {
    SuperUserOrders
};