import {axiosService} from "./axios_service";
import {urls, userAttr} from "../configs";

const user_service = {
    getAll: () => axiosService.get(urls.USERS),
    getById: (id) => axiosService.get(`${urls.USERS}/${id}`),
    newOrder: () => axiosService.post(urls.USERS, userAttr.new_order),
    changeService: (service_id) => axiosService.patch(urls.USERS, userAttr.change_service, service_id),
    change_employee_service: (user_id, service_id) => axiosService.patch(urls.USERS, user_id, userAttr.change_employee_service, service_id),
    activate: (id) => axiosService.patch(urls.USERS, id, userAttr.activate),
    deactivate: (id) => axiosService.patch(urls.USERS, id, userAttr.deactivate),
    userToAdmin: (id) => axiosService.patch(urls.USERS, id, userAttr.user_to_admin),
    adminToUser: (id) => axiosService.patch(urls.USERS, id, userAttr.admin_to_user),
    userToEmployee: (id) => axiosService.patch(urls.USERS, id, userAttr.user_to_employee),
    employeeToUser: (id) => axiosService.patch(urls.USERS, id, userAttr.employee_to_user),
    profileUpdate: () => axiosService.patch(urls.USERS, userAttr.profile_update),
    addPhoto: () => axiosService.post(urls.USERS, userAttr.add_photo)
}

export {
    user_service
}