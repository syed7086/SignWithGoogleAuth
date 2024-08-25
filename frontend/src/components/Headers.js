import React, { useEffect, useState } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
const Headers = () => {

  const [userData, setUserData] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/success", {withCredentials:true});
      console.log("Resonse", response); 
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getUser();
  },[])


  return (
    <>
      <header>
        <nav>
          <div className="left">
            <h1>Syed</h1>
          </div>
          <div className="right">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li><img src="/logo192.png" style={{width:"50px", borderRadius:"50%"}} alt="" /></li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Headers;
