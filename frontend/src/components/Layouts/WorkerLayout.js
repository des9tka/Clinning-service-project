import {Outlet} from "react-router-dom";

import {EmployeeAccess, TokenValidCheck} from "../../extra_tools";
import {WorkerHeader} from "../Headers/WorkerHeader";

const WorkerLayout = () => {

    TokenValidCheck()
    EmployeeAccess()

    return (
        <div>
            <WorkerHeader/>
            <Outlet/>
        </div>
    )
}
export {
    WorkerLayout
};
