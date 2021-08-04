import React,{useState,useContext,useEffect} from 'react'
import { API } from "./../config";
import NavBarPersonal from './../core/small-components/PrivateArea'
import productUpdateContext from "./../context/product-update-context";
import {changePropertyTypeName,changePropertyConditionName} from './../controller/updateProduct'
import './../updateProduct.css'
// import {initProductForUpdate} from './../controller/updateProduct'
export default function UpdateProduct(props) {
  const {product,dispatch} = useContext(productUpdateContext);
  console.log(product)
const initProductForUpdate=(id)=>{
return fetch(`${API}/single/product`, {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({productId:id})
})
.then(function(res){ res.json().then(body =>  { 
    dispatch({type:'init_product',product:body[0]})
     }); })
    .catch(err => {
        console.log(err);
    });
}  
 
useEffect(() => {
    initProductForUpdate(props.match.params.id)
  },[]);
  return (
        <div>
            <NavBarPersonal/>
            
            <div className={'details_headline'}>
                <span className={'details_headline__text'}>פרטי המודעה</span>
            </div>
            <div className={'details_container'} >
                
                <span className={'details_field_container'}>
                    <span className={'details_field_title'}>סוג הנכס:   </span>
                    <span>    {changePropertyTypeName(product.property_type)}</span>
                </span>
                
                <span className={'details_field_container parent_field_container'}>
                        <div class="div1_field_container">
                            <span className={'details_field_title'}>מצב הנכס</span>
                            <span style={{color:'red'}} >*</span>
                        </div>
                        <div class="div2_field_container">
                            <select className={'field_container_dropDown'}>
                                <option>{changePropertyConditionName(product.property_condition)}</option>
                                <option>לא ניתן להחליף</option>
                                <option>לא ניתן להחליף</option>
                            </select>
                        </div>
                </span>
                
                <span className={'details_field_container'}>
                    <span className={'details_field_title'}>ישוב:   </span>
                    <span>{product.property_address_city}</span>
                </span>
                
                <span className={'details_field_container'}>
                    <span className={'details_field_title'}>קומה:   </span>
                    <span>{product.property_floor}</span>
                </span>

                <span className={'details_field_container parent_field_container'}>
                        <div class="div1_field_container">
                        <span className={'details_field_title'}>מתוך קומות:   </span>
                            <span style={{color:'red'}} >*</span>
                        </div>
                        <div class="div2_field_container">
                            <input type={'text'} placeholder={product.property_total_floors}  />
                        </div>
                </span>
            </div>
            <h1  onClick={()=>{dispatch({type:'change_route',route:'basic'})}}> {product.Route}</h1>
        </div>
    )
}
