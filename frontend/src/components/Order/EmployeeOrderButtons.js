import {useEffect, useState} from "react";

import {order_service} from "../../services";
import {useNavigate} from "react-router-dom";

const EmployeeOrderButtons = ({order, user}) => {

    const [rate, setRate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (order.status === 5) {
            const select = document.getElementById('select')
            for (let i = 11; i <= 50; i++) {
                const option = document.createElement('option');
                const value = (i / 10).toFixed(1);
                option.value = value;
                option.innerText = value;
                select.appendChild(option);
            }
        }
    }, [])

    const take = () => {
        order_service.take(order.id).then(() => {
            navigate('/employee/office')
        }).catch((err) => console.log(err))
    }

    const done = () => {
        order_service.done(order.id, rate).then(() => {
            window.location.reload()
        }).catch((err) => console.log(err))
    }

    const taken = order.employees_current.includes(user?.id)

    return (
        <div>
            {(!taken && order.status === 3) && <button className={'employees-buttons'} onClick={() => take()}>Take</button>}
            {order.status === 5 && <select className={'employee-order-rate-select'} id={'select'} onChange={(e) => setRate(e.target.value)}></select>}
            {order.status === 5 && <button className={'employees-buttons'} onClick={() => done()} disabled={!rate}>Done</button>}
        </div>
    )
}


export {
    EmployeeOrderButtons
};
