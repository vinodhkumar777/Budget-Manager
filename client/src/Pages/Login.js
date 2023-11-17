import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Component/Layout/Loading";
import { useState } from "react";
 import './login.css'
 import img1 from  "../Images/computer-login-concept-illustration_114360-7892.avif"
import Password from "antd/es/input/Password";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8080/api/v1/users/login", values);
      message.success("Login Successfully");
      console.log(data)
      localStorage.setItem("user", JSON.stringify({ ...data.user ,Password:""}));
      console.log(localStorage.getItem("user"));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error.response.data)
      message.error(error.response.data);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="main_container">
      {loading && (
          
          <div className="loading-container">
            <Loading />
          </div>
        )}
        
        <div className="container_login">
          <h1>Login</h1>
          <div className="login_form">

            <div className="login_img">
              <img className="loginimg" src={img1} alt="loginimg"/>
            </div>
            
            
          <Form layout="vertical" onFinish={submitHandler} className="form">
          <div className="login_data">
            <Form.Item label="E-mail" name="email" className="input_label">
              <Input type="email" required />
            </Form.Item>
            <Form.Item  className="input_label" label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
            </div>
            <div className="register_login">
              <Link className="input_label" to={"/register"}>New User ?  <span className="span_data">Click to Register</span></Link>
              <button className="login_btn">Login</button>
            </div>
          </Form>
         
      
         

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
