import {Outlet} from "react-router-dom";

import {UserHeader} from "../Headers";
import {CheckPermissions, TokenValidCheck} from "../../extra_tools";

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
