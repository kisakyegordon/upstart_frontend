import React, {useState} from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

function Login() {

    return (
        <div>
            <div className="banner">Login Page</div>
            <LoginForm />
        </div>
    )

}

export default Login;