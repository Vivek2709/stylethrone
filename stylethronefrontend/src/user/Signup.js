import React, {useState} from 'react'
import Base from "../core/Base"
import {Link} from 'react-router-dom'
import "./Signup.css"
import { signup } from '../auth/helper'

const Signup = () => {
const [values,setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    mobileNo: "",
    error: "",
    success: false
})
    const {name,lastName,email,password,role,mobileNo,error,success} = values
    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }
    const onSubmit = event => {
    event.preventDefault()
    setValues({...values,error:false})
    signup({name,lastName,email,password,role,mobileNo})
    .then(data => {
        if(data.error){
            setValues({...values,error:data.error,success:false})
        }else{
            setValues({
                ...values,
                name: "",
                lastName: "",
                email: "",
                password: "",
                role: "",
                mobileNo: "",
                error: "",
                success: true
            })
        }
    })
    .catch(console.log("Error in signup"))
    }
    const successMessage = () => {
        return(
            <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                New Account was Crated Successfully. Please <Link to="/signin">Login Here</Link>
            </div>
        )
    }
    const errorMessage = () => {
        return(
            <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
            </div>
        )
    }
    const signUpFrom = () => {
        return(
    <div>
        <head>
            <link rel="stylesheet" href="./style.css" />
            <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css" />
            <title>Sign up</title>
        </head>
        <body>
            <div class="main">
            <p class="sign" align="center">Sign Up</p>
            <form class="form1" />
                <input class="un " onChange={handleChange("name")} type="text" value={name} align="center" placeholder="First Name" />
                <input class="un " onChange={handleChange("lastName")} type="text" value={lastName} align="center" placeholder="Last Name"/>
                <input class="un " onChange={handleChange("mobileNo")} type="tel" value={mobileNo} align="center" placeholder="Mobile No" maxlength="10"/>
                <input class="un " onChange={handleChange("email")} type="email" value={email} align="center" placeholder="Email"/>
                <input class="pass" onChange={handleChange("password")} type="password" value={password} align="center" placeholder="Password"/>
                <input class="pass" onChange={handleChange("role")} type="number" align="center" placeholder="Role" max="4" min="0"/>
                <button onClick={onSubmit} class="submit" align="center">Sign up</button>
            </div>
    </body>
</div>

)


    }
    return(
        <Base title="Signup Form" description="Form For Registration">
            {successMessage()}
            {errorMessage()}
            {signUpFrom()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup