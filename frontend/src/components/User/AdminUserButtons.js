import {user_service} from "../../services";

const AdminUserButtons = ({user}) => {

    const toUser =  () => {
         user_service.toUser(user.id).then((response) => {
            window.location.reload()
        }).catch((err) => console.log(err))
    }
    const toEmployee = async () => {
        await user_service.toEmployee(user.id).then((response) => {
            window.location.reload()
        }).catch((err) => console.log(err))
    }
    const activate = async () => {
        await user_service.activate(user.id).then((response) => {
            window.location.reload()
        }).catch((err) => console.log(err))
    }
    const deactivate =  () => {
         user_service.deactivate(user.id).then((response) => {
            window.location.reload()
        }).catch((err) => console.log(err))
    }

    return (
        <div>
            {user.is_employee && <button onClick={() => toUser()}>To user</button>}
            {!user.is_employee && <button onClick={() => toEmployee()}>To employee</button>}
            {user.is_active && <button onClick={() => deactivate()}>Deactivate</button>}
            {!user.is_active && <button onClick={() => activate()}>Activate</button>}
        </div>
    )
}
export {
    AdminUserButtons
};
