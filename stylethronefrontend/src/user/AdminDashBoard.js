import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper/index'
import Base from '../core/Base'


const AdminDashBoard = ()  => {
    const {user : {name,email,role}} = isAuthenticated();
    const adminLeftSide = () => {
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className = "text-link text-success">Create Categories</Link>
                    </li>
                </ul>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/categories" className = "text-link text-success">Manage Categories</Link>
                    </li>
                </ul>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/subcategory" className = "text-link text-success">Create SubCategories</Link>
                    </li>
                </ul>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/subcategories" className = "text-link text-success">Manage SubCategories</Link>
                    </li>
                </ul>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/brand" className = "text-link text-success">Create Brand</Link>
                    </li>
                </ul>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/Orders" className = "text-link text-success">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const adminRightSide = () => {
        return(
            <div className="card mb-4">
                <h4 className="card-header">Admin Informaition</h4>
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
                        <span className="badge badge-danger">Admin Area</span>
                    </li>
                </ul>
            </div>
        )
    }   
    return (
        <Base title="Welcome to Admin Page" description="Manage All Products,Brands & Categories" className="container bg-success p-4">
            <div className="row">
                <div className="col-3">
                    {adminLeftSide()}
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div>
        </Base>
    )
}

export default AdminDashBoard;