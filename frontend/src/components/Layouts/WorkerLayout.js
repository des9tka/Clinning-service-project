import {TokenValidCheck} from "../../extra_tools/TokenValidCheck";
import {EmployeeAccess} from "../../extra_tools";

const WorkerLayout = () => {

    TokenValidCheck()
    EmployeeAccess()

    return (
        <div>
            WorkerLayout
        </div>
    )
}
export {
    WorkerLayout
};
