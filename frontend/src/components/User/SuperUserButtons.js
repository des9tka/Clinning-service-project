import {useNavigate} from "react-router-dom";

import {user_service} from "../../services";

const SuperUserButtons = ({user, state, setState}) => {

    const navigate = useNavigate();

    const activate = () => {
        user_service.activate(user.id).then(() => setState((prevState) => ({...prevState, update: state + 1})))
    }
    const deactivate = () => {
        user_service.deactivate(user.id).then(() => setState((prevState) => ({...prevState, update: state + 1})))
    }
    const toUser = () => {
        user_service.toUser(user.id).then(() => setState((prevState) => ({...prevState, update: state + 1})))
    }
    const toAdmin = () => {
        user_service.toAdmin(user.id).then(() => setState((prevState) => ({...prevState, update: state + 1})))
    }
    const toEmployee = () => {
        user_service.toEmployee(user.id).then(() => setState((prevState) => ({...prevState, update: state + 1})))
    }

    const userDelete = () => {
        setState((prevState) => ({...prevState, delUser: true}))
    }

    return (
        <div className={'user-buttons'}>
            {!user.is_active && <button className={'green'} onClick={() => activate()}>Activate</button>}
            {user.is_active && <button className={'red'} onClick={() => deactivate()}>Deactivate</button>}
            {(user.is_staff || user.is_employee) && <button onClick={() => toUser()}>To User</button>}
            {!user.is_staff && <button onClick={() => toAdmin()}>To Amin</button>}
            {!user.is_employee && <button onClick={() => toEmployee()}>To Employee</button>}
            {(user.is_staff || user.is_employee) && <button onClick={() => navigate(`/superuser/users/${user.id}/change_service`)}>Change Service</button>}
            <button className={'red'} onClick={() => userDelete()}>delete {user.profile?.name}</button>
        </div>
    )
}

export {
    SuperUserButtons
};
