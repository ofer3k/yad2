import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import PrivateArea from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import SearchForm from "./core/SearchForm";
import Product from "./core/Product";
import SearchFormUpgrade from './core/SearchFormUpgrade'
import Cart from "./core/Cart";
import ProductPopup from "./core/ProductPopUp";
import SearchState from "./context/SearchState";
import SearchState2 from "./context/SearchState2";
import ProductState from "./context/ProductState";
import ProductUpdateState from "./context/ProductUpdateState";
import PicsCarousel from "./core/small-components/PicsCarousel";
import UpdateProduct from "./admin/UpdateProduct";
const Routes = () => {
    return (
        <BrowserRouter>
        
            <Switch>
            <SearchState2>
            <Route path="/SearchFormUpgrade" exact component={SearchFormUpgrade} />
            </SearchState2>
            </Switch>
            
            <Switch>
            <ProductUpdateState>
                  <AdminRoute
                    path="/update/product/:id"
                    exact
                    component={UpdateProduct}
                />
                  </ProductUpdateState>
            </Switch>
            <Switch>
                <SearchState>
                <Route path={["/", "/shop"]} exact component={Shop} />
                <Route path="/SearchForm" exact component={SearchForm} />
                </SearchState>
            </Switch>
 
                <Switch>    
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
                    component={PrivateArea}
                />
                
                <AdminRoute
                    path="/create/category"
                    exact
                    component={AddCategory}
                />

                  <ProductState>
                  <AdminRoute
                    path="/create/product"
                    exact
                    component={AddProduct}
                />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/product/popup/:productId" exact component={ProductPopup} />
                <Route path="/carousel/:productId" exact component={PicsCarousel} />
                  </ProductState>

                  
                <Route path="/cart" exact component={Cart} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
