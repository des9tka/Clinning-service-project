import {Navigate, Route, Routes} from "react-router-dom";

import {OfficePage, HomePage, HelpPage, MainLayout, AboutPage, ErrorPage, LoginPage, RegisterPage, RestorePasswordPage,} from './components'
import {AuthLayout} from "./components/Layouts";
import {OrderDetailsPage} from "./components/Pages/OrderDetailsPage";

function App() {

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<Navigate to={'/home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'office'} element={<OfficePage/>}/>
                    <Route path={'/office/order/:id/details'} element={<OrderDetailsPage/>}/>
                    <Route path={'about'} element={<AboutPage/>}/>
                    <Route path={'help'} element={<HelpPage/>}/>
                </Route>
                <Route path={'auth'} element={<AuthLayout/>}>
                    <Route path={'login'} element={<LoginPage/>}/>
                    <Route path={'register'} element={<RegisterPage/>}/>
                    <Route path={'restore_password'} element={<RestorePasswordPage/>}/>
                </Route>
                <Route path={'*'} element={<ErrorPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
