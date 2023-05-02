import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {userActions} from "../../../redux";
import {LoadingPage} from "./LoadingPage";
import {ErrorPage} from "./ErrorPage";
import {EmployeesBuilder} from "../../EmployeesBuilder";

const HomePage = () => {

    const {users, error, loading} = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.setBestEmployee())
    }, [])

    console.log(1)

    return (
        <div className={'home-page-div'}>
            {loading && <LoadingPage/>}
            {error && <ErrorPage error={error}/>}

            <div className={'phone-div'}>
                <label className={'contacts'}>Contacts</label>
                <div className={'phone'}>+ 380 050 424 24 24</div>
            </div>
            <h1 className={'head'}>Cleaning Service</h1>

            <h3 className={'description'}>About Company</h3>
            <div className={'about-wrap'}>
                <h2 className={'about-text'}>Welcome to our cleaning service page, where we offer a range of professional cleaning services that cater to your
                    specific cleaning needs. Our team of well-trained and experienced professionals will work tirelessly to ensure that your home or office is
                    cleaned thoroughly and efficiently, leaving you with more time to focus on other important tasks. <br/>Our cleaning services provide a range
                    of
                    benefits that can improve your daily life. For instance, by hiring our cleaning service, you save time and energy that would otherwise be
                    spent
                    on cleaning. Our team is equipped with the necessary tools and equipment to ensure that your home or office is cleaned to the highest
                    standards.
                    <br/>We understand the importance of a clean and healthy environment, and that is why we use eco-friendly cleaning products that are safe
                    for
                    you and the environment. Our cleaning products are effective in removing dirt, dust, and other pollutants that could lead to respiratory
                    problems and allergies.
                    <br/>A clean and organized environment can improve productivity and reduce stress, which is especially important in the workplace. We offer
                    customized services that cater to your specific needs, whether you need daily, weekly, or monthly cleaning, or specialized services like
                    carpet
                    cleaning or window washing. Our services are designed for homeowners who need help keeping their homes clean and tidy, businesses and
                    organizations that need help keeping their offices and facilities clean, and homeowners and renters who are moving into or out of a home or
                    apartment.
                    <br/>We offer a range of cleaning services that include basic cleaning tasks like dusting, vacuuming, and mopping, as well as more
                    specialized
                    tasks like cleaning carpets and upholstery, emptying trash cans, and cleaning restrooms. Our move-in/move-out cleaning services include deep
                    cleaning tasks like cleaning the oven and refrigerator, as well as basic cleaning tasks like dusting and vacuuming.
                    <br/>In conclusion, our cleaning services offer a range of benefits that can improve your daily life. We save you time and energy, provide
                    professional cleaning, improve your health, increase productivity, and offer customized services. If you are struggling to keep your home or
                    office clean and tidy, consider hiring our cleaning service today. Contact us to schedule your cleaning service today!</h2>
            </div>

            {users && (<div>
                <h1 className={'about-text'}>Our best 5 employees</h1>
                <div className={'employee-wrap'}>
                    {users.map(user => <EmployeesBuilder employee={user}/>)}
                </div>
            </div>)}
        </div>
    )
}

export {
    HomePage
};
