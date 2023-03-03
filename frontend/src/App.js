import {Route, Routes} from "react-router-dom";

import {OfficePage, HomePage, HelpPage, MainLayout, AboutPage, ErrorPage, LoginPage, RegisterPage, RestorePasswordPage,} from './components'
import {AuthLayout} from "./components/Layouts";

function App() {

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index path={'home'} element={<HomePage/>}/>
                    <Route path={'office'} element={<OfficePage/>}/>
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
