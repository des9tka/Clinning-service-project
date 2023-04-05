const userAttr = {
    orders: '/orders',
    profile_update: '/profile_update',
    new_order: '/new_order',
    activate: '/activate',
    deactivate: '/deactivate',
    to_admin: '/to_admin',
    to_user: '/to_user',
    to_employee: '/to_employee',
    to_superuser: '/to_superuser',
    change_service: '/change_service/',
    change_employee_service: '/change_employee_service/',
    add_photo: '/add_photo',
    self: '/self'
};

const serviceAttr = {
    orders: '/orders',
    add_photos: '/add_photos',
};

const orderAttr = {
    statuses: '/statuses',
    patch: '/patch',
    take: '/take',
    remove_employee: '/remove/',
    reject: '/reject',
    confirm: '/confirm',
    approve: '/approve',
    add_photos: '/add_photos',
    employee_orders: '/employee_orders',
    done: '/done',
    search: '/search',
    payment: '/payment'
}

const authAttr = {
    recovery: '/recovery'
}

export {
    userAttr, serviceAttr, orderAttr, authAttr
}


