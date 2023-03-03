import {axiosService} from "./axios_service";
import {urls} from "../configs";

const authService = {
    register: (user) => axiosService.post(urls.USERS, user),
    login: (user) => axiosService.post(urls.AUTH.login, user),
    refresh: (token) => axiosService.post(urls.AUTH.refresh, {token})
}

export {
    authService
}