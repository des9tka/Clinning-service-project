const BASE_URL = '/api/v1'


const urls = {
    USERS : '/users',
    SERVICES: '/services',
    ORDERS: '/orders',
    AUTH: {
        auth: '/auth',
        refresh: '/auth/refresh',
        token_check: '/auth/token_check',
        request_password_recovery: '/auth/request_password_recovery',
        stripe_token: 'auth/stripe_token',
        activate_request: '/auth/activate_request'
    }
}

export {
    BASE_URL, urls
}



