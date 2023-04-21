import {Outlet} from "react-router-dom";

import {SuperUserHeader} from "../Headers";
import {SuperuserAccess, TokenValidCheck} from "../../extra_tools";

const SuperUserLayout = () => {

    TokenValidCheck()
    SuperuserAccess()

    return (
        <div className={'superuser-layout-div'}>
            <div className={'header-div'}>
                <SuperUserHeader/>
            </div>
            <Outlet/>
        </div>
    )
}

export {
    SuperUserLayout
};
