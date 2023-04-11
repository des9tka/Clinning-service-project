import {useNavigate} from "react-router-dom";

const EmployeeOrder = ({order}) => {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/employee/orders/${order.id}/details`)}>
            <div>Id: {order.id}</div>
            <div>Address: {order.address}</div>
            <div>Rating: {order.rating}</div>
            <hr/>
        </div>
    )
}
export {
    EmployeeOrder
};
