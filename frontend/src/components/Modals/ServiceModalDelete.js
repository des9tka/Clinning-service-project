import {useNavigate} from "react-router-dom";

import {c_service_service} from "../../services";
import {ErrorPage} from "../Pages";

const ServiceModalDelete = ({setState, service}) => {

    const navigate = useNavigate();

    const deleteService = async (e) => {
        if (e.target.value === `delete-${service.name}`) {
            await c_service_service.delete(service.id)
                .then(() => navigate('/superuser/services'))
                .catch((err) => {
                    return <ErrorPage error={err}/>
                })
        }
    }

    return (
        <div className="modal-container">
            <div className="modal-content">
                <h1>Are You sure to delete the {service.name}? <br/> For confirm type : "delete-{service.name}."</h1>
                <input type={"text"} onChange={(e) => deleteService(e)}/>
                <br/>
                <button onClick={() => setState(false)}>Cancel</button>
            </div>
        </div>
    )
}

export {
    ServiceModalDelete
};