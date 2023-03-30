import {axiosService} from "./axios_service";

import {urls, orderAttr} from "../configs";

const order_service = {
    getAll: (page = 1, status = 1, searcher = '') => axiosService.get(urls.ORDERS, {params: {page, status, searcher}}),
    search: (search = '', page = 1) => axiosService.get(`${urls.ORDERS}${orderAttr.search}?${search}`, {params: {page}}),
    addPhoto: (id, photos) => axiosService.post(`${urls.ORDERS}/${id}${orderAttr.add_photos}`, photos),
    delete: (id) => axiosService.delete(`${urls.ORDERS}/${id}`),
    getById: (id) => axiosService.get(`${urls.ORDERS}/${id}`),
    take: (id) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.take}`),
    confirm: (id) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.confirm}`),
    approve: (id) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.approve}`),
    done: (id) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.done}`),
    reject: (id) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.reject}`),
    update: (id, order) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.patch}`, order),
    removeEmployee: (order_id, employee_id) => axiosService.patch(`${urls.ORDERS}/${order_id}${orderAttr.remove_employee}${employee_id}`),
    employee_orders: (page = 1, searcher) => axiosService.get(`${urls.ORDERS}/${orderAttr.employee_orders}?${searcher}`, {params: {page}})
}

export {
    order_service
}
