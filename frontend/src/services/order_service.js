import {axiosService} from "./axios_service";
import {urls, orderAttr} from "../configs";

const order_service = {
    getAll: (page= 1, status= 1) => axiosService.get(urls.ORDERS, {params: {page, status}}),
    addPhoto: (id, photo) => axiosService.post(`${urls.ORDERS}/${id}${orderAttr.add_photos}`, photo),
    delete: (id) => axiosService.delete(`${urls.ORDERS}/${id}`),
    getById: (id) => axiosService.get(`${urls.ORDERS}/${id}`),
    confirm: (id) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.confirm}`),
    approve: (id) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.approve}`),
    reject: (id) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.reject}`),
    update: (id, order) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.patch}`, order),
    removeEmployee: (order_id, employee_id) => axiosService.patch(`${urls.ORDERS}/${order_id}${orderAttr.remove_employee}${employee_id}`)
}

export {
    order_service
}
