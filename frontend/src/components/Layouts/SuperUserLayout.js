import {SuperUserHeader} from "../Headers/SuperUserHeader";
import {SuperuserAccess, TokenValidCheck} from "../../extra_tools";
import {Outlet} from "react-router-dom";

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
