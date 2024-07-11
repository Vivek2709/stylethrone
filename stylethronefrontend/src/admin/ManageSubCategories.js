import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { getSubCategories,deleteSubCategory } from './helper/adminapicall'

const ManageSubCategories = () => {
    const [subategories, setSubcategories] = useState([]);

const { user, token } = isAuthenticated();

const preload = () => {
    getSubCategories().then(data => {
    if (data.error) {
        console.log(data.error);
    } else {
        setSubcategories(data);
    }
    });
};

useEffect(() => {
    preload();
}, []);

const deleteThisSubCategory = subcategoryId => {
    deleteSubCategory(subcategoryId, user._id, token).then(data => {
        if (data.error) {
        console.log(data.error);
        } else {
        preload();
        }
    });
};
    return (
        <Base title="Welcome admin" description="Manage products here">
            <h2 className="mb-4">All products:</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
        </Link>
        <div className="row">
        <div className="col-12">
                <h2 className="text-center text-white my-3">Total 4 products</h2>

            {subategories.map((subcategory,index) => {
                    return (
            <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                    <h3 className="text-white text-left">{subcategory.name}</h3>
                </div>
                
                <div className="col-4">
                <button
                    onClick={() => {
                    deleteThisSubCategory(subcategory._id);
                    }}
                    className="btn btn-danger">
                    Delete
                </button>
                </div>
            </div>
            );
                
            })}
            
        
        </div>
    </div>
    </Base>
    )
}

export default ManageSubCategories
