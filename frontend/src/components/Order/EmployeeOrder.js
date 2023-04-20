import {useNavigate} from "react-router-dom";

const EmployeeOrder = ({order}) => {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/employee/orders/${order.id}/details`)} className={'employee-order-div'}>
            <div>Id: {order.id}</div>
            <div>Address: {order.address}</div>
            <div>Rating: {order.rating}</div>
            <div>Footage: {order.footage}</div>
            <div>Task: {order.task_description.slice(0, 20)}...</div>
        </div>
    )
}

export {
    EmployeeOrder
};
