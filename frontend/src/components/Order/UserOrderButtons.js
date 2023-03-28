import {useNavigate} from "react-router-dom";

import {order_service} from "../../services";


const UserOrderButtons = ({status, id}) => {

    const navigate = useNavigate();

    const confirm =  () => {
        order_service.confirm(id)
        navigate('/office')
    }
    const reject =  () => {
        order_service.reject(id)
        navigate('/office')
    }

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
                <button onClick={() => navigate('/office/payment')}>Pay</button>
            </div>}
        </div>
    )
}
export {
    UserOrderButtons
};
