import React, { useState, useEffect,useContext, useReducer } from "react";
import Layout from "../core/Layout";
import { isAuthenticated, signout } from "../auth";
import { Link } from "react-router-dom";
import NavBarPersonal from './../core/small-components/PrivateArea'
import { useHistory } from "react-router-dom";
import { getCategories, getFilteredProducts,listProductsByUser } from "../core/apiCore";
import PersonalAreaProduct from "../core/PersonalAreaProduct";

const AdminDashboard = () => {
  let history = useHistory();
  
  const [products,setProducts]=useState([])
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    useEffect(() => {
        listProductsByUser(_id).then(
            data=>{setProducts(data)
            console.log(data)}
        )
        // console.log(_id);
      }, []) 

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <>
        <NavBarPersonal/>
        <div className={'name_logOut'}>
           <span className={'logout_personal_info'} onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }>התנתק</span>
            <span>{name} שלום</span>
        </div>
        <p className={'personal_info_my_producys'}>
            <span>איזור אישי - המודעות שלי</span>
        </p>
        <div className={'my_posts_container'} >
        <p  className={'my_posts_container__header'}>כל המודעות</p>
        {products.map((a)=>
        <PersonalAreaProduct product={a} />)}
        </div>
        </>
    );
};

export default AdminDashboard;
