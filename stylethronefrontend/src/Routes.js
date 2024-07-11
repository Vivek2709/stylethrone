import React from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Home from './core/Home'
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import AdminRoute from './auth/helper/AdminRoutes'
import BrandAdminRoute from './auth/helper/BrandAdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashBoard from './user/UserDashBoard'
import AdminDashBoard from './user/AdminDashBoard'
import BrandAdminDashBoard from './user/BrandAdminDashBoard'
import AddCategory from './admin/AddCategory'
import AddSubCategory from './admin/AddSubCategory'
import ManageCategories from './admin/ManageCategories'
import ManageSubCategories from './admin/ManageSubCategories'
import AddProduct from './admin/AddProduct'
import AddBrand from './admin/AddBrand'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import Cart from './core/Cart'
import ContactUs from './core/ContactUs'


const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/cart" exact component={Cart} />
                    <Route path="/cart" exact component={ContactUs} />
                    <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
                    <AdminRoute path="/admin/create/category" exact component={AddCategory}/>
                    <AdminRoute path="/admin/create/subcategory" exact component={AddSubCategory}/>
                    <AdminRoute path="/admin/categories" exact component={ManageCategories}/>
                    <AdminRoute path="/admin/subcategories" exact component={ManageSubCategories}/>
                    <AdminRoute path="/admin/create/brand" exact component={AddBrand}/>
                    <BrandAdminRoute path="/admin/brandadmin/dashboard" exact component={BrandAdminDashBoard}/>
                    <BrandAdminRoute path="/admin/create/product" exact component={AddProduct}/>
                    <BrandAdminRoute path="/admin/prodcuts" exact component={ManageProducts}/>
                    <BrandAdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes
