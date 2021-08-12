import React,{useState,useContext,useEffect} from 'react'
import { API } from "./../config";
import NavBarPersonal from './../core/small-components/PrivateArea'
import productUpdateContext from "./../context/product-update-context";
import {changePropertyTypeName,changePropertyConditionName} from './../controller/updateProduct'
import './../css/updateProduct.css'
import { RiDeleteBin6Line} from 'react-icons/ri';

// import {initProductForUpdate} from './../controller/updateProduct'
export default function UpdateProduct(props) {
  const {product,dispatch} = useContext(productUpdateContext);
  const [success,setSuccess]=useState(false)
  const [fail,setfail]=useState(false)
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

const handleChange=(name,value)=>{
    dispatch({type:'change_field',name,value})
}

const SubmitDeleteProduct=()=>{
    fetch(`${API}/single/product/delete`, {
       method: "POST",
       headers: {
           Accept: "application/json",
           "Content-Type": "application/json"
       },
       body: JSON.stringify({product})
   })
       .then(response => {
console.log(response.json())
setSuccess(true)
document.getElementById('submit_update_buttom').disabled = true
document.getElementById('submit_update_buttom').classList = 'disabled_button'
return
})
       .catch(err => {
           setfail(true)
           console.log(err);
       });
}

const SubmitUpdateProduct=()=>{
     fetch(`${API}/single/product/update`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({product})
    })
        .then(response => {
console.log(response.json())
setSuccess(true)
document.getElementById('submit_update_buttom').disabled = true
document.getElementById('submit_update_buttom').classList = 'disabled_button'
return
})
        .catch(err => {
            setfail(true)
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
            <span  ><button className={'delete_button'} onClick={SubmitDeleteProduct}><RiDeleteBin6Line/></button></span>
            <span className={'details_headline__text'}>פרטי המודעה</span>
            </div>
            <div className={'details_container'} >
                
                <span className={'details_field_container'}>
                    <span className={'details_field_title'}>סוג הנכס:   </span>
                    <span>    {changePropertyTypeName(product.property_type)}</span>
                </span>
                
                <span className={'details_field_container parent_field_container'}>
                        <div className="div1_field_container">
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
                        <span className={'details_field_title'}>מתוך קומות   </span>
                            <span style={{color:'red'}} >*</span>
                        </div>
                        <div class="div2_field_container">
                            <input onChange={()=>{handleChange('property_total_floors',document.getElementById('total_floors_input').value)}} id={'total_floors_input'} type={'text'} placeholder={product.property_total_floors}  />
                        </div>
                </span>

                <span className={'details_field_container parent_field_container'}>
                        <div class="div1_field_container">
                        <span className={'details_field_title'}>מספר חדרים   </span>
                            <span style={{color:'red'}} >*</span>
                        </div>
                        <div class="div2_field_container">
                            <input onChange={()=>{handleChange('num_of_rooms',document.getElementById('num_of_rooms_input').value)}} id={'num_of_rooms_input'} type={'text'} placeholder={product.num_of_rooms}  />
                        </div>
                </span>

                <span className={'details_field_container parent_field_container'}>
                        <div class="div1_field_container">
                        <span className={'details_field_title'}>גודל במ"ר   </span>
                            <span style={{color:'red'}} >*</span>
                        </div>
                        <div class="div2_field_container">
                            <input onChange={()=>{handleChange('build_mr_total',document.getElementById('build_mr_total_input').value)}} id={'build_mr_total_input'} type={'text'} placeholder={product.build_mr_total}  />
                        </div>
                </span>

                <span className={'details_field_container parent_field_container'}>
                        <div class="div1_field_container">
                        <span className={'details_field_title'}>מחיר   </span>
                            <span style={{color:'red'}} >*</span>
                        </div>
                        <div class="div2_field_container">
                            <input onChange={()=>{handleChange('price',document.getElementById('price_input').value)}} id={'price_input'} type={'text'} placeholder={product.price}  />
                        </div>
                </span>
                <span className={'details_field_container parent_field_container'}>
                        <div class="div1_field_container">
                        <span className={'details_field_title'}>תיאור   </span>
                            <span style={{color:'red'}} >*</span>
                        </div>
                        <div class="div2_field_container">
                            <input onChange={()=>{handleChange('description',document.getElementById('description_input').value)}} id={'description_input'} type={'textArea'} placeholder={product.description}  />
                        </div>
                </span>
                <button id={'submit_update_buttom'}  onClick={SubmitUpdateProduct}  className={'update_button'}>
                    <span className={'update_button__title'}>עדכן</span>
                </button>
                {success&&
                <div className={'success_msg'}>
                    <span className={'success_msg_text'}>המודעה עודכנה בהצלחה</span>
                </div>}
            {fail&&<div className={'fail_msg'}>
                <span className={'success_msg_text'}>תהליך עדכון המודעה לא צלח</span>
                </div>}
            </div>
 
        </div>
    )
}
