import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper/index'
import Base from '../core/Base'
import {getBrands, getCategories, getSubCategories,createProduct} from "./helper/adminapicall"


const AddProduct = () => {
    const {user,token} = isAuthenticated();
    const [values, setValues] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        size:"",
        category:"",
        categories: [],
        subcategory:"",
        subcategories: [],
        brand:"",
        brands: [],
        loading:false,
        error: "",
        createdProduct:"",
        getaRedirect: false,
        formData: ""
    })
    const {name,description,price,stock,size,category,subcategories,categories,subcategory,brand,brands,loading,error,createdProduct,getaRedirect,formData} = values
    const preloadcategory = () => {
        getCategories().then(data => {
            console.log(data)
            if(data.error) {
                setValues({...values,error:data.error})
            }else{
                setValues({...values,categories:data,formData: new FormData()})
                console.log(data)
            }
        })
        getSubCategories().then(data => {
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,subcategories:data,formData: new FormData()})
            }
        })
        getBrands().then(data => {
            console.log(brands)
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,brands:data,formData: new FormData()})
            }
        })
    }
    const preloadsubcategory = () => {
        getSubCategories().then(data => {
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,subcategories:data,formData: new FormData()})
            }
        })
    }
    const preloadbrand = () => {
        getBrands().then(data => {
            console.log(brands)
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,brands:data,formData: new FormData()})
            }
        })
    }
    useEffect(() => {
        preloadbrand()
        preloadsubcategory()
        preloadcategory()
    }, [])
    const handleChange = name => event =>{
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name,value)
        setValues({...values,[name]: value})
    }
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error: "",loading:true})
        createProduct(user._id,token,formData).then(data => {
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    name:"",
                    description:"",
                    size:"",
                    price:"",
                    photo:"",
                    stock:"",
                    loading:false,
                    createdProduct: data.name
                })
            }
        })
    }
    const successMessage = () => (
        <div className="alert alert-success mt-3" style={{display:createdProduct ? "" :"none"}}>
            <h4>{createdProduct} created successfully</h4>
        </div>
    )
    const errorMessage = () => (
        <div className="alert alert-success mt-3" style={{display:error ? "" :"none"}}>
            <h4>{error}</h4>
        </div>
    )
    const createProductForm = () => (
        <form className="p-4">
        <div className="form-group bg-white">
        <form>
        <span>Post photo</span>
    <div className="form-group">
        <label className="btn btn-block btn-success">
            <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
            />
        </label>
    </div>
    <div className="form-group">
        <input
            onChange={handleChange("name")}
            name="photo"
            className="form-control"
            placeholder="Name"
            value={name}
        />
    </div>
        <div className="form-group">
        <textarea
            onChange={handleChange("description")}
            name="photo"
            className="form-control"
            placeholder="Description"
            value={description}
        />
        <div className="form-group">
        <input
            onChange={handleChange("size")}
            name="photo"
            className="form-control"
            placeholder="Size"
            value={size}
        />
    </div>
        <div className="form-group mt-3">
            <input
                onChange={handleChange("price")}
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
        />
    </div>
    <div className="form-group">
        <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
        >
            <option>Select Category</option>
            {categories && categories.map((cate,index) => (
                <option key={index} value={cate._id}>{cate.name}</option>
            ))}
            
        </select>
    </div>
    <div className="form-group">
        <select
            onChange={handleChange("sub_category")}
            className="form-control"
            placeholder="SubCategory"
        >
            <option>Select SubCategory</option>
            {subcategories && subcategories.map((subcate,index) => (
                <option key={index} value={subcate._id}>{subcate.name}</option>
            ))}
        </select>
    </div>
    <div className="form-group">
        <select
            onChange={handleChange("brand")}
            className="form-control"
            placeholder="Brand"
        >
            <option>Select Brand</option>
            {brands && brands.map((brand,index) => (
                <option key={index} value={brand._id}>{brand.brand_name}</option>
            ))}
        </select>
    </div>
        <div className="form-group">
        <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={stock}
        />
    </div>
    </div>
        <button style={{marginTop:60}} onClick={onSubmit} className="btn btn-md bg-success mb-3">Create Product</button>
        </form>
        </div>
        </form>
)
    return (
        <Base
        title="Add a Product Here!"
        description="product creation section"
        className="container bg-info p-1"
        >
        <Link to="/admin/brandadmin/dashboard" className="btn btn-md btn-dark mb-3"> Brand Admin Home</Link>
        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {createProductForm()}
            </div>
        </div>
        </Base>
    )
}

export default AddProduct;