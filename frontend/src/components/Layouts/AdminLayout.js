import {Outlet} from "react-router-dom";

import {AdminHeader} from "../Headers";
import {AdminAccess} from "../../extra_tools";
import {TokenValidCheck} from "../../extra_tools";

const AdminLayout = () => {

    TokenValidCheck()
    AdminAccess()


    return (
        <div>
            <AdminHeader/>
            <Outlet/>
        </div>
    )
}
export {
    AdminLayout
};
