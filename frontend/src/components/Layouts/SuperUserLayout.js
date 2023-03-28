import {Outlet} from "react-router-dom";

import {SuperUserHeader} from "../Headers";
import {SuperuserAccess, TokenValidCheck} from "../../extra_tools";

const SuperUserLayout = () => {

    TokenValidCheck()
    SuperuserAccess()

    return (
        <div>
            <SuperUserHeader/>
            <Outlet/>
        </div>
    )
}
export {
    SuperUserLayout
};
