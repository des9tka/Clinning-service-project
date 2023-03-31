import {axiosService} from "./axios_service";
import {authAttr, urls} from "../configs";
import axios from "axios";

const _accessToken = 'access'
const _refreshToken = 'refresh'

const authService = {
    register: (user) => axiosService.post(urls.USERS, user),
    login: (user) => axiosService.post(urls.AUTH.login, user),
    refresh: (refresh) => axiosService.post(urls.AUTH.refresh, {refresh}),
    token_check: () => axiosService.get(urls.AUTH.token_check),
    request_password_recovery: (email) => axiosService.post(urls.AUTH.request_password_recovery, email),
    change_password: (token, data) => axiosService.post(`${urls.AUTH.login}/${token}${authAttr.recovery}`, data),

    getAccessToken: () => localStorage.getItem(_accessToken),

    getRefreshToken: () => localStorage.getItem(_refreshToken),

    setTokens: (tokens) => {
        localStorage.setItem(_accessToken,tokens.access);
        localStorage.setItem(_refreshToken, tokens.refresh);
    },

    deleteTokens: () => {
        localStorage.removeItem(_accessToken)
        localStorage.removeItem(_refreshToken)
    },
}

export {
    authService
}