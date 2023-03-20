import {c_service_service} from "../../services";

const SuperUserService = ({service}) => {


    const deleteService = async () => {
        const prom = prompt(`Are you sure to delete service? Write "${service.name}" for confirm:`)
        if (prom === service.name) {
            await c_service_service.delete(service.id)
                .then(() => window.location.reload())
                .catch((err) => console.log(err))
        }
    }

    return (
        <div>
            <div>Id: {service.id}</div>
            <div>Name: {service.name}</div>
            <div>Address: {service.address}</div>
            <div>Photos: {service.photos}</div>
            <button onClick={() => deleteService()}>Delete {service.name}</button>
            <hr/>
        </div>
    )
}
export {
    SuperUserService
};
