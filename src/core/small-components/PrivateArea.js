import React from 'react'
import { isAuthenticated } from "./../../auth";
import { Link } from "react-router-dom";
import './small_css/privateNav.css'
import { BiLeftArrowAlt } from 'react-icons/bi';


export default function PrivateArea() {
    return (
        <div className={'container_private_nav'}>
            <Link to='/shop' >
            <span  className={'arrow_left_personal'}><BiLeftArrowAlt/></span> 
            </Link>
             <img src={'//images.yad2.co.il/Pic/yad2mobile/main/new_logo.png'} className={'yad2_logo_personal'}></img>
            </div>
    )
}
