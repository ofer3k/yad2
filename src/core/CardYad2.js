import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { correctName } from "../controller/transform_data_to_display";

const CardYad2 = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false
}) => {
    console.log({...product})
    const [redirect, setRedirect] = useState(false);
    // const [count, setCount] = useState(product.count);

    return (
<Link style={{color:'black'}} to={`/product/popup/${product._id}`} >

        <div  dir='ltr' className="card">
<div style={{height:'110px'}} style={product.Route==='vip'?{backgroundColor:'#fdf9c5',height:'110px'}:{backgroundColor:'white',height:'110px'}} class="parent_card">
<div class="div1_card"> <img className={'img1'} src={product.pic1}></img> </div>
<div class="div2_card price_style"> <p className={'price_style'}><span>&#8362;</span> {product.price}  </p> </div>
<div class="div3_card updated_today "> עודכן היום </div>
<div class="div4_card address_tile_style"> {product.property_address_street} {product.property_address_num} </div>
<div class="div5_card address_tile_style"> {correctName(product.property_type)} {product.property_address_city} </div>
<div  class="div6_card data_style"> {product.num_of_rooms} </div>
<div class="div7_card data_style" > {product.property_floor} </div>
<div class="div8_card data_style"> {product.build_mr_total} </div>
<div class="div9_card data_title_style"> חדרים </div>
<div class="div10_card data_title_style"> קומה </div>
<div class="div11_card data_title_style"> מ"ר </div>
</div>
        </div>
        </Link>
       
    );
};

export default CardYad2;
