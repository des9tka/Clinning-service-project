import axios from "axios";
import {createBrowserHistory} from "history";

import {BASE_URL} from "../configs"
import {auth_service} from "./auth_service";

const history = createBrowserHistory()

const axiosService = axios.create({
    baseURL: BASE_URL,
})
let isRefreshing = false;
axiosService.interceptors.request.use((config) => {
    const access = auth_service.getAccessToken();

    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
})

axiosService.interceptors.response.use((config) => {
    return config
    },
    async (error) => {
        const refresh = auth_service.getRefreshToken()

        if (error.response?.status === 401 && refresh && !isRefreshing) {
            isRefreshing = true

            try {
                const {data} = await auth_service.refresh(refresh)
                auth_service.deleteTokens()
                auth_service.setTokens(data)
            } catch (err) {
                auth_service.deleteTokens()
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

