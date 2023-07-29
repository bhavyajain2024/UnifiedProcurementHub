import React from "react";
import LoginNavBar from "./loginpage/NavBarLogin";
import LoginForm from "./loginpage/LoginForm";
import createFooter from "./Footer";

function LoginPage(){
    return(
        <>
            {LoginNavBar()}
            {LoginForm()}
            {createFooter()}
        </>
    );
}

export default LoginPage;