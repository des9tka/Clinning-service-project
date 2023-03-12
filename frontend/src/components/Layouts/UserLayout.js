import {Outlet} from "react-router-dom";

import {UserHeader} from "../Headers/UserHeader";
import {CheckPermissions} from "../../extra_tools";
import {TokenValidCheck} from "../../extra_tools";

const UserLayout = () => {

    TokenValidCheck()
    CheckPermissions()


    return (
        <div>
            <UserHeader/>
            <Outlet/>
        </div>
    )
}
export {
    UserLayout
};
