import {axiosService} from "./axios_service";
import {urls, serviceAttr} from "../configs";

const c_service_service = {
    getAll: (page= 1) => axiosService.get(urls.SERVICES, {params: {page}}),
    delete: (id) => axiosService.delete( `${urls.SERVICES}/${id}`)
    // getOrders: () => axiosService.get(urls.SERVICES, serviceAttr.orders),
}

export {
    c_service_service
}