import {order_service} from "../../services";

const AdminOrderButtons = ({status, employee, order_id, setState, state}) => {

    const deleteEmployee = async () => {
        await order_service.removeEmployee(order_id, employee.id)
        setState((prevState) => ({...prevState, removed: prevState.removed + 1 }));
    }

    const rejectOrder = () => {
        setState(prevState => ({...prevState, button: true}))
    }

    return (
        <div className={'admin-buttons-div'}>
            {(status === 1 && !state.button) && <button disabled={!state.employees || !state.price}>Confirm</button>}
            {(status === 1 && !state.button) && <button onClick={() => rejectOrder()}>Reject</button>}

            {(status === 5 || status === 3) && <button onClick={() => deleteEmployee()}>Remove {employee && employee.profile.name}</button>}
        </div>
    )
}


export {
    AdminOrderButtons
};
