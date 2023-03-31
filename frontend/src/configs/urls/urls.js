const BASE_URL = '/api'


const urls = {
    USERS : '/users',
    SERVICES: '/services',
    ORDERS: '/orders',
    AUTH: {
        login: '/auth',
        refresh: '/auth/refresh',
        token_check: '/auth/token_check',
        request_password_recovery: '/auth/request_password_recovery'
    },
    MEDIA: '/media'
}

export {
    BASE_URL, urls
}



