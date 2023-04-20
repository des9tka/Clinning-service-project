import {Outlet} from "react-router-dom";

import {EmployeeAccess, TokenValidCheck} from "../../extra_tools";
import {WorkerHeader} from "../Headers";

const WorkerLayout = () => {

    TokenValidCheck()
    EmployeeAccess()

    return (
        <div className={'employee-layout-div'}>
            <div className={'header-div'}>
                <WorkerHeader/>
            </div>
            <Outlet/>
        </div>
    )
}
export {
    WorkerLayout
};
