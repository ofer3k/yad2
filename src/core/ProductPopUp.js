import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import { GoLocation } from 'react-icons/go';
import { IoLogoWhatsapp } from 'react-icons/io';
import { TiLocationArrowOutline } from 'react-icons/ti';
import { SocialIcon } from 'react-social-icons';
import checkYes from '../imgs/check_yes.png';
import checkNo from '../imgs/check_no.png';
// const { Modal, Button } = antd;
import { Modal, Button } from 'antd';




import './../productPopup.css'
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
const ProductPopup = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
console.log(product)
const [isModalVisible, setIsModalVisible] = useState(false);
const showModal = () => {
    setIsModalVisible(true);
};
const handleOk = () => {
    setIsModalVisible(false);
};
const handleCancel = () => {
    setIsModalVisible(false);
};

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={
                product &&
                product.description &&
                product.description.substring(0, 100)
            }
        >

            {/*         <div  dir='ltr' className="card">
<div style={{height:'110px'}} class="parent_card">
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
<div class="div11_card data_title_style"> מ"ר </div> */}
<div className={'popup_container'}>
       <div class="flex-container_popUp">
   <div class="flex-items_popUp">עודכן היום</div>
   <div class="flex-items_popUp">דירה למכירה ב{product.property_address_city}</div>
       </div>
       <div className={'image_container'}>
           <img style={{height:'344px'}} src={product.pic1} ></img>
       </div>
       <hr/>
       <p className={'price_style_popUp'}><span>&#8362;</span> {product.price}</p>
       <p className={'street_style_popUp'}>{product.property_address_street} {product.property_address_num}</p>
       <p className={'city_style_popUp'}>{correctNameProperty(product.property_type)} {product.property_address_city}</p>
<div className={'popUp_info_container'}>
<div class="parent_popUp_info">
<div class="div1_popUp_info data_style_popUp">{product.num_of_rooms} </div>
<div class="div2_popUp_info data_style_popUp">{product.property_floor} </div>
<div class="div3_popUp_info data_style_popUp">{product.build_mr_total} </div>
<div class="div4_popUp_info data_title_style_popUp"> חדרים</div>
<div class="div5_popUp_info data_title_style_popUp"> קומה</div>
<div class="div6_popUp_info data_title_style_popUp"> מ"ר</div>
</div>
</div>
<div>
    <p className={'popUp_description_title'}>על הנכס</p>
    <p className={'popUp_description'}>{product.description}</p>
</div>
<div class="parent_map_buttons">
<div class="div1_map_buttons"> 
מפה <GoLocation/>
</div>
<div class="div2_map_buttons">
ניווט <TiLocationArrowOutline/>
</div>
</div>
<div class="parent_table_popup_info">
<div class="div1_table_popup_info table_popup_info_title"> מצב הנכס</div>
<div className={"div2_table_popup_info table_popup_info"}>{correctNamePropertyCondition(product.property_condition)} </div>
<div class="div3_table_popup_info table_popup_info_title"> תאריך כניסה</div>
<div class="div4_table_popup_info table_popup_info"> {correctDate(product.entry_date)}</div>
<div class="div5_table_popup_info table_popup_info_title"> קומות בבנין</div>
<div class="div6_table_popup_info table_popup_info"> {product.property_total_floors}</div>
<div class="div7_table_popup_info table_popup_info_title"> מרפסות</div>
<div class="div8_table_popup_info table_popup_info"> {product.num_of_balcony}</div>
<div class="div9_table_popup_info table_popup_info_title"> חניות</div>
<div class="div10_table_popup_info table_popup_info"> {product.num_of_parking}</div>
</div>

<div class="parent_social_media">
<div class="div1_social_media whatsapp"> <SocialIcon  url="https://whatsapp.com/jayantbhawal" /> </div>
<div class="div2_social_media"> <SocialIcon url="https://facebook.com/jayantbhawal" /></div>
<div  class="div3_social_media mail"> <SocialIcon bgColor={'#d74a58'} url="https://email.com/jayantbhawal" /></div>
<div class="div4_social_media"> <SocialIcon bgColor={'#363636'} url="https://sharethis.com/jayantbhawal" /></div>
<div class="div5_social_media copy_link"> <a>
<span className={'copy_link_text'}>העתקת קישור</span>
<img src={'//assets.yad2.co.il/yad2site/y2assets/images/pages/ad/share_icons/copy_link_no_bg.svg'} />
</a> 
</div>
</div>

<div class="parent_radios_section">
<div style={{marginBottom:'10px'}} class="div1_radios_section popUp_description_title">?מה יש בנכס</div>
{/* air_condition */}
<div class="div2_radios_section">{product.air_condition===true?
<p>
<span className={'checkYes_title'} >מיזוג</span>    
<img src={checkYes}/>
</p>:
<p>
<span className={'checkNo_title'} >מיזוג</span>    
<img src={checkNo}/>
</p>} </div>
<div class="div3_radios_section">
{/* bars */}
{product.bars===true?
<p>
<span className={'checkYes_title'} >סורגים</span>    
<img src={checkYes}/>
</p>:
<p>
<span className={'checkNo_title'} >סורגים</span>    
<img src={checkNo}/>
</p>} 
</div>
<div class="div4_radios_section">
     {/* elevator */}
{product.elevator===true?
<p>
<span className={'checkYes_title'} >מעלית</span>    
<img src={checkYes}/>
</p>:
<p>
<span className={'checkNo_title'} >מעלית</span>    
<img src={checkNo}/>
</p>} 
     </div>
<div class="div5_radios_section">
    
        {/* kosher */}
{product.kosher===true?
<p>
<span className={'checkYes_title'} >מטבח כשר</span>    
<img src={checkYes}/>
</p>:
<p>
<span className={'checkNo_title'} >מטבח כשר</span>    
<img src={checkNo}/>
</p>}  </div>
<div class="div6_radios_section">
       {/* handicapped*/}
{product.handicapped===true?
<p>
<span className={'checkYes_title'} >גישה לנכים</span>    
<img src={checkYes}/>
</p>:
<p>
<span className={'checkNo_title'} >גישה לנכים</span>    
<img src={checkNo}/>
</p>} </div>
<div class="div7_radios_section">
    {/* renovated*/}
{product.renovated===true?
<p>
<span className={'checkYes_title'} >משופצת</span>    
<img src={checkYes}/>
</p>:
<p>
<span className={'checkNo_title'} >משופצת</span>    
<img src={checkNo}/>
</p>} </div>
<div class="div8_radios_section">
    
      {/* renovated*/}
{product.shelter===true?
<p>
<span className={'checkYes_title'} >ממ"ד</span>    
<img src={checkYes}/>
</p>:
<p>
<span className={'checkNo_title'} >ממ"ד</span>    
<img src={checkNo}/>
</p>} </div>
<div class="div9_radios_section">
    {/* garage*/}
{product.garage===true?
<p>
<span className={'checkYes_title'} >מחסן</span>    
<img src={checkYes}/>
</p>:
<p>
<span className={'checkNo_title'} >מחסן</span>    
<img src={checkNo}/>
</p>}  </div>
<div class="div10_radios_section">
    
      {/* pandor*/}
{product.pandor===true?
<p>
<span className={'checkYes_title'} >דלתות פנדור</span>    
<img src={checkYes}/>
</p>:
<p>
<span className={'checkNo_title'} >דלתות פנדור</span>    
<img src={checkNo}/>
</p>}  </div>
<div class="div11_radios_section">
    {/* pandor*/}
{product.tadiran===true?
<p>
<span className={'checkYes_title'} >מזגן תדיראן</span>    
<img src={checkYes}/>
</p>:
<p>
<span className={'checkNo_title'} >מזגן תדיראן</span>    
<img src={checkNo}/>
</p>}  </div>
</div>
<div onClick={showModal} className={'popUp_footer'}> <span className={'popUp_footer_text'} >הצגת מספר טלפון</span> </div>
</div>

{/*  */}
<div className={'modal_container'}>

    {/* <button type="primary"  >open Modal</button> */}
    <Modal width={'65vw'} visible={isModalVisible} className={'modalPopUp'} bodyStyle={{textAlign:'center'}} footer={null}  cancelButtonProps={{ghost:'true'}} okButtonProps={{style:{opacity:'0'}}} closeIcon={' '} onOk={handleOk} onCancel={handleCancel}>
<p className={'modal_popup_name'}>{product.contact_name}</p>
<div className={'modal_popup_number'}>
<span className={'modal_popup_number_inner'}>{product.contact_number_start}-{product.contact_number}</span>
</div>
<p className={'modal_popup_email_inner'}>שליחת דוא"ל למפרסם</p>

    </Modal>
</div>

{/*  */}
                    </Layout>
    );
};

export default ProductPopup;
