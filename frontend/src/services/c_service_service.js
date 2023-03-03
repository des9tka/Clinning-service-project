import {axiosService} from "./axios_service";
import {urls, serviceAttr} from "../configs";

const c_service_service = {
    getAll: () => axiosService.get(urls.SERVICES),
    getOrders: () => axiosService.get(urls.SERVICES, serviceAttr.orders)
}

export {
    c_service_service
}