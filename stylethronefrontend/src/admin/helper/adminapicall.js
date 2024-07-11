import { API } from "../../backend";

//* category calls
export const createCategory = (userId,token,category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const deleteCategory = (categoryId,userId,token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


//* subcategory calls
export const createSubCategory = (userId,token,subcategory) => {
    return fetch(`${API}/subcategory/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(subcategory)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//getAllSubCategories
export const getSubCategories = () => {
    return fetch(`${API}/subcategories`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const deleteSubCategory = (subcategoryId,userId,token) => {
    return fetch(`${API}/subcategory/${subcategoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


//products calls

//create a product
export const createProduct = (userId,token,product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//get a product 
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//get all products
export const getProducts = () => {
    return fetch(`${API}/products`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}



//update a product 
export const updateProduct = (productId,userId,token,product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "PUT",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
//delete a product
export const deleteProduct = (productId,userId,token,) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//Brand calls

//create a brand
export const createBrand = (userId,token,brand) => {
    return fetch(`${API}/brand/create/${userId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(brand) && brand.brand_logo
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//get a brand 
export const getBrand = brandId => {
    return fetch(`${API}/brand/${brandId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//get all brands
export const getBrands = () => {
    return fetch(`${API}/brands`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//update a brand 
export const updateBrand = (brandId,userId,token,brand) => {
    return fetch(`${API}/brand/${brandId}/${userId}`,{
        method: "PUT",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: brand
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//delete a brand
export const deleteBrand = (brandId,userId,token,) => {
    return fetch(`${API}/brand/${brandId}/${userId}`,{
        method: "DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

