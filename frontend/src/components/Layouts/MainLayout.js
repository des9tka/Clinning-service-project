import {MenuHeader} from "../Headers/MenuHeader";
import {Outlet} from "react-router-dom";

const MainLayout = () => {

    return (
        <div>
            <MenuHeader/>
            <Outlet/>
        </div>
    )
}
export {MainLayout};
