import {Outlet} from "react-router-dom";

import {EmployeeAccess, setThemes, TokenValidCheck} from "../../extra_tools";
import {WorkerHeader} from "../Headers";

const WorkerLayout = () => {

    setThemes()
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
