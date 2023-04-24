import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {order_service} from "../../services";


const UserOrderButtons = ({status, id}) => {

    const navigate = useNavigate();
    const [rate, setRate] = useState(null);

    const confirm = () => {
        order_service.confirm(id)
        navigate('/office')
    }
    const reject = () => {
        order_service.reject(id)
        navigate('/office')
    }

    useEffect(() => {
        if (status === 6) {
            const select = document.getElementById('user-select')
            for (let i = 11; i <= 50; i++) {
                const option = document.createElement('option');
                const value = (i / 10).toFixed(1);
                option.value = value;
                option.innerText = value;
                select.appendChild(option);
            }
        }
    }, [])

    return (
        <div>
            {status === 1 && <div>
                <button onClick={() => reject()}>Reject</button>
            </div>}

            {status === 2 && <div>
                <button onClick={() => confirm()}>Approve</button>
                <button onClick={() => reject()}>Reject</button>
            </div>}

            {status === 6 && <div>
                <select className={'user-order-rate-select'} id={'user-select'} onChange={(e) => setRate(e.target.value)}></select>
                <button disabled={!rate} onClick={() => navigate(`/office/order/${id}/payment/${rate}`)}>Pay</button>
            </div>}
        </div>
    )
}
export {
    UserOrderButtons
};
