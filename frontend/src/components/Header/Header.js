import {Link} from "react-router-dom";

const Header = () => {

    return (
        <div className={'header'}>
            <div>
                <Link to={'/home'}>Home</Link>
            </div>
            <div>
                <Link to={'/office'}>My cabinet</Link>
            </div>
            <div>
                <Link to={'/about'}>About</Link>
            </div>
            <div>
                <Link to={'/help'}>Help</Link>
            </div>
            <div>
                <Link to={'/auth'}>Auth</Link>
            </div>
        </div>
    )
}
export {Header};
