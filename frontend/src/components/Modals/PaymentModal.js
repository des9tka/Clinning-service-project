import {useNavigate} from "react-router-dom";

const PaymentModal = () => {

    const navigate = useNavigate();

    return (
        <div className="modal-container">
            <div className="modal-content">
                <h1>SuccessFull Payment !</h1>
                <br/>
                <button onClick={() => navigate('/office')}>OK</button>
            </div>
        </div>
    )
}

export {
    PaymentModal
};
