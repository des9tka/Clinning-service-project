import {AdminUserButtons} from "./AdminUserButtons";

const User = ({user}) => {

    return (
        <div>
            <div>Id: {user.id}</div>
            <div>Name: {user.profile.name}</div>
            <div>Surname: {user.profile.surname}</div>
            <div>Email: {user.email}</div>
            <div>Phone: {user.profile.phone}</div>
            <div>age: {user.profile.age}</div>
            <div>Active: {user.is_active.toString()}</div>
            <div>Employee: {user.is_employee.toString()}</div>
            <div>Admin: {user.is_staff.toString()}</div>
            <div>SuperUser: {user.is_superuser.toString()}</div>
            <AdminUserButtons user={user}/>
            <hr/>
        </div>
    )
}
export {
    User
};
