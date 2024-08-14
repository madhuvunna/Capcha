import React, { useState } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha";
import { useEffect, useRef } from "react";
import axios from "axios";
// import './App.css'
import { useFormik } from "formik";
// import { GlobalStyle } from "./styles/globalStyles";
import * as Yup from "yup";

const Login = () => {
    const valueRef = useRef(null);

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        // getAllUsers();

        loadCaptchaEnginge(4);
    }, []);

    const initialValues = {
        Uname: "",
        // Phone:"",
        Email: "",
        Password: "",
        captcha: "",
    };

    const signUpSchema = Yup.object().shape({
        Uname: Yup.string().min(3).max(20).required("Please Enter your name"),
        // Phone: Yup.number().min(10).required("Please Enter your Phone Number"),
        Email: Yup.string().email().required("Please Enter your Email"),
        Password: Yup.string().min(5).required("Please Enter your Password"),
        captcha: Yup.string().min(4).required("Please Enter the Captcha"),
    });

    const inputCaptcha = (values) => {
        const input = valueRef.current.value;
        if (validateCaptcha(input)) {
            alert("The captcha is valid");
            // console.log(values);
        }
        else {
            alert("The Captcha is invalid");
            // console.log("please enter the valid captcha");
        }
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values) => {
            inputCaptcha(values);
            //     console.log(values);
        },
    });

    function SubmitButton() {
        if (values.Uname && values.Email && values.Password && valueRef.current.value) {
            return <button type="submit" className="btn btn-primary" onClick={inputCaptcha} enable="true">Submit</button>
        }
        else {
            return <button type="submit" className="btn btn-primary" onClick={inputCaptcha} disabled >Submit</button>
        }
    }
    let userObject = { userName, email, password }
    axios.post("http://localhost:8080/count/save", userObject)
        .then(
            result => {
                // getAllUsers();
                if (result.status === 201) {
                    // setReset(false)
                    setUserName("")
                    setEmail("")
                    setPassword("")
                }
            }
        )


    // console.log(errors);

    return (

        <>
            {/* <GlobalStyle/> */}
            <div className="container" >
                <div className="modal">
                    <div className="modal-container">
                        <div className="modal-left">
                            <h1 className="modal-title">Login Portal</h1>
                            <form action="" onSubmit={handleSubmit} >
                                <div className="input-block">
                                    <label htmlFor="Username" className="input-label">UserName</label>
                                    <input type="text" id="Uname" name="Uname" placeholder="Username" value={values.Uname}
                                        onChange={handleChange} onBlur={handleBlur} autoComplete="off" />
                                    <div className="valid">
                                        {errors.Uname && touched.Uname ? <p className="form-error">{errors.Uname}</p> : null}
                                    </div>
                                </div>
                                {/* <div className="input-block">
                        <label htmlFor="Phone" className="input-label">PhoneNumber</label>
                    <input type="text"  style={{width :150,height :30,marginRight:75}}id="phone" placeholder="Phone Number" value={values.Phone}
                     onChange={handleChange} onBlur={handleBlur} autoComplete="off"></input>
                     { errors.Phone && touched.Phone ? <p className="form-error">{errors.Phone}</p> : null }
                </div> */}
                                <div className="input-block">
                                    <label htmlFor="Email" style={{ marginLeft: 38 }} className="input-label">E-mail</label>
                                    <input type="email" id="Email" name="Email" placeholder="Email" value={values.Email}
                                        onChange={handleChange} onBlur={handleBlur} autoComplete="off" />
                                    <div className="valid">
                                        {errors.Email && touched.Email ? <p className="form-error">{errors.Email}</p> : null}
                                    </div>
                                </div>
                                <div className="input-block">
                                    <label htmlFor="password" style={{ marginLeft: 10 }} className="input-label">Password</label>
                                    <input type="password" id="Password" name="Password" placeholder="Password" value={values.Password}
                                        onChange={handleChange} onBlur={handleBlur} autoComplete="off" />
                                    <div className="valid">
                                        {errors.Password && touched.Password ? <p className="form-error">{errors.Password}</p> : null}
                                    </div>
                                </div>
                                <br></br>
                                <div className="" style={{ marginLeft: 60 }} >
                                    < LoadCanvasTemplate reloadText="Reload" reloadColor="blue" />
                                    <div className="input-block">
                                        <input type="text" ref={valueRef} id="captcha" style={{ marginLeft: 20 }} name="captcha" placeholder="Enter the Captcha"
                                            onChange={handleChange} onBlur={handleBlur} autoComplete="off" />
                                        {errors.captcha && touched.captcha ? <p className="form-error">{errors.captcha}</p> : null}
                                    </div>
                                </div>
                                {/* <div className="modal-button"> */}
                                {/* <button type="submit" className="input-button" onClick={inputCaptcha} >Submit</button> */}
                                <SubmitButton />
                                {/* </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;