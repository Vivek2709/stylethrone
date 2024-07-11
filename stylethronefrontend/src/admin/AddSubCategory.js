import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createSubCategory } from './helper/adminapicall';


const AddCategory = () => {
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const {user,token} = isAuthenticated()
    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-samll btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )
    const handleChange = (event) => {
        setError("");
        setName(event.target.value)
    };
    const onSubmit = (event) => {
        event.preventDefault()
        setError("")
        setSuccess(false)
        //* backend request fired
        createSubCategory(user._id,token,{name})
            .then(data => {
                if(data.error){
                    setError(true)
                }else{
                    setError("")
                    setSuccess(true);
                    setName("");
                }
            })
    };
    const successMessage = () => {
        if(success){
            return <h4 className="text-success">SubCategory created successfully</h4>
        }
    }
    const warningMessage = () => {
        if(error){
            return <h4 className="text-success">Failed to create subcategory</h4>
        }
    }
    const mySubCategoryForm = () => (
        <form>
            <div className="from-group">
                <p className="lead">Enter the SubCategory</p>
                <input type="text"
                className="form-control my-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="For Ex.Summer"
                />
                <button onClick={onSubmit} className="btn btn-outline-info">Create SubCategory</button>
            </div>
        </form>
    )
    return (
        
        <Base title="Create a SubCategory here" description="Add a new SubCategory for products">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {mySubCategoryForm()}
                    {goBack()}
                </div>
            </div>   
        </Base>
    )
}

export default AddCategory;