import {axiosService} from "./axios_service";

import {urls, serviceAttr} from "../configs";

const c_service_service = {
    getAll: (page = 1) => axiosService.get(urls.SERVICES, {params: {page}}),
    updateById: (id, service) => axiosService.patch(`${urls.SERVICES}/${id}`, service),
    delete: (id) => axiosService.delete(`${urls.SERVICES}/${id}`),
    getById: (id) => axiosService.get(`${urls.SERVICES}/${id}`),
    create: (service) => axiosService.post(`${urls.SERVICES}`, service),
    add_photos: (id, photos) => axiosService.post(`${urls.SERVICES}/${id}${serviceAttr.add_photos}`, photos, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }),
}

export {
    c_service_service
}