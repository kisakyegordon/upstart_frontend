import React, {useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import { NavLink, Navigate, useNavigate }  from 'react-router-dom';
import "./Nav.css";

function Nav() {

    const [user, setUser] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
    }, [])

    const getUserEmail = () => {
        let decoded;
        if(localStorage.getItem('token')) {
            decoded = jwt_decode(localStorage.getItem("token"));  
        } else return "";

        return decoded.email || "";
    }

    return (
        <div className="nav">
            <div className="nav__logo">Upstart</div>
            <div className="nav__user">
                {localStorage.getItem("token") ?
                (
                    <div style={{ fontWeight: "bold", color: "#444"}}>
                        <span style={{color: "#00b7ff"}} >Hi</span>
                    <span>{` ${getUserEmail()} | `}</span>
                    <span style={{color: "#df4131"}} onClick={() => {
                        localStorage.removeItem("token");
                        navigate('/login')
                    }}>Sign out</span>
                    </div>


                )
                : 
                <div style={{ fontWeight: "bold", color: "#444" }}>
                    <span onClick={() => navigate("/login")}>Sign In</span>
                    <span> | </span>
                    <span onClick={() => navigate("/register")}>Sign Up</span>
                </div>
                }
            </div>

        </div>
    )

}

export default Nav;