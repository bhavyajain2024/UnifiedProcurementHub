import React from "react";
import RegistrationNavBar from "./registrationpage/NavbarRegistration";
import RegistrationForm from "./registrationpage/RegistrationForm";
import createFooter from "./Footer";

function Register(){
    return(
        <>
            {RegistrationNavBar()}
            {RegistrationForm()}
            {createFooter()}
        </>
    );
}

export default Register;