import {Outlet} from "react-router-dom";

import {UserHeader} from "../Headers";
import {CheckPermissions, setThemes, TokenValidCheck} from "../../extra_tools";

const UserLayout = () => {

    setThemes()
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
