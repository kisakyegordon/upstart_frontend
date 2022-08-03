import React, { useState, useEffect } from "react";
import {Link, Navigate} from 'react-router-dom';
import { instance } from "../utilities/config.js";
import "./login.css";

function LoginForm() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {

        if (isAuthenticated) {

        }

    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("submit: ", email, password);
        signin(email, password);
    }

    const signin = (email, password) => {
        return instance.post('/users/signin', {
            email,
            password
        })
        .then((response) => { 
            console.log("response: ", response);
            localStorage.setItem('token', response.data.data.token );
            setIsAuthenticated(true);
         })
        .catch((error) => { console.error(error); })
    }

    const onChange = (e) => {
        if(e.target.name === "email") {
            setEmail(e.target.value);
        } else if(e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    return (
        <div className="form">
            { isAuthenticated ?
                <Navigate to={{pathname: '/todos'}}/>
                :  
                <form className="form__form" onSubmit={onSubmit}>
                    <label>
                        <span>Email</span>
                    <input type="text" value={email} onChange={onChange} name='email'/>
                    </label>
                    <label>
                    <span>Password</span>
                    <input type='password' value={password} onChange={onChange} name='password' />
                    </label>
                    <div className="GtglAe">
                        <div> 
                            <button label="Submit" type="submit" onChange={onSubmit} >Submit</button>
                        </div>
                    </div>
                </form> 
            }
        </div>
    )
}

export default LoginForm;