import {Navigate, Route, Routes} from "react-router-dom";

import {
    AdminAboutPage,
    AdminLayout, AdminOfficePage, AdminOrderDetailsPage, AdminOrderPage, AdminUserPage,
    AuthLayout, ChangeServicePage, EmployeesAboutPage, EmployeesOfficePage, EmployeesOrdersPage, ErrorPage,
    HomePage, LoginPage,
    PaymentPage,
    ProfilePage, RegisterPage,
    ServicePage, SuperUserAboutPage, SuperUserDetailsPage, SuperUserOrdersPage, SuperUserUsersPage,
    UserAboutPage, EmployeesOrderDetailsPage,
    UserOfficePage,
    UserOrderDetailsPage, RecoveryPasswordPage,
    UserOrderFormPage, WorkerLayout, SuperUserServicePage, UserLayout, SuperUserLayout, RecoveryPasswordRequestPage, ActivateUserPage, LoadingPage
} from "./components";


function App() {


    return (
        <div>
            <Routes>
                <Route path={'/loading'} element={<LoadingPage/>}/>
                <Route path={'/'} element={<UserLayout/>}>
                    <Route index element={<Navigate to={'/home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'office'} element={<UserOfficePage/>}/>
                    <Route path={'office/services'} element={<ServicePage/>}/>
                    <Route path={'office/create_order'} element={<UserOrderFormPage/>}/>
                    <Route path={'office/profile'} element={<ProfilePage/>}/>
                    <Route path={'office/order/:id/details'} element={<UserOrderDetailsPage/>}/>
                    <Route path={'office/order/:id/payment/:rate'} element={<PaymentPage/>}/>
                    <Route path={'about'} element={<UserAboutPage/>}/>
                </Route>

                <Route path={'auth'} element={<AuthLayout/>}>
                    <Route path={'login'} element={<LoginPage/>}/>
                    <Route path={'register'} element={<RegisterPage/>}/>
                    <Route path={':token/activate'} element={<ActivateUserPage/>}/>
                    <Route path={'request_password_recovery'} element={<RecoveryPasswordRequestPage/>}/>}/>
                    <Route path={'password_recovery/:token'} element={<RecoveryPasswordPage/>}/>}/>
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
                    <Route path={'orders/:id/details'} element={<EmployeesOrderDetailsPage/>}/>
                    <Route path={'office'} element={<EmployeesOfficePage/>}/>
                    <Route path={'office/profile'} element={<ProfilePage/>}/>
                    <Route path={'about'} element={<EmployeesAboutPage/>}/>
                </Route>

                <Route path={'superuser'} element={<SuperUserLayout/>}>
                    <Route index element={<Navigate to={'/superuser/home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'services'} element={<SuperUserServicePage/>}/>
                    <Route path={'users'} element={<SuperUserUsersPage/>}/>
                    <Route path={'office'} element={<ProfilePage/>}/>
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
