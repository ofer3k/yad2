import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Popup_IconTitle from "./small-components/Popup_IconTitle";
import { GoLocation } from 'react-icons/go';
import { TiLocationArrowOutline } from 'react-icons/ti';
import { SocialIcon } from 'react-social-icons';
import { Modal } from 'antd';
import './../css/productPopup.css'
import {correctNamePropertyCondition,correctDate,correctNameProperty} from './../controller/popupController'

const ProductPopup = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    
    const [error, setError] = useState(false);
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
        loadSingleProduct(props.match.params.productId);
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
<div class="div2_radios_section">{product.air_condition===true?
<Popup_IconTitle class1='checkYes_title' isTrue='true' title1='מיזוג' />
: 
<Popup_IconTitle class1='checkNo_title' isTrue='false' title1='מיזוג' />
} 
</div>
<div class="div3_radios_section">
{product.bars===true?
<Popup_IconTitle class1='checkYes_title' isTrue='true' title1='סורגים' />
:
<Popup_IconTitle class1='checkNo_title' isTrue='false' title1='סורגים' />
} 
</div>
<div class="div4_radios_section">
{product.elevator===true?
<Popup_IconTitle class1='checkYes_title' isTrue='true' title1='מעלית' />
:
<Popup_IconTitle class1='checkNo_title' isTrue='false' title1='מעלית' />
} 
     </div>
<div class="div5_radios_section">
    
        {/* kosher */}
{product.kosher===true?
<Popup_IconTitle class1='checkYes_title' isTrue='true' title1='מטבח כשר' />
:
<Popup_IconTitle class1='checkNo_title' isTrue='false' title1='מטבח כשר' />
}  
</div>
<div class="div6_radios_section">
       {/* handicapped*/}
{product.handicapped===true?
    <Popup_IconTitle class1='checkYes_title' isTrue='true' title1='גישה לנכים' />
:
<Popup_IconTitle class1='checkNo_title' isTrue='false' title1='גישה לנכים' />
} </div>
<div class="div7_radios_section">
    {/* renovated*/}
{product.renovated===true?
    <Popup_IconTitle class1='checkYes_title' isTrue='true' title1='משופצת' />
   :
   <Popup_IconTitle class1='checkNo_title' isTrue='false' title1='משופצת' />
} </div>
<div class="div8_radios_section">
    
      {/* renovated*/}
{product.shelter===true?
    <Popup_IconTitle class1='checkYes_title' isTrue='true' title1='ממ"ד' />
   :
   <Popup_IconTitle class1='checkNo' isTrue='false' title1='ממ"ד' />
} </div>
<div class="div9_radios_section">
    {/* garage*/}
{product.garage===true?
    <Popup_IconTitle title1='מחסן' class1='checkYes_title' isTrue='true'  />
    :
    <Popup_IconTitle title1='מחסן' class1='checkNo_title' isTrue='false'  />
}  </div>
<div class="div10_radios_section">
    
      {/* pandor*/}
{product.pandor===true?
    <Popup_IconTitle title1='דלתות פנדור' class1='checkYes_title' isTrue='true'  />
    :
    <Popup_IconTitle title1='דלתות פנדור' class1='checkNo_title' isTrue='false'  />
}  </div>
<div class="div11_radios_section">
    {/* pandor*/}
{product.tadiran===true?
    <Popup_IconTitle title1='מזגן תדיראן' class1='checkYes_title' isTrue='true'  />
    :
    <Popup_IconTitle title1='מזגן תדיראן' class1='checkNo_title' isTrue='fale'  />
}  </div>
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
                    </Layout>
    );
};

export default ProductPopup;
