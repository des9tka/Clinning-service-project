import {Navigate, Route, Routes} from "react-router-dom";

import {
    AdminAboutPage,
    AdminLayout, AdminOfficePage, AdminOrderDetailsPage, AdminOrderPage, AdminUserPage,
    AuthLayout, ChangeServicePage, EmployeesAboutPage, EmployeesOfficePage, EmployeesOrdersPage, ErrorPage, HelpPage,
    HomePage, LoginPage,
    PaymentPage,
    ProfilePage, RegisterPage, RestorePasswordPage,
    ServicePage, SuperUserAboutPage, SuperUserDetailsPage, SuperUserOrdersPage, SuperUserUsersPage,
    UserAboutPage,
    UserOfficePage,
    UserOrderDetailsPage,
    UserOrderFormPage, WorkerLayout, SuperUserServicePage, UserLayout, SuperUserLayout
} from "./components";


function App() {

    return (
        <div>
            <Routes>

                <Route path={'/'} element={<UserLayout/>}>
                    <Route index element={<Navigate to={'/home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'office'} element={<UserOfficePage/>}/>
                    <Route path={'office/services'} element={<ServicePage/>}/>
                    <Route path={'office/create_order'} element={<UserOrderFormPage/>}/>
                    <Route path={'office/profile'} element={<ProfilePage/>}/>
                    <Route path={'office/order/:id/details'} element={<UserOrderDetailsPage/>}/>
                    <Route path={'office/payment'} element={<PaymentPage/>}/>
                    <Route path={'about'} element={<UserAboutPage/>}/>
                    <Route path={'help'} element={<HelpPage/>}/>
                </Route>

                <Route path={'auth'} element={<AuthLayout/>}>
                    <Route path={'login'} element={<LoginPage/>}/>
                    <Route path={'register'} element={<RegisterPage/>}/>
                    <Route path={'restore_password'} element={<RestorePasswordPage/>}/>
                </Route>

                <Route path={'admin'} element={<AdminLayout/>}>
                    <Route index element={<Navigate to={'/admin/home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'users'} element={<AdminUserPage/>}/>
                    <Route path={'orders'} element={<AdminOrderPage/>}/>
                    <Route path={'office'} element={<AdminOfficePage/>}/>
                    <Route path={'office/profile'} element={<ProfilePage/>}/>
                    <Route path={'order/:id/details'} element={<AdminOrderDetailsPage/>}/>
                    <Route path={'about'} element={<AdminAboutPage/>}/>
                </Route>

                <Route path={'employee'} element={<WorkerLayout/>}>
                    <Route index element={<Navigate to={'/employee/home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'orders'} element={<EmployeesOrdersPage/>}/>
                    <Route path={'office'} element={<EmployeesOfficePage/>}/>
                    <Route path={'office/profile'} element={<ProfilePage/>}/>
                    <Route path={'about'} element={<EmployeesAboutPage/>}/>
                </Route>

                <Route path={'superuser'} element={<SuperUserLayout/>}>
                    <Route index element={<Navigate to={'/superuser/home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'services'} element={<SuperUserServicePage/>}/>
                    <Route path={'users'} element={<SuperUserUsersPage/>}/>
                    <Route path={'users/:id/change_service'} element={<ChangeServicePage/>}/>
                    <Route path={'orders'} element={<SuperUserOrdersPage/>}/>
                    <Route path={'orders/:id/details'} element={<SuperUserDetailsPage/>}/>
                    <Route path={'about'} element={<SuperUserAboutPage/>}/>
                </Route>

                <Route path={'*'} element={<ErrorPage/>}/>

            </Routes>
        </div>
    );
}

export default App;
