import React ,{ useState,Fragment } from 'react'
import { Link, withRouter } from "react-router-dom";
import { BsPerson} from 'react-icons/bs';
import {  isAuthenticated } from "../auth";
import '../css/lineNavBar.css' ;
import LineBar_icon from './small-components/LineBar_icon'
import LineBar_icon_single_list from './small-components/LineBar_icon_single_list'
import LineBar_icon_single_list_note from './small-components/LineBar_icon_single_list_note'
import LineBar_icon_single_list_avatar from './small-components/LineBar_icon_single_list_avatar'
import AddProduct_lineBar from './small-components/AddProduct_lineBar'
export default function LineNavBar() {
    let pathname = window.location.pathname; 
    return (
        <div className={'container_line_navBar'}>
            <div class="parent_line_navBar">
                
<div style={{backgroundColor:'white'}} class="div1_line_navBar lineBar_icon__container">
<Link to="/" >
<img style={{maxWidth:'70%',backgroundColor:'white'}} src={'//assets.yad2.co.il/yad2site/y2assets/images/header/yad2Logo.png'} />
</Link>
</div>

{!(pathname==='/create/product')&&
<>
<div class="div2_line_navBar">
<LineBar_icon  name={'נדל"ן'} options={['דירות למכירה','דירות להשכרה','שותפים','מסחרי','חיפוש על גבי מפה','כונס נכסים','מדד הנדל"ן','יד1 דירות חדשות','הערכת שווי נכס','משרדי תיווך בישראל']} />
</div>
<div class="div3_line_navBar">
<LineBar_icon  name={'רכב'} options={['פרטי','מסחרי',`ג'יפים`,'אופנועים','קטנועים','מיוחדים','משאיות','כלי שייט','קטלוג רכבים','מחירון רכב','מכרזים וכינוס','מימון רכב']} />
</div>
<div class="div4_line_navBar">
<LineBar_icon  name={'יד2'} options={['כל המוצרים','מוצרי חשמל',`ריהוט`,'עסקים למכירה','ספורט','סלולרי','לתינוק ולידל','הכל בחינם!','קוסנולות משחק','מחשבים וציוד נלווה','לגינה','אופנה וטיפוח']} />
</div>
<div class="div5_line_navBar">
<LineBar_icon  name={'IL דרושים'} options={['חיפוש עבודה','פרסום משרות',`כתיבת קורות חיים`,'אודות החברות','דרושים הייטק','דרושים סטודנטים','משרות ללא קו"ח','כספים','מכירות','שירות לקוחות','אדמיניסטרציה','מהנדסים','מסעדנות/תיירות','אבטחה','בריאות','בעלי מקצוע','הדרכה/הוראה','שיווק','לתחומים נוספים']} /> 
</div>
<div class="div6_line_navBar">
    <LineBar_icon_single_list  name={'עסקים למכירה'} options={['בתי קפה ומסעדות','זכיינות',`קווי חלוקה`,'הזדמנויות עסקיות','מינימרקטים וסופרמרקטים','קיוסקים ופיצוציות','לכל העסקים']}/>
</div>
<div class="div7_line_navBar">
<LineBar_icon_single_list  name={'חיות מחמד'} options={['כלבים','חתולים',`תוכים ובעלי כנף`,'דגים','מכרסמים','זוחלים','סוסים','תרנגולים','חיות משק',`חמוסים`]}/>
</div>
<div class="div8_line_navBar">
<LineBar_icon_single_list  name={'בעלי מקצוע'} options={['מכוני בדיקה ורישוי לרכב','רחיצת רכב',`שמאי מקרקעין`,'חומרי בניין','אינסטלטור','חשמלאים','שיפוצים','הובלות','רהיטים',`חברות ניקיון ואחזקה`,'לכל בעלי המקצוע']}/>
</div>
<div class="div9_line_navBar">
<LineBar_icon_single_list  name={'...עוד'} options={['תיירות ונופש','לימודים',`מגזין יד2`]}/>
</div>
<div class="div10_line_navBar lineBar_icon__container_smaller">
    <div className={'lineBar_icon__container'}>
<LineBar_icon_single_list_note head={'התראות שלי'} name={'b'} note={'הרשימה שלך ריקה כרגע, כאן תוכל לראות את ההתראות שהגדרת'}/>
    </div>
    <div className={'lineBar_icon__container'}>
<LineBar_icon_single_list_note head={'מודעות שאהבתי'} name={'a'} note={'הרשימה שלך עדיין ריקה אפשר להוסיף מודעות לרשימה בלחיצה על הסימן בפינה הימנית של כל מודעה'}/>
    </div>
</div>
<div class="div11_line_navBar lineBar_icon__container_smaller">
<LineBar_icon_single_list_avatar head={'מודעות שאהבתי'} name={'a'} note={'הרשימה שלך עדיין ריקה אפשר להוסיף מודעות לרשימה בלחיצה על הסימן בפינה הימנית של כל מודעה'}/> 
</div>
<div class="div12_line_navBar lineBar_icon__container_smaller" >
<AddProduct_lineBar/>    
</div>
</>
}

{(pathname==='/create/product')&&
<>
<div class="div2_line_navBar postProduct_line_nav">
פרסום מודעה חדשה
</div>
<div class="div11_line_navBar lineBar_icon__container_smaller self_info_title">
<span style={{marginRight:'10px'}} ><BsPerson size={'20px'} /></span>  {isAuthenticated().user.name}
</div>
<div class="div12_line_navBar lineBar_icon__container_smaller " >
צור קשר   
</div>
</>
}
</div>
        </div>
    )
}
