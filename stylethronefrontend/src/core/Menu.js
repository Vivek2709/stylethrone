import React,{Fragment} from 'react'
import { Redirect } from 'react-router'
import {Link,useHistory,withRouter} from "react-router-dom"
import {Dropdown,DropdownButton} from 'react-bootstrap'
import logo from "./logo.jpg"
import {signout,isAuthenticated} from '../auth/helper'
import ContactUs from './ContactUs'

const currentTab = (history,path) => {
    if(history?.location.pathname === path){
        return {color:"#2ecc72"}
    }else{
        return {color: "#EDC126"}
    }
}
const Menu = ({history}) => (
    <div>
    <head>
    <link href="shop-homepage.css" rel="stylesheet" />
    </head>
    <nav class="navbar navbar-expand-lg  navbar-light bg-dark fixed-top">
    <div class="container">
    <a class="navbar-brand" href="#">
    <img src={logo} class="img-fluid" style={{height:45,width:65,marginLeft:0 }}/></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <Link class="nav-link" /*to="/"*/ href="#" style={currentTab(history, "/")}>Home
                    <span class="sr-only">(current)</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" href="#" to="/cart" style={currentTab(history, "/cart")} >Cart</Link>
                </li>
                {/* {isAuthenticated() && isAuthenticated().user.role === 0 && (<li class="nav-item">
                    <Link class="nav-link" href="#" to="/user/dashboard" style={currentTab(history, "/cart")} >Dashboard</Link>
                </li>)} */}
                {/* <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic" className="text-warning">
                    Products
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                    <Link class="nav-link" href="login/login.html" style={currentTab(history, "/")}>T-Shirts</Link> 
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                    <Link class="nav-link" href="login/login.html" style={currentTab(history, "/")}>Shirts</Link> 
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3" >
                    <Link class="nav-link" href="login/login.html" style={currentTab(history, "/")}>Pants</Link> 
                </Dropdown.Item>
                <Dropdown.Item href="#/action-4" >
                    <Link class="nav-link" href="login/login.html" style={currentTab(history, "/")}>Shoes</Link> 
                </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown> */}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (<li class="nav-item">
            <Link class="nav-link" href="" to="/admin/dashboard" style={currentTab(history, "/")}>Admin Dashboard</Link>
        </li>)}
        {isAuthenticated() && (isAuthenticated().user.role === 2 || isAuthenticated().user.role === 1) && (<li class="nav-item">
            <Link class="nav-link" href="" to="/admin/brandadmin/dashboard" style={currentTab(history, "/")}>B.Admin Dashboard</Link>
        </li>)}
        {!isAuthenticated() && (<Fragment>
        <li class="nav-item">
            <Link class="nav-link" href="login/login.html" to="/signin" style={currentTab(history, "/")}>Sign In</Link>
        </li>
        <li class="nav-item">
            <Link class="nav-link" href="signup/signup.html" to="/signup" style={currentTab(history, "/")}>Sign Up</Link>
        </li>
        </Fragment>)}
        {isAuthenticated() && (<li class="nav-item">
            <span class="nav-link text-warning"
            onClick={() => {
                signout(() => {
                    history.push("/")
                })
            }}
            >
                Signout
            </span>
        </li>)}
        <li class="nav-item">
            <Link class="nav-link text-warning" href="contactUs/login.html" to="/user/contactus"style={currentTab(history, "/user/contactus"),{marginRight:-80}}>ContactUs</Link>
        </li>
        </ul>
    </div>
    </div>
</nav>
</div>
)  
    

export default Menu
