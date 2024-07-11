import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'


const BrandAdminDashBoard = ()  => {
    const {user : {name,email,role}} = isAuthenticated();
    const brandAdminLeftSide = () => {
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">Brand Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className = "text-link text-success">Create Product</Link>
                    </li>
                </ul>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/prodcuts" className = "text-link text-success">Manage Product</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const brandAdminRightSide = () => {
        return(
            <div className="card mb-4">
                <h4 className="card-header">Brand Admin Informaition</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name:</span> {name}
                    </li>
                </ul>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email:</span> {email}
                    </li>
                </ul>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-danger">Brand Admin Area</span>
                    </li>
                </ul>
            </div>
        )
    }   
    return (
        <Base title="Welcome to Admin Page" description="Manage All Products,Brands & Categories" className="container bg-success p-4">
            <div className="row">
                <div className="col-4">
                    {brandAdminLeftSide()}
                </div>
                <div className="col-8">
                    {brandAdminRightSide()}
                </div>
            </div>
        </Base>
    )
}

export default BrandAdminDashBoard;