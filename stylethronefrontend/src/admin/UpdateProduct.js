import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper/index'
import Base from '../core/Base'
import {getBrands, getCategories, getSubCategories,getProduct,updateProduct} from "./helper/adminapicall"


const UpdateProduct = ({match}) => {
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
    const preloadproduct = (productId) => {
        getProduct(productId).then(data => {
            console.log(data)
            if(data.error) {
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    size: data.size,
                    //category: data.category._id,
                    //subcategory:data.subcategory._id,
                    stock: data.stock,
                    formData: new FormData()
                })
                console.log(data)
            }
            preloadcategories() 
            //preloadbrand()
        })
    }
    const preloadcategories = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({categories:data,formData: new FormData()})
            }
        })
    }
    const preloadsubcategory = () => {
        getSubCategories().then(data => {
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({subcategories:data,formData: new FormData()})
            }
        })
    }
    const preloadbrand = () => {
        getBrands().then(data => {
            console.log(brands)
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({brands:data,formData: new FormData()})
            }
        })
    }
    useEffect(() => {
        preloadproduct(match.params.productId)
        preloadcategories()
        //preloadbrand()
    }, [])
    const handleChange = name => event =>{
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name,value)
        setValues({...values,[name]: value})
    }
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error: "",loading:true})
        updateProduct(match.params.productId,user._id,token,formData).then(data => {
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
    {/*<div className="form-group">
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
    </div>*/}
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
        <button style={{marginTop:60}} onClick={onSubmit} className="btn btn-md bg-success mb-3">Update Product</button>
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

export default UpdateProduct;