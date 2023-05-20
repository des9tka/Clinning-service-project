import {useSelector} from "react-redux";

import {AdminUserButtons} from "./AdminUserButtons";
import {SuperUserButtons} from "./SuperUserButtons";
import {UserModalDelete} from "../Modals/UserModalDelete";

const User = ({user, setState, state}) => {

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
            {state.delUser && <UserModalDelete state={state} setState={setState} user={user}/>}

            {worker && worker.is_staff && !worker.is_superuser && worker.id !== user.id && <AdminUserButtons setState={setState} user={user}/>}
            {worker && worker.is_superuser && worker.id !== user.id && <SuperUserButtons setState={setState} state={state} user={user}/>}
        </div>
    )
}

export {
    User
};
