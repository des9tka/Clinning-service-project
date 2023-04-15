import {axiosService} from "./axios_service";
import {authAttr, urls} from "../configs";

const _accessToken = 'access'
const _refreshToken = 'refresh'

const auth_service = {
    register: (user) => axiosService.post(urls.USERS, user),
    activation: (email) => axiosService.post(urls.AUTH.activate_request, {email}),
    login: (user) => axiosService.post(urls.AUTH.auth, user),
    refresh: (refresh) => axiosService.post(urls.AUTH.refresh, {refresh}),
    activate: (token) => axiosService.patch(`${urls.AUTH.auth}/${token}${authAttr.activate}`),
    token_check: () => axiosService.get(urls.AUTH.token_check),
    stripe_token: () => axiosService.get(urls.AUTH.stripe_token),
    request_password_recovery: (email) => axiosService.post(urls.AUTH.request_password_recovery, email),
    change_password: (token, data) => axiosService.post(`${urls.AUTH.auth}/${token}${authAttr.recovery}`, data),

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
    auth_service
}