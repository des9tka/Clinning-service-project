import {axiosService} from "./axios_service";
import {urls, orderAttr} from "../configs";

const order_service = {
    getAll: () => axiosService.get(urls.ORDERS),
    addPhoto: (id, photo) => axiosService.post(`${urls.ORDERS}/${id}/${orderAttr.add_photos}`, photo),
    delete: (id) => axiosService.delete(`${urls.ORDERS}/${id}/${orderAttr.delete}`)
}

export {
    order_service
}
