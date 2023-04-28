import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {order_service, user_service} from "../../services";
import {ErrorPage} from "../Pages";

const EmployeeOrderButtons = ({order, user}) => {

    const taken = order.employees_current.includes(user?.id)

    const [state, setState] = useState({
        rate: null,
        button: null,
        reason: null,
        message: null
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (order.status === 5 && document.getElementById('select')) {
            const select = document.getElementById('select')
            for (let i = 11; i <= 50; i++) {
                const option = document.createElement('option');
                const value = (i / 10).toFixed(1);
                option.value = value;
                option.innerText = value;
                select.appendChild(option);
            }
        }
    }, [state.button])

    const take = () => {
        order_service.take(order.id).then(() => {
            navigate('/employee/office')
        }).catch((err) => {
            return <ErrorPage error={err}/>
        })
    }

    const done = () => {
        order_service.done(order.id, state.rate).then(() => {
            window.location.reload()
        }).catch((err) => {
            return <ErrorPage error={err}/>
        })
    }

    const reject = () => {
        user_service.requestOfReject(order.id, state.reason).then(() => setState(prevState => ({
            ...prevState, message: 'Request was sent to admin. You will be notified of the denial.'
        }))).catch((e) => setState(prevState => ({
            ...prevState, message: e.response.data
        })))
    }

    return (
        <div className={'employee-order-buttons'}>

            {state.message && <div className={'service-errors-div errors'}>{state.message}</div>}

            {(!taken && order.status === 3) && <button className={'employees-buttons'} onClick={() => take()}>Take</button>}

            {order.status === 5 && state.button === null && taken &&
                <button className={'employees-buttons'} onClick={() => setState(prevState => ({
                    ...prevState, button: 1
                }))}>Done
                </button>}

            {(order.status === 5 || order.status === 3) && taken && state.button === null &&
                <button className={'employees-buttons'} onClick={() => setState(prevState => ({
                    ...prevState, button: 0
                }))}>Reject
                </button>}

            {(order.status === 5 && taken && state.button === 1) &&
                <div>
                <select className={'employee-order-rate-select'} id={'select'} onChange={(e) => setState(prevState => ({
                    ...prevState, rate: e.target.value
                }))}></select><br/>
                <button className={'employees-buttons'} onClick={() => done()} disabled={!state.rate}>Done</button>
            </div>}

            {((order.status === 5 || order.status === 3) && taken && state.button === 0) &&
                <div>
                <input id={'input'} type={'text'} placeholder={'Reason for rejecting'} onChange={(e) => setState((prevState) => {
                    return ({...prevState, reason: e.target.value})
                })}/><br/>
                <button className={'employees-buttons'} disabled={!state.reason} onClick={() => reject()}>Reject</button>
            </div>}
        </div>
    )
}

export {
    EmployeeOrderButtons
};
