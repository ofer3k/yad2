import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ShowImage from "./ShowImage";
import './../cardYad2Acordion.css'
import { FaRegSnowflake,FaWheelchair } from 'react-icons/fa';
import { FiBox } from 'react-icons/fi';
import { BiBox,BiCabinet } from 'react-icons/bi';
import { RiDoorClosedLine } from 'react-icons/ri';
import { GiElevator,GiTap,GiSolarPower } from 'react-icons/gi';
import { BsHouseDoor } from 'react-icons/bs';
import { RiPaintBrushLine } from 'react-icons/ri';
import { AiOutlineTable } from 'react-icons/ai';
import airconditioner from './../imgs/air-conditioner.ico'
import Popup_IconTitle from "./small-components/Popup_IconTitle";

import { addItem, updateItem, removeItem } from "./cartHelpers";
import { Accordion,Card,Button,Form,ButtonGroup ,ToggleButton,Pagination } from 'react-bootstrap';
import PicsCarousel from "./small-components/PicsCarousel";
// state: {
//     fromNotifications: true,
//   }
const correctNameProperty=(name)=>{
    
    switch (name) {
        case 'Apartment':
            return('דירה')
            break;
        case 'Garden Apartment':
            return('דירת גן')
            break;
    
        default:
            break;
    }
}
const correctNamePropertyCondition=(name)=>{
    switch (name) {
        case "In saved mode":
            return('במצב שמור, (במצב טוב, לא שופץ)')
            break;
    
        default:
            break;
    }
}

const correctDate=(date)=>{
    let today = new Date().toLocaleDateString()
let entryDate =new Date(date).toLocaleDateString()

// console.log(typeof date,'date')
switch (entryDate) {
    case today:
        return('כניסה מיידית')
        break;

    default:
        return(entryDate)
        break;
}
}
const CardYad2Acordion = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false
}) => {
    const [showInfo,setShowInfo]= useState(false);
    const [redirect, setRedirect] = useState(false);
    const [showPics, setShowPics] = useState(false);
  let history = useHistory();
    
    return (
<div style={{color:'black'}}  >
        <div  dir='ltr' style={{border:'none'}} className="card">
{/* <div style={{height:'110px'}} class="parent_card">
<div class="div1_card"> <img className={'img1'} src={product.pic1}></img> </div>
<div class="div2_card price_style"> <p className={'price_style'}><span>&#8362;</span> {product.price}  </p> </div>
<div class="div3_card updated_today "> עודכן שלשום </div>
<div class="div4_card address_tile_style"> {product.property_address_street} {product.property_address_num} </div>
<div class="div5_card address_tile_style"> {correctName(product.property_type)} {product.property_address_city} </div>
<div  class="div6_card data_style"> {product.num_of_rooms} </div>
<div class="div7_card data_style" > {product.property_floor} </div>
<div class="div8_card data_style"> {product.build_mr_total} </div>
<div class="div9_card data_title_style"> חדרים </div>
<div class="div10_card data_title_style"> קומה </div>
<div class="div11_card data_title_style"> מ"ר </div>
</div> */}
<div  id={'card_acordion'} className="parent_acordion" style={product.Route==='vip'?{backgroundColor:'#fdf9c5'}:{backgroundColor:'white'}}>
<div 
// onClick={()=>{
//   setShowPics(true)
// }}
 class="div1_acordion">
         <Link  to={`/carousel/${product._id}`} >
         <img className={'img1'} style={{maxWidth:'110px'}} src={product.pic1}></img>
</Link>

</div>
<div onClick={()=>{
    setShowInfo(!showInfo)
}} class="div2_acordion border_left" style={{textAlign:'right'}}>{product.property_address_street} {product.property_address_num} </div>
<div onClick={()=>{
    setShowInfo(!showInfo)
}} class="div3_acordion border_left" style={{textAlign:'right'}}>{correctNameProperty(product.property_type)} {product.property_address_city}</div>
<div onClick={()=>{
    setShowInfo(!showInfo)
}} class="div4_acordion border_left data_acordion ">{product.num_of_rooms}  </div>
<div onClick={()=>{
    setShowInfo(!showInfo)
}} class="div5_acordion border_left data_acordion">{product.property_floor}</div>
<div onClick={()=>{
    setShowInfo(!showInfo)
}} class="div6_acordion border_left data_acordion ">{product.build_mr_total}</div>
<div class="div7_acordion border_left data_acordion_title">חדרים</div>
<div class="div8_acordion border_left data_acordion_title">קומה</div>
<div class="div9_acordion border_left data_acordion_title">מ"ר</div>
<div class="div10_acordion"><p style={{textAlign:'left'}} className={'price_style'}><span>&#8362;</span> {product.price}  </p></div>
<div class="div11_acordion updated_today" style={{textAlign:'left'}}>עודכן היום </div>

</div>
{showInfo&&
<div className={'show_info'}>
    <p className={'show_info_first_title'}>תיאור הנכס</p>
    <p className={'show_info_description'}>{product.description}</p>
    {/*  */}
    <div class="parent_show_info">
<div class="div1_show_info"><span className={'show_info_data'}>{correctNamePropertyCondition(product.property_condition)}</span><span className={'show_info_title'}>מצב הנכס</span> </div>
<div class="div2_show_info"><span className={'show_info_data'}>{product.property_total_floors}</span><span className={'show_info_title'}>קומות בבנין</span> </div>
<div class="div3_show_info"><span className={'show_info_data'}>{product.num_of_parking}</span><span className={'show_info_title'}>חניות</span></div>
<div class="div4_show_info"><span className={'show_info_data'}>{correctDate(product.entry_date)}</span><span className={'show_info_title'}>תאריך כניסה</span></div>
<div class="div5_show_info"> <span className={'show_info_data'}>{product.num_of_balcony}</span><span className={'show_info_title'}>מרפסות</span></div>
<div class="div6_show_info"> </div>
</div>
<p style={{marginTop:'20px'}} className={'show_info_first_title'}>?מה יש בנכס</p>
<div class="parent_show_info_radio">
<div class="div1_show_info_radio"><span className={product.air_condition==true?'show_info_icon':'show_info_icon_disable'}><FaRegSnowflake/></span></div>
<div class="div2_show_info_radio"><span className={product.air_condition==true?'show_info_radio_name':'show_info_radio_name_disable'}>מיזוג</span></div>
<div class="div3_show_info_radio"><span className={product.bars==true?'show_info_icon':'show_info_icon_disable'}><AiOutlineTable/></span></div>
<div class="div4_show_info_radio"><span className={product.bars==true?'show_info_radio_name':'show_info_radio_name_disable'}>סורגים</span></div>
<div class="div5_show_info_radio"><span className={product.elevator==true?'show_info_icon':'show_info_icon_disable'}><GiElevator/></span></div>
<div class="div6_show_info_radio"><span className={product.elevator==true?'show_info_radio_name':'show_info_radio_name_disable'}>מעלית</span></div>
<div class="div7_show_info_radio"><span className={product.kosher==true?'show_info_icon':'show_info_icon_disable'}><GiTap/></span></div>
<div class="div8_show_info_radio"><span className={product.kosher==true?'show_info_radio_name':'show_info_radio_name_disable'}>מטבח כשר</span></div>
<div class="div9_show_info_radio"><span className={product.handicapped==true?'show_info_icon':'show_info_icon_disable'}><FaWheelchair/></span></div>
<div class="div10_show_info_radio"><span className={product.handicapped==true?'show_info_radio_name':'show_info_radio_name_disable'}>גישה לנכים</span></div>
<div class="div11_show_info_radio"><span className={product.renovated==true?'show_info_icon':'show_info_icon_disable'}><RiPaintBrushLine/></span></div>
<div class="div12_show_info_radio"><span className={product.renovated==true?'show_info_radio_name':'show_info_radio_name_disable'}>משופצת</span></div>
<div class="div13_show_info_radio"><span className={product.shelter==true?'show_info_icon':'show_info_icon_disable'}><FiBox/></span></div>
<div class="div14_show_info_radio"><span className={product.shelter==true?'show_info_radio_name':'show_info_radio_name_disable'}>ממ"ד</span></div>
<div class="div15_show_info_radio"><span className={product.garage==true?'show_info_icon':'show_info_icon_disable'}><BiBox/></span></div>
<div class="div16_show_info_radio"><span className={product.garage==true?'show_info_radio_name':'show_info_radio_name_disable'}>מחסן</span></div>
<div class="div17_show_info_radio"><span className={product.pandor==true?'show_info_icon':'show_info_icon_disable'}><RiDoorClosedLine/></span></div>
<div class="div18_show_info_radio"><span className={product.pandor==true?'show_info_radio_name':'show_info_radio_name_disable'}>דלתות פנדור</span></div>
<div class="div19_show_info_radio"><span className={product.tadiran==true?'show_info_icon':'show_info_icon_disable'}><img style={{width:'16px',height:'16px'}} src={airconditioner}></img></span></div>
<div class="div20_show_info_radio"><span className={product.tadiran==true?'show_info_radio_name':'show_info_radio_name_disable'}>מזגן תדיראן</span></div>
<div class="div21_show_info_radio"><span className={product.furniture==true?'show_info_icon':'show_info_icon_disable'}><BiCabinet/></span></div>
<div class="div22_show_info_radio"><span className={product.furniture==true?'show_info_radio_name':'show_info_radio_name_disable'}>ריהוט</span></div>
<div class="div23_show_info_radio"> </div>
<div class="div24_show_info_radio"> </div>
</div>

    
    </div>}
 
        </div>
        {/* <span style={{position:'absolute'}} onClick={()=>{setShowPics(false)}}>asd</span>
        {showPics&&
<div className={'carousel_back'}  >

<PicsCarousel animation="cubeAnimation" product={product} />
</div>
}   */}
        </div>
       
    );
};

export default CardYad2Acordion;
