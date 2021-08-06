import React from 'react'
import './../core/small-components/small_css/personalArea.css'
import { FaPencilAlt} from 'react-icons/fa';
import { Link } from "react-router-dom";



export default function PersonalAreaProduct(props) {
    let lastUpdate  = new Date(props.product.updatedAt).toLocaleDateString("en-US");
    console.log(lastUpdate);
    console.log(props)
    return (
        <div>
            {/* {props.product.Route} */}
            <div class="parent_personalArea">
<div class="div1_personalArea">
    <img className={'personalArea__img'} src={props.product.pic1} ></img>
</div>
<div class="div2_personalArea">
      <Link  to={`/update/product/${props.product._id}`}>
  <span className={'edit_pencil'}>
      <FaPencilAlt/>
      </span>  
      </Link>
</div>
<div class="div3_personalArea">
    <span className={'personalArea_field_title'}>
        <span>דירות למכירה, </span>
        <span>   {props.product.property_address_city}</span>
    </span>
</div>
<div class="div4_personalArea">
<span style={{fontWeight:'400'}} className={'personalArea_field_title'}>
        <span>עדכון אחרון: </span>
        <span>   {lastUpdate}</span>
    </span>
</div>
<div class="div5_personalArea">
<span style={{fontWeight:'400'}} className={'personalArea_field_title'}>
        <span>מחיר: </span>
        {props.product.price&&
            <span style={{fontWeight:'500'}}>   	&#x20aa;{props.product.price}</span>
            }
    </span> </div>
<div class="div6_personalArea">
<span className={'green_title'}>
    מודעה פעילה
</span>
</div>
</div>
        </div>
    )
}
