import {Navigate, Route, Routes} from "react-router-dom";

import {OfficePage, HomePage, HelpPage, AboutPage, ErrorPage, LoginPage, RegisterPage, RestorePasswordPage, WorkerLayout,} from './components'
import {AdminLayout, AuthLayout} from "./components";
import {UserOrderDetailsPage} from "./components/Pages/UserOrderDetailsPage";
import {ServicePage} from "./components/Pages/ServicePage";
import {OrderFormPage} from "./components/Pages/OrderFormPage";
import {PaymentPage} from "./components/Pages/PaymentPage";
import {ProfilePage} from "./components/Pages/ProfilePage";
import {UserLayout} from "./components/Layouts/UserLayout";
import {AdminOrderPage} from "./components/Pages/AdminOrderPage";
import {AdminUserPage} from "./components/Pages/AdminUserPage";
import {AdminAboutPage} from "./components/Pages/AdminAboutPage";
import {AdminOrderDetailsPage} from "./components/Pages/AdminOrderDetailsPage";

function App() {

    return (
        <div>
            <Routes>

                <Route path={'/'} element={<UserLayout/>}>
                    <Route index element={<Navigate to={'/home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'office'} element={<OfficePage/>}/>
                    <Route path={'office/services'} element={<ServicePage/>}/>
                    <Route path={'office/create_order'} element={<OrderFormPage/>}/>
                    <Route path={'office/profile'} element={<ProfilePage/>}/>
                    <Route path={'office/order/:id/details'} element={<UserOrderDetailsPage/>}/>
                    <Route path={'office/payment'} element={<PaymentPage/>}/>
                    <Route path={'about'} element={<AboutPage/>}/>
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
                    <Route path={'order/:id/details'} element={<AdminOrderDetailsPage/>}/>
                    <Route path={'about'} element={<AdminAboutPage/>}/>
                </Route>

                <Route path={'employee'} element={<WorkerLayout/>}>
                    {/*<Route path={'home'} element={</>}/>*/}
                    {/*<Route path={'orders'} element={</>}/>*/}
                    {/*<Route path={'about'} element={</>}/>*/}
                </Route>

                <Route path={'superuser'} element={<WorkerLayout/>}>

                </Route>

                <Route path={'*'} element={<ErrorPage/>}/>

            </Routes>
        </div>
    );
}

export default App;
