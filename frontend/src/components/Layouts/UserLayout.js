import {Outlet} from "react-router-dom";

import {UserHeader} from "../Headers";
import {CheckPermissions, TokenValidCheck} from "../../extra_tools";

const UserLayout = () => {

    TokenValidCheck()
    CheckPermissions()

    return (
        <div className={'user-layout-div'}>
            <div className={'header-div'}>
                <UserHeader/>
            </div>
            <Outlet/>
        </div>
    )
}

export {
    UserLayout
};
