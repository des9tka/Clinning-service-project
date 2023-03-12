const userAttr = {
    orders: '/orders',
    profile_update: '/profile_update',
    new_order: '/new_order',
    activate: '/activate',
    deactivate: '/deactivate',
    user_to_admin: '/user_to_admin',
    admin_to_user: '/admin_to_user',
    user_to_employee: '/user_to_employee',
    employee_to_user: '/employee_to_user',
    change_service: '/change_service/',
    change_employee_service: '/change_employee_service/',
    add_photo: '/add_photo',
    self: '/self'
};

const serviceAttr = {
    orders: '/orders',
    add_photos: '/add_photos'
};

const orderAttr = {
    statuses: '/statuses',
    patch: '/patch',
    take: '/take',
    remove_employee: '/remove/',
    reject: '/reject',
    confirm: '/confirm',
    approve: '/approve',
    add_photos: '/add_photos'
}

export {
    userAttr, serviceAttr, orderAttr
}


