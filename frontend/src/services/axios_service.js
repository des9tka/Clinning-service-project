import axios from "axios";
import {createBrowserHistory} from "history";

import {BASE_URL} from "../configs"
import {authService} from "./auth_service";

const history = createBrowserHistory()

const axiosService = axios.create({
    baseURL: BASE_URL,
})
let isRefreshing = false;
axiosService.interceptors.request.use((config) => {
    const access = authService.getAccessToken();

    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
})

axiosService.interceptors.response.use((config) => {
    return config
    },
    async (error) => {
        const refresh = authService.getRefreshToken()

        if (error.response?.status === 401 && refresh && !isRefreshing) {
            isRefreshing = true

            try {
                const {data} = await authService.refresh(refresh)
                authService.deleteTokens()
                authService.setTokens(data)
            } catch (err) {
                authService.deleteTokens()
                history.replace('/auth/login?expSession=true')
            }

            isRefreshing = false
            return axiosService(error.config)
        }

        return Promise.reject(error)
    }
)

export {
    axiosService,
    history
}

