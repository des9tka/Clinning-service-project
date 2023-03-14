import {order_service} from "../../services";

const AdminOrderButtons = ({status, employee, order_id}) => {

    const deleteEmployee = async () => {
        await order_service.removeEmployee(order_id, employee.id)
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
