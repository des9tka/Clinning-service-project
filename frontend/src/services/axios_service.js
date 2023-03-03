import axios from "axios";
import {BASE_URL} from "../configs"

const axiosService = axios.create({
    baseURL: BASE_URL,

})

export {
    axiosService
}

