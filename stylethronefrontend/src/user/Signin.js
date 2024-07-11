import React, {useState} from 'react'
import Base from "../core/Base"
import {Link,Redirect} from 'react-router-dom'
import "./Signin.css"
import { signin,authenticate,isAuthenticated} from '../auth/helper'


const Signin = () => {

    const [values,setValues] = useState({
        email: "v1a101@gmail.com",
        password: "111223344",
        role: "1",
        error: "",
        loading: false,
        didRedirect: false
    })

    const {email,password,role,error,loading,didRedirect} = values
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password,role})
        .then(data => {
            if(data?.error) {
                setValues({...values,error:data.error,loading:false})
            }else{
                authenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect:true
                    })
                })
            }
        })
        .catch(console.log("signin request failed"))
    } 
    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard"/>
            }else if((user && user.role === 2) || (user.role === 1)){
                return <Redirect to="/admin/brandadmin/dashboard"/>
            }else if(user && user.role === 3){
                return <p>redirect to delivery boy page</p>
            }else if(user && user.role === 0){
                return <Redirect to="/"/>
            }
            else{
                return <Redirect to="/"/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }
    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading</h2>
                </div>
            )
        )
    }
    const errorMessage = () => {
        return(
            <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
            </div>
        )
    }
    const signInForm = () => {
        return (
        <div style={{marginBottom:0}}>
            <head>
                    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"/>
                <title>Sign in</title>
            </head>
            <body>
                <div class="mainc">
                    <p class="sign" align="center">Sign In</p>
                    <form class="form1" />
                    <input class="un " onChange={handleChange("email")} value={email} type="email" align="center" placeholder="Email" />
                    <input class="pass" onChange={handleChange("password")} value={password} type="password" align="center" placeholder="Password" />
                    <input class="pass" onChange={handleChange("role")} value={role} type="number" align="center" placeholder="Role" max="4" min="0" />
                    <button class="submit" onClick={onSubmit} align="center">Sign in</button>
                    <p class="forgot" align="center"><a href="#" />Forgot Password?</p>
                </div>
</body>

            </div>
        )
    }
    return(
        <Base style={{marginBottom:0}} title="Sign up Page">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin