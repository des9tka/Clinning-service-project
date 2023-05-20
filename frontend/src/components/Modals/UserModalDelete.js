import {user_service} from "../../services";

const UserModalDelete = ({user, setState, state}) => {

    const userDelete = () => {
        user_service.delete(user.id).then(() => setState((prevState) => ({...prevState, update: state + 1})))
    }

    return (
        <div className="modal-container">
            <div className="modal-content">
                <h1>Are You sure to delete the {user.profile.name}? <br/> For confirm type : "delete-{user.profile.name}."</h1>
                <input type={"text"} onChange={(e) => {
                    if (e.target.value === `delete-${user.profile.name}`) {
                        userDelete()
                        setState((prevState) => ({...prevState, delUser: false}))
                    }
                }}/>
                <br/>
                <button onClick={() => setState((prevState) => ({...prevState, delUser: false}))}>Cancel</button>
            </div>
        </div>
    )
}

export {
    UserModalDelete
};
