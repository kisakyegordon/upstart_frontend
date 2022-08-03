import React, { useState, useEffect } from "react";
import {Link, Navigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { instance } from "../utilities/config.js";

function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [account, setAccount] = useState(false);

    useEffect(() => {

    }, [])

    const notify = () => toast("User Registered");

    const redirect = () => <Navigate to={{pathname: '/login'}}/>;

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("submit: ", email, password);
        // {() => <Navigate to={{pathname: '/login'}}/>}
        // <Navigate to={{pathname: '/login'}}/>
        // <Redirect to="/login" />
        register(email, password);
    }

    const register = (email, password) => {
        return instance.post('/users/signup', {
            email,
            password
        })
        .then((response) => {
            console.log(response);
            toast.success("User Registered");
            // localStorage.setItem('token', response.data.token );
         })
        .catch((error) => { 
            console.error(error);
            if(error.response.status === 409) {
                toast.error("Duplicate Entry")
            } else {
                toast.error("Something went wrong!")
            }
        })
    }

    const onChange = (e) => {
        if(e.target.name === "email") {
            setEmail(e.target.value);
        } else if(e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    return (
        <div>
            {
            
        <div>
        <div className="form">
        { 
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
                        <button label="Submit" type="submit" onChange={onSubmit} >Register</button>
                    </div>
                </div>
            </form> 
        }
    </div>
    <ToastContainer />
    </div>
        }

        </div>

        // <div>
        //     {account && <Navigate to={{pathname: '/login'}}/>}
        //     <div className="form">
        //     { 
            
        //         <form className="form__form" onSubmit={onSubmit}>
        //             <label>Email </label>
        //             <input type="text" value={email} onChange={onChange} name='email'/>
        //             <label>Password </label>
        //             <input type='password' value={password} onChange={onChange} name='password' />
        //             <div className="GtglAe">
        //                 <div> 
        //                     <button label="Submit" type="submit" onChange={onSubmit} >Register</button>
        //                 </div>
        //             </div>
        //         </form> 
        //     }
        // </div>
        // <ToastContainer />
        // </div>

    )
}

export default RegisterForm;