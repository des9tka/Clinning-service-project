import {order_service} from "../../services";
import {useNavigate} from "react-router-dom";

const AdminOrderButtons = ({status, employee, order_id}) => {

    const navigate = useNavigate();

    const deleteEmployee = async () => {
        await order_service.removeEmployee(order_id, employee.id)
        navigate('/admin/orders')
    }

    return (
        <div>
            {status === 1 && <button>Confirm</button>}
            {status === 5 && <button onClick={() => deleteEmployee()}>Delete {employee.profile.name}</button>}
        </div>
    )
}

export {
    AdminOrderButtons
};
