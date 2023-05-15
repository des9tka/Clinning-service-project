import {useSelector} from "react-redux";

import {AdminUserButtons} from "./AdminUserButtons";
import {SuperUserButtons} from "./SuperUserButtons";

const User = ({user, setState}) => {

    const {self: worker} = useSelector(state => state.userReducer)

    return (
        <div className={'user-div'}>
            <div>Id: {user.id}</div>
            <div>Name: {user.profile?.name}</div>
            <div>Surname: {user.profile?.surname}</div>
            <div>Email: {user.email}</div>
            <div>Phone: {user.profile?.phone}</div>
            <div>Age: {user.profile?.age}</div>
            <div>Service: {user.service}</div>
            <div>Active: {user.is_active.toString()}</div>
            <div>Employee: {user.is_employee.toString()}</div>
            <div>Admin: {user.is_staff.toString()}</div>
            <div>SuperUser: {user.is_superuser.toString()}</div>

            {worker && worker.is_staff && !worker.is_superuser && worker.id !== user.id && <AdminUserButtons user={user}/>}
            {worker && worker.is_superuser && worker.id !== user.id && <SuperUserButtons setState={setState} user={user}/>}
        </div>
    )
}

export {
    User
};
