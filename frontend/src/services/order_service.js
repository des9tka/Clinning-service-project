import {axiosService} from "./axios_service";

import {urls, orderAttr} from "../configs";

const order_service = {
    getAll: (page = 1, status = 1, search = '') => axiosService.get(urls.ORDERS, {params: {page, status, search}}),
    search: (search = '', page = 1, status = 1) => axiosService.get(`${urls.ORDERS}${orderAttr.search}`, {params: {page, search, status}}),
    addPhoto: (id, photos) => axiosService.post(`${urls.ORDERS}/${id}${orderAttr.add_photos}`, photos),
    delete: (id) => axiosService.delete(`${urls.ORDERS}/${id}`),
    getById: (id) => axiosService.get(`${urls.ORDERS}/${id}`),
    getOrderEmployeesById: (id) => axiosService.get(`${urls.ORDERS}/${id}${orderAttr.employees}`),
    take: (id) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.take}`),
    confirm: (id) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.confirm}`),
    done: (id, rate) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.done}${rate}`),
    reject: (id, data) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.reject}`, {data}),
    update: (id, order) => axiosService.patch(`${urls.ORDERS}/${id}${orderAttr.patch}`, order),
    removeEmployee: (order_id, employee_id) => axiosService.patch(`${urls.ORDERS}/${order_id}${orderAttr.remove_employee}${employee_id}`),
    employee_orders: (page = 1) => axiosService.get(`${urls.ORDERS}/${orderAttr.employee_orders}`, {params: {page}}),
    payment: (id, amount, order_id, rate) => axiosService.post(`${urls.ORDERS}/${order_id}${orderAttr.payment}${rate}`, {id, amount})
}

export {
    order_service
}
