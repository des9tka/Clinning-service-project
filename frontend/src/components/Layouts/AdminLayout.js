import {Outlet} from "react-router-dom";

import {AdminHeader} from "../Headers";
import {AdminAccess, setThemes} from "../../extra_tools";
import {TokenValidCheck} from "../../extra_tools";

const AdminLayout = () => {

    setThemes()
    TokenValidCheck()
    AdminAccess()

    return (
        <div className={'admin-layout-div'}>
            <div className={'header-div'}>
                <AdminHeader/>
            </div>
            <Outlet/>
        </div>
    )
}

export {
    AdminLayout
};
