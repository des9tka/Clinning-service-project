import {useNavigate} from "react-router-dom";

import {user_service} from "../../services";

const SuperUserButtons = ({user}) => {

    const navigate = useNavigate();

    const activate = () => {
        user_service.activate(user.id).then(() => window.location.reload())
    }
    const deactivate = () => {
        user_service.deactivate(user.id).then(() => window.location.reload())
    }
    const toUser = () => {
        user_service.toUser(user.id).then(() => window.location.reload())
    }
    const toAdmin = () => {
        user_service.toAdmin(user.id).then(() => window.location.reload())
    }
    const toEmployee = () => {
        user_service.toEmployee(user.id).then(() => window.location.reload())
    }

    const userDelete = () => {
        const confirm = prompt(`Are you sure to delete this user? Write '${user.profile?.name}' to confirm.`)
        if (confirm === user.profile?.name) {
            user_service.delete(user.id).then(() => window.location.reload())
        }
    }

    return (
        <div className={'user-buttons'}>
            {!user.is_active && <button onClick={() => activate()}>Activate</button>}
            {user.is_active && <button onClick={() => deactivate()}>Deactivate</button>}
            {(user.is_staff || user.is_employee) && <button onClick={() => toUser()}>To User</button>}
            {!user.is_staff && <button onClick={() => toAdmin()}>To Amin</button>}
            {!user.is_employee && <button onClick={() => toEmployee()}>To Employee</button>}
            {(user.is_staff || user.is_employee) && <button onClick={() => navigate(`/superuser/users/${user.id}/change_service`)}>Change Service</button>}
            <button onClick={() => userDelete()}>delete {user.profile?.name}</button>
        </div>
    )
}
export {
    SuperUserButtons
};
