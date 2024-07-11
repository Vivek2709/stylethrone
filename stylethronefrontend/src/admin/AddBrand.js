import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper/index'
import Base from '../core/Base'
import { createBrand } from './helper/adminapicall'


const AddBrand = () => {
    const {user,token} = isAuthenticated();
    const [values, setValues] = useState({
        admin_name:"",
        brand_name:"",
        brand_logo:"",
        loading:false,
        error: "",
        createdBrand:"",
        getaRedirect: false,
        formData: ""
    })
    console.log(user._id)
    const {admin_name,brand_name,brand_logo,loading,error,createdBrand,getaRedirect,formData} = values
    const handleChange = name => event => {
            const value = name === "brand_logo" ? event.target.files[0] : event.target.value
            //formData.set(name,value)
            setValues({...values,[name]: value})
        }
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error: "",loading:true})
        createBrand(user._id,token,formData).then(data => {
            console.log(data)
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    admin_name:user._id,
                    brand_name:"",
                    brand_logo:"",
                    loading:false,
                    createdBrand: data.name
                })
            }
        })
    }
    const successMessage = () => (
        <div className="alert alert-success mt-3" style={{display:createdBrand ? "" :"none"}}>
            <h4>{createdBrand} created successfully</h4>
        </div>
    )
    const errorMessage = () => (
        <div className="alert alert-success mt-3" style={{display:error ? "" :"none"}}>
            <h4>{error}</h4>
        </div>
    )
    const createBrandForm = () => (
        <form className="p-4">
        <div className="form-group bg-white">
        <form>
        <span>Post photo</span>
    <div className="form-group">
        <label className="btn btn-block btn-success">
            <input
            onChange={handleChange("brand_logo")}
            type="file"
            name="brand_logo"
            accept="image"
            placeholder="choose a file"
            />
        </label>
    </div>
    <div className="form-group">
        <input
            onChange={handleChange("admin_name")}
            type="text"
            name="brand_logo"
            className="form-control"
            placeholder={user._id}
            value={admin_name}
        />
    </div>
        <div className="form-group">
        <div className="form-group">
        <input
            onChange={handleChange("brand_name")}
            name="brand_logo"
            className="form-control"
            placeholder="Brand Name"
            value={brand_name}
        />
        </div>
    </div>
        <button style={{marginTop:60}} onClick={onSubmit} className="btn btn-md bg-success mb-3">Create Brand</button>
        </form>
        </div>
        </form>
)
    return (
        <Base
        title="Add a Brand Here!"
        description="Brand creation section"
        className="container bg-info p-1"
        >
        <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {createBrandForm()}
            </div>
        </div>
        </Base>
    )
}

export default AddBrand;