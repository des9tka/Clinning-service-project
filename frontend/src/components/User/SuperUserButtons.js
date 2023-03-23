import {user_service} from "../../services";

const SuperUserButtons = ({user}) => {

    const activate = async () => {
        await user_service.activate(user.id)
        window.location.reload()
    }
    const deactivate = async () => {
        await user_service.deactivate(user.id)
        window.location.reload()
    }
    const toUser = async () => {
        await user_service.toUser(user.id)
        window.location.reload()
    }
    const toAdmin = async () => {
        await user_service.toAdmin(user.id)
        window.location.reload()
    }
    const toEmployee = async () => {
        await user_service.toEmployee(user.id)
        window.location.reload()
    }

    return (
        <div>
            {!user.is_active && <button onClick={() => activate()}>Activate</button>}
            {user.is_active && <button onClick={() => deactivate()}>Deactivate</button>}
            {(user.is_staff || user.is_employee) && <button onClick={() => toUser()}>To User</button>}
            {!user.is_staff && <button onClick={() => toAdmin()}>To Amin</button>}
            {!user.is_employee && <button onClick={() => toEmployee()}>To Employee</button>}
            <button onClick={() => '/'}>Change Service</button>
        </div>
    )
}
export {
    SuperUserButtons
};
