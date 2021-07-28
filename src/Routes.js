import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import SearchForm from "./core/SearchForm";
import Product from "./core/Product";
import Cart from "./core/Cart";
import ProductPopup from "./core/ProductPopUp";
import AppState from "./context/AppState";
import SearchState from "./context/SearchState";
const Routes = () => {
    return (
        <BrowserRouter>
            
            <Switch>

                <SearchState>
                <Route path={["/", "/shop"]} exact component={Shop} />
                <Route path="/SearchForm" exact component={SearchForm} />
                </SearchState>

                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                
                <PrivateRoute
                    path="/user/dashboard"
                    exact
                    component={Dashboard}
                />
                <AdminRoute
                    path="/admin/dashboard"
                    exact
                    component={AdminDashboard}
                />
                <AdminRoute
                    path="/create/category"
                    exact
                    component={AddCategory}
                />
                <AdminRoute
                    path="/create/product"
                    exact
                    component={AddProduct}
                />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/product/popup/:productId" exact component={ProductPopup} />
                <Route path="/cart" exact component={Cart} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
