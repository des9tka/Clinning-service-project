import {useSelector} from "react-redux";

import {AdminUserButtons} from "./AdminUserButtons";
import {SuperUserButtons} from "./SuperUserButtons";

const User = ({user}) => {

    const {user: worker} = useSelector(state => state.userReducer)

    return (
        <div>
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

            {worker && worker.is_staff && !worker.is_superuser && <AdminUserButtons user={user}/>}
            {worker && worker.is_superuser && <SuperUserButtons user={user}/>}
            <hr/>
        </div>
    )
}
export {
    User
};
