import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories,uploadImage } from "./apiAdmin";
import { FaRegSnowflake,FaWheelchair } from 'react-icons/fa';
import { FiBox } from 'react-icons/fi';
import { BiBox,BiCabinet } from 'react-icons/bi';
import { RiDoorClosedLine } from 'react-icons/ri';
import { GiElevator,GiTap,GiSolarPower } from 'react-icons/gi';
import { BsHouseDoor } from 'react-icons/bs';
import { RiPaintBrushLine } from 'react-icons/ri';
import { AiOutlineTable } from 'react-icons/ai';
import { API } from "../config";


import '../addProduct.css'

import { Accordion,Card,Button,Form,ButtonGroup ,ToggleButton,Pagination } from 'react-bootstrap';
let picsList={
  pic1:'',
  pic2:'',
  pic3:'',
  pic4:'',
  pic5:'',
  pic6:'',
}


const AddProduct = () => {

  const [fileInput,setFileInput]=useState('')
  const [videoInput,setVideoInput]=useState('')
  const [pic1,setPic1]=useState('')
  const [pic2,setPic2]=useState('')
  const [pic3,setPic3]=useState('')
  const [pic4,setPic4]=useState('')
  const [photosList,setPhotosList]=useState('')
let myArray=[]
const [selectedFile,setSelectedFile]=useState('')
const [previewSource,setPreviewSource]=useState('')
const [previewVideo,setPreviewVideo]=useState('')
const [previewPic1,setPreviewPic1]=useState('')
const [previewPic2,setPreviewPic2]=useState('')
const [previewPic3,setPreviewPic3]=useState('')
const [previewPic4,setPreviewPic4]=useState('')
const [imagesUrlList,setImagesUrlList]=useState([])



const uploadImageToCloud=async (base64,video,pic1,pic2,pic3,pic4)=>{
 
  try {
    await fetch(`${API}/upload`,{
      // method:'POST',
      body:JSON.stringify({date:video,name:isAuthenticated().user.name}),
      method: 'POST',
  headers: { 'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',}
    }).then(response =>{
      var p = Promise.resolve(response.json());
p.then(async function(v) {
  console.log(v.url)
  setImagesUrlList([...imagesUrlList, v.url]);
  // setImagesUrlList(v.url)
  picsList.pic1=v.url
  console.log('myPics',picsList)
});
    } )
    await fetch(`${API}/upload`,{
      // method:'POST',
      body:JSON.stringify({date:base64,name:isAuthenticated().user.name}),
      method: 'POST',
  headers: { 'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',}
    }).then(response =>{
      var p = Promise.resolve(response.json());
p.then(async function(v) {
  // setImagesUrlList(v.url)
  setImagesUrlList([...imagesUrlList, v.url]);
  picsList.pic2=v.url
  console.log('myPics',picsList)});
    } )

    if(pic1){
      await fetch(`${API}/upload`,{
        // method:'POST',
        body:JSON.stringify({date:pic1,name:isAuthenticated().user.name}),
        method: 'POST',
    headers: { 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',}
      }).then(response =>{
        var p = Promise.resolve(response.json());
  p.then(async function(v) {
    setImagesUrlList(imagesUrlList => [...imagesUrlList, v.url])
    picsList.pic3=v.url
    console.log('myPics',picsList)
    });
      } )
    }
    if(pic2){await fetch(`${API}/upload`,{
      // method:'POST',
      body:JSON.stringify({date:pic2,name:isAuthenticated().user.name}),
      method: 'POST',
  headers: { 'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',}
    }).then(response =>{
      var p = Promise.resolve(response.json());
p.then(async function(v) {
  setImagesUrlList(imagesUrlList => [...imagesUrlList, v.url])
  picsList.pic4=v.url
  console.log('myPics',picsList)
  });
    } )
  }
    if(pic3){await fetch(`${API}/upload`,{
      // method:'POST',
      body:JSON.stringify({date:pic3,name:isAuthenticated().user.name}),
      method: 'POST',
  headers: { 'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',}
    }).then(response =>{
      var p = Promise.resolve(response.json());
p.then(async function(v) {
  setImagesUrlList(imagesUrlList => [...imagesUrlList, v.url])
  picsList.pic5=v.url
  console.log('myPics',picsList)
  });
    } )
  }
    if(pic4){
      await fetch(`${API}/upload`,{
        // method:'POST',
        body:JSON.stringify({date:pic4,name:isAuthenticated().user.name}),
        method: 'POST',
    headers: { 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',}
      }).then(response =>{
        var p = Promise.resolve(response.json());
  p.then(async function(v) {
    setImagesUrlList(imagesUrlList => [...imagesUrlList, v.url])
    picsList.pic6=v.url
    console.log('myPics',picsList)
    });
      } )}
    
  } catch (error) {
    console.log(error)
  }
}

const handleFileInputChange=(e)=>{
const file=e.target.files[0]
previewFile(file,e.target.name)

console.log(file)
}
const handleSubmitFile=(e)=>{
e.preventDefault()
// console.log(e.target)
if(!previewSource)return
if(!previewVideo){
  setPreviewVideo(null)
}
if(!previewPic1
  ){
  setPreviewPic1(null)
}
if(!previewPic2
  ){
  setPreviewPic2(null)
}
if(!previewPic3
  ){
  setPreviewPic3(null)
}
if(!previewPic4
  ){
  setPreviewPic4(null)
}
uploadImageToCloud(previewSource,previewVideo,previewPic1,previewPic2,previewPic3,previewPic4)
}
const previewFile=(file,name)=>{
  console.log(name)
const reader=new FileReader()
reader.readAsDataURL(file)
reader.onloadend=()=>{
  switch (name) {
    case 'main_image':
      setPreviewSource(reader.result)
      console.log('asss')
      break;
      case 'main_video':
        setPreviewVideo(reader.result)
      console.log('sadasd gfawsfd')
      break;
      case 'pic1':
        setPreviewPic1(reader.result)
      console.log('sadasd gfawsfd')
      break;
      case 'pic2':
        setPreviewPic2(reader.result)
      console.log('sadasd gfawsfd')
      break;
      case 'pic3':
        setPreviewPic3(reader.result)
      console.log('sadasd gfawsfd')
      break;
      case 'pic4':
        setPreviewPic4(reader.result)
      console.log('sadasd gfawsfd')
      break;
      
    
  }
  
}
}

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: null,
        categories: [],
        category: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: "",
        property_type:"",
        property_condition:"",
        property_address_city:"",
        property_address_street:"",
        property_address_num:null,
        property_floor:null,
        property_total_floors:null,
        num_of_rooms:null,
        is_on_pillars:null,
        num_of_parking:null,
        num_of_balcony:null,
        build_mr:null,
        build_mr_total:null,
        contact_name:'',
        contact_number_start:'',
        contact_number:'',
        mail:'',
        Route:null
    });
    const [radios, setRadios] = useState({
      air_condition:false,
      shelter:false,
      garage:false,
      pandor:false,
      furniture:false,
      handicapped:false,
      elevator:false,
      tadiran:false,
      unit:false,
      renovated:false,
      kosher:false,
      boiler:false,
      bars:false
  });


  const {air_condition,shelter,garage,pandor,furniture,handicapped,elevator,tadiran,unit,renovated,kosher,boiler,bars}= radios

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData,
        property_type,
        property_condition,
        property_address_city,
        property_address_street,
        property_address_num,
        property_floor,
        property_total_floors,
        num_of_rooms,
        is_on_pillars,
        num_of_parking,
        num_of_balcony,
        build_mr,
        build_mr_total,
        contact_name,
        contact_number_start,
        contact_number,
        mail,
        Route
    } = values;
    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            // if (data.error) {
            //     setValues({ ...values, error: data.error });
            // } else {
            //     setValues({
            //         ...values,
            //         categories: data,
            //         formData: new FormData()
            //     });
            // }
        });
    };
  

    useEffect(() => {
        init();
    }, []);
    

    const handleChange = name => event => {
  console.log(imagesUrlList)
        let value =
            name === "photo" ? event.target.files[0] : event.target.value;
        if(name==='property_address_city'||name==='property_address_street')
        {
            // let index=event.target.value.indexOf(',')
            // console.log(index)
            value=event.target.value.split(',')[0]
        }
        if (name ==='is_on_pillars'){
          value=event.target.checked
        }
        if (name ==='num_of_parking'||name==='num_of_balcony'){
          if(event.target.innerHTML==='ללא')
          value=0
          else
          value=parseFloat(event.target.innerHTML) 
        }
        setValues({ ...values, [name]: value });
        console.log(values)
        // formData.set(name, value);

    };
    const [maxLetters,setMaxLetters]=useState(0)
    // 
    const handleChange2 = () => event => {
      let x=event.target.value.length
      setMaxLetters(x)
  };

  const date = () => event => {
    if(event.target.checked===true)
    {
      var now = new Date();
      var month = (now.getMonth() + 1);               
      var day = now.getDate();
      if (month < 10) 
          month = "0" + month;
      if (day < 10) 
          day = "0" + day;
      var today = now.getFullYear() + '-' + month + '-' + day;
      
      document.getElementById('entry_date').value=today 
      setValues({ ...values, entry_date: today }); 
      console.log(values)
      document.getElementById('entry_date').disabled = true;
    }
    else{
      document.getElementById('entry_date').disabled = false;

    }
};

    const handleRadio = name => event => {
      event.preventDefault()
      let value;
      switch (name) {
        case 'air_condition':
          value=!radios.air_condition
          if(value)
          {
            document.getElementById('air_condition').classList.remove('remove_background')
            document.getElementById('air_condition').classList.add('active')
          }
          else{
            document.getElementById('air_condition').classList.remove('active')
            document.getElementById('air_condition').classList.add('remove_background')
          }
          break;
        case 'shelter':
          value=!radios.shelter
          if(value)
          {
            document.getElementById('shelter').classList.remove('remove_background')
            document.getElementById('shelter').classList.add('active')
          }
          else{
            document.getElementById('shelter').classList.remove('active')
            document.getElementById('shelter').classList.add('remove_background')
          }
          break;
        case 'garage':
          value=!radios.garage
          if(value)
          {
            document.getElementById('garage').classList.remove('remove_background')
            document.getElementById('garage').classList.add('active')
          }
          else{
            document.getElementById('garage').classList.remove('active')
            document.getElementById('garage').classList.add('remove_background')
          }
          break;
        case 'pandor':
          value=!radios.pandor
          if(value)
          {
            document.getElementById('pandor').classList.remove('remove_background')
            document.getElementById('pandor').classList.add('active')
          }
          else{
            document.getElementById('pandor').classList.remove('active')
            document.getElementById('pandor').classList.add('remove_background')
          }
          break;
        case 'furniture':
          value=!radios.furniture
          if(value)
          {
            document.getElementById('furniture').classList.remove('remove_background')
            document.getElementById('furniture').classList.add('active')
          }
          else{
            document.getElementById('furniture').classList.remove('active')
            document.getElementById('furniture').classList.add('remove_background')
          }
          break;
        case 'handicapped':
          value=!radios.handicapped
          if(value)
          {
            document.getElementById('handicapped').classList.remove('remove_background')
            document.getElementById('handicapped').classList.add('active')
          }
          else{
            document.getElementById('handicapped').classList.remove('active')
            document.getElementById('handicapped').classList.add('remove_background')
          }
          break;
        case 'elevator':
          value=!radios.elevator
          if(value)
          {
            document.getElementById('elevator').classList.remove('remove_background')
            document.getElementById('elevator').classList.add('active')
          }
          else{
            document.getElementById('elevator').classList.remove('active')
            document.getElementById('elevator').classList.add('remove_background')
          }
          break;
        case 'tadiran':
          value=!radios.tadiran
          if(value)
          {
            document.getElementById('tadiran').classList.remove('remove_background')
            document.getElementById('tadiran').classList.add('active')
          }
          else{
            document.getElementById('tadiran').classList.remove('active')
            document.getElementById('tadiran').classList.add('remove_background')
          }
          break;
        case 'unit':
            value=!radios.unit
            if(value)
            {
              document.getElementById('unit').classList.remove('remove_background')
              document.getElementById('unit').classList.add('active')
            }
            else{
              document.getElementById('unit').classList.remove('active')
              document.getElementById('unit').classList.add('remove_background')
            }
            break; 
        case 'renovated':
              value=!radios.renovated
              if(value)
              {
                document.getElementById('renovated').classList.remove('remove_background')
                document.getElementById('renovated').classList.add('active')
              }
              else{
                document.getElementById('renovated').classList.remove('active')
                document.getElementById('renovated').classList.add('remove_background')
              }
              break; 
        case 'kosher':
            value=!radios.kosher
            if(value)
            {
              document.getElementById('kosher').classList.remove('remove_background')
              document.getElementById('kosher').classList.add('active')
            }
            else{
              document.getElementById('kosher').classList.remove('active')
              document.getElementById('kosher').classList.add('remove_background')
            }
            break;
        case 'boiler':
            value=!radios.boiler
            if(value)
            {
              document.getElementById('boiler').classList.remove('remove_background')
              document.getElementById('boiler').classList.add('active')
            }
            else{
              document.getElementById('boiler').classList.remove('active')
              document.getElementById('boiler').classList.add('remove_background')
            }
            break;
        case 'bars':
            value=!radios.bars
            if(value)
            {
              document.getElementById('bars').classList.remove('remove_background')
              document.getElementById('bars').classList.add('active')
            }
            else{
              document.getElementById('bars').classList.remove('active')
              document.getElementById('bars').classList.add('remove_background')
            }
            break; 
            
      }
      setRadios({ ...radios, [name]: value });
      console.log(radios)
  };
  let maxLength = 100;

  async function postImage({image}) {
    const formData=new FormData();
    formData.append('image',image)
    const result= uploadImage(formData)
  }
  const [image1,setImage1]=useState()
  const [file1,setFile1]=useState()
  const submit1=async event=>{
    event.preventDefault()
    let description123='123123'
    const result=await uploadImage({image:file1,description123})
    setImage1=([result.image,...image1])
  }
  const fileSelected=event=>{
    const file=event.target.files[0]
    setFile1(file)
  }


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        console.log(picsList)
        let obj={fullForm:values,redioButtons:radios,pics:picsList}
        createProduct(user._id, token, obj).then()
          
        //   data => {
        //     if (data.error) {
        //         setValues({ ...values, error: data.error });
        //     } else {
        //         // setValues({
        //         //     ...values,
        //         //     name: "",
        //         //     description: "",
        //         //     photo: "",
        //         //     price: "",
        //         //     quantity: "",
        //         //     loading: false,
        //         //     createdProduct: data.name
        //         // });
        //     }
        // });
    };

    const newPostForm = () => (
        <Form style={{marginTop:'4rem'}} className="mb-3" onSubmit={clickSubmit}>
     <div>

     <Accordion defaultActiveKey="5">
  <Card>
      
    <Card.Header>
    <span className="numIcon">2</span>
      <Accordion.Toggle className={'accordion_title'} as={Button} variant="link" eventKey="0">
        כתובת הנכס        
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse  eventKey="0">
      <Card.Body className={'accordion_body'}>

{/* Our recommendation */}
<Card className={'parent1 adress_badge'} style={{ width: '70vw',dir:'rtl' }}>
  <Card.Img className={' div2'} variant="right" src="https://assets.yad2.co.il/personal/images/general/video.png" />
  <Card.Body style={{dir:'rtl'}} className={' div1'} >
    <Card.Title className={'adress_badge_title'}>המלצה שלנו</Card.Title>
    <Card.Text  className='adress_badge_text'>
    העלאת וידאו של הנכס תמשוך יותר מתעניינים למודעה שלך
    </Card.Text>
  </Card.Body>
</Card>
<br/>
<p className={'info_text'}>סימנו עבורך את שדות החובה. שלא נפספס פרט חשוב</p>
<br/>

<div className={'property_type'}>
<p className={"property_type_title"} >*סוג הנכס</p>
<select defaultValue={'null'}  onChange={handleChange("property_type")} className={'property_type_select'} id="property_type" name="property_type">
<option hidden value="null">דירה או אולי פנטהאוז?</option>
    <option value="Apartment">דירה</option>
    <option value="Garden Apartment">דירת גן</option>
    <option value="Private house">בית פרטי/קוטג'</option>
    <option value="roof">גג/פנטהאוז</option>
    <option value="Plots">מגרשים</option>
    <option value="Duplex">דופלקס</option>
    <option value="Vacation Apartment">דירת נופש</option>
    <option value="Townhouse">דו משפחתי</option>
    <option value="basement">מרתף/פרטר</option>
    <option value="Triplex">טריפלקס</option>
    <option value="Unit">יחידת דיור</option>
    <option value="Farm">משק חקלאי/נחלה</option>
    <option value="Auxiliary farm">משק עזר</option>
    <option value="Assisted living">דיור מוגן</option>
    <option value="bulding">בניין מגורים</option>
    <option value="loft">סטודיו/לופט</option>
  </select>
</div>
{/* property_condition */}
<div className={'property_type'}>
<p className={"property_type_title"} >*מצב הנכס</p>
<select defaultValue={'null'}   onChange={handleChange("property_condition")} className={'property_type_select'} id="property_condition" name="property_condition">
<option  hidden value="null">משופץ? חדש מקבלן?</option>
    <option value="New from a contractor">חדש מקבלן (לא גרו בו בכלל)</option>
    <option value="New (property up to 5 years old)">חדש (נכס בן עד 5 שנים)</option>
    <option value="Renovated">משופץ (שופץ ב 5 השנים האחרונות)</option>
    <option value="In saved mode">במצב שמור (במצב טוב,לא שופץ)</option>
    <option value="Renovation required">דרוש שיפוץ (זקוק לעבודת שיפוץ)</option>
  </select>
</div>
{/* settlement */}
<div className={'property_type'}>
<p className={"property_type_title"} >*ישוב</p>
    <input type="text" onBlur={handleChange("property_address_city")} onClick={handleChange("property_address_city")} onChange={handleChange("property_address_city")} className={"address_city"} id={"search_input"} placeholder="?איפה נמצא הנכס" />
</div>
<div className={'property_type'}>
<p className={"property_type_title"} >*רחוב</p>
    <input type="text" onClick={handleChange("property_address_street")} onChange={handleChange("property_address_street")} className={"address_street"} id={"search_input_street"} placeholder="הכנסת שם הרחוב" />
</div>
<div className={'property_type'}>
<p className={"property_type_title"} >*מס' בית</p>
    <input type="number" onChange={handleChange("property_address_num")} className={"address_house_num"} id={""} placeholder="" />
</div>


<div className={'parent_of_floor'}>
<div className={'floor1'}><p className={"property_type_title_floor"} >*קומה</p>
    <input type="number" onChange={handleChange("property_floor")} className={"address_house_num"} id={""} placeholder="הכנסת מספר קומה" /></div>
<div className={'floor2'}><p className={"property_type_title_floor"} >*סה"כ קומות בבניין</p>
    <input type="number" onChange={handleChange("property_total_floors")} className={"address_house_num"} id={""} placeholder={`הכנסת סה"כ קומות`} /></div>
</div>

<div dir='rtl' className={'inline_box1'}>
<input onChange={handleChange("is_on_pillars")} className={'inline_box'} type='checkbox'/>
<p className={'inline_box'}>על עמודים</p>
</div>
<br/>
<div class="flex-container">
   <button  class="flex-items continue_button">המשך</button>
   <button class="flex-items prev_button">חזרה</button>
</div>

      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
    <span className="numIcon">3</span>
      <Accordion.Toggle className={'accordion_title'} as={Button} variant="link" eventKey="1">
        על הנכס
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>
      <div className={'property_type'}>
<p className={"property_type_title"} >*מספר חדרים</p>
<select defaultValue={'null'}  onChange={handleChange("num_of_rooms")} className={'property_type_select'} id="num_of_rooms" name="num_of_rooms">
<option  hidden value="null">בחירת מספר חדרים</option>
    <option value="0">0</option>
    <option value="1">1</option>
    <option value="1.5">1.5</option>
    <option value="2">2</option>
    <option value="2.5">2.5</option>
    <option value="3">3</option>
    <option value="3.5">3.5</option>
    <option value="4">4</option>
    <option value="4.5">4.5</option>
    <option value="5">5</option>
    <option value="5.5">5.5</option>
    <option value="6">6</option>
    <option value="6.5">6.5</option>
    <option value="7">7</option>
    <option value="7.5">7.5</option>
    <option value="8">8</option>
    <option value="8.5">8.5</option>
    <option value="9">9</option>
    <option value="9.5">9.5</option>
    <option value="10">10</option>
    <option value="10.5">10.5</option>
    <option value="11">11</option>
    <option value="11.5">11.5</option>
    <option value="12">12</option>
    </select>
</div>


<div className={'property_type'}>
<p className={"property_type_title"} >חניה</p>
<div className={'radio_group'}>
  <p className={'radio_div4'}  onClick={handleChange("num_of_parking")} value='3' variant="secondary">ללא</p>
  <p className={'radio_div3'} onClick={handleChange("num_of_parking")} value='2' variant="secondary">1</p>
  <p className={'radio_div2'} onClick={handleChange("num_of_parking")} value='1' variant="secondary">2</p>
  <p className={'radio_div1'} onClick={handleChange("num_of_parking")} value='0' variant="secondary">3</p>
</div>
</div>

<div className={'property_type'}>
<p className={"property_type_title"} >מרפסת</p>
<div className={'radio_group'}>
  <p className={'radio_div4'}  onClick={handleChange("num_of_balcony")} value='3' variant="secondary">ללא</p>
  <p className={'radio_div3'} onClick={handleChange("num_of_balcony")} value='2' variant="secondary">1</p>
  <p className={'radio_div2'} onClick={handleChange("num_of_balcony")} value='1' variant="secondary">2</p>
  <p className={'radio_div1'} onClick={handleChange("num_of_balcony")} value='0' variant="secondary">3</p>
</div>
</div>

<div className={'property_type'}>
<p className={"property_type_title"} >מאפייני הנכס</p>
<div className="parent_prop">
  <button id={'air_condition'} className="div1_prop">
<div   onClick={handleRadio("air_condition")} >
<FaRegSnowflake/>
  <span className={'prop_text'}>מיזוג</span>
   </div>
   </button>
   <button id={'shelter'} className="div2_prop">
<div onClick={handleRadio("shelter")} >
<FiBox/>
  <span className={'prop_text'}>ממ"ד</span>
 </div>
 </button>

 <button id={'garage'} className="div3_prop">
 <div onClick={handleRadio("garage")} ><BiBox/>
  <span  className={'prop_text'}>מחסן</span> </div>

 </button>
<button id={'pandor'} className="div4_prop">
<div onClick={handleRadio("pandor")} ><RiDoorClosedLine/>
  <span  className={'prop_text'}>דלתות פנדור</span></div>
  </button>
  <button id={"furniture"} className="div5_prop" >
<div onClick={handleRadio("furniture")} ><BiCabinet/>
  <span className={'prop_text'}>ריהוט</span></div>
  </button>
  <button id={"handicapped"} className="div6_prop">
<div onClick={handleRadio("handicapped")} ><FaWheelchair/>
  <span className={'prop_text'}>גישה לנכים</span></div>
  </button>
  <button id={"elevator"} className="div7_prop">
<div onClick={handleRadio("elevator")} ><GiElevator/>
  <span className={'prop_text'}>מעלית</span></div>
  </button>

<button id={"tadiran"} className="div8_prop">
<div onClick={handleRadio("tadiran")} ><FaRegSnowflake/>
  <span className={'prop_text'}>מזגן תדיראן</span></div>
  </button>
  <button id={"unit"} className="div9_prop">
<div onClick={handleRadio("unit")} ><BsHouseDoor/>
  <span  className={'prop_text'}>יחידת דיור</span></div>
  </button>
  <button id={"renovated"} className="div10_prop">
<div onClick={handleRadio("renovated")} ><RiPaintBrushLine/>
  <span  className={'prop_text'}>משופצת</span></div>
  </button>
  <button id={"kosher"} className="div11_prop">
<div onClick={handleRadio("kosher")} ><GiTap/>
  <span className={'prop_text'}>מטבח כשר</span></div>
  </button>
  <button id={"boiler"} className="div12_prop">
<div onClick={handleRadio("boiler")} ><GiSolarPower/>
  <span className={'prop_text'}>דוד שמש</span></div>
  </button>
<button id={"bars"} className="div13_prop">
<div onClick={handleRadio("bars")} ><AiOutlineTable/>
  <span className={'prop_text'}>סורגים</span></div>
  </button>
</div>

</div>
<br/>
<p className={'info_text'}>?מה חשוב לך שידעו על הנכס</p>
<br/>

<div className={'property_type'}>
  <div className={'flex-container'}>
  <p className={"flex-items limit_left"} id={'leftA'} >{maxLetters}/400</p>
  <p className={"property_type_title flex-items"} >פרוט הנכס</p>
  </div>
    <textarea  id={'textA'} className={'text_area'}
    placeholder={`זה המקום לתאר את הפרטים הבולטים, למשל, האם נערך שיפוץ במבנה, מה שופץ, כיווני אוויר, האווירה ברחוב וכו`}
                    onChange={
                      handleChange2()
                        }
                        onKeyUp={
                          handleChange('description')
                        }
                    // className="form-control"
                    maxlength={400}
                    // value={description}
                />
</div>
<div class="flex-container">
   <button  class="flex-items continue_button">המשך</button>
   <button class="flex-items prev_button">חזרה</button>
</div>



     </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
    <span className="numIcon">4</span>

      <Accordion.Toggle className={'accordion_title'} as={Button} variant="link" eventKey="2">
        תשלומים,תאריכים ועוד
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="2">
      <Card.Body>
      <div className={'property_type'}>
<p className={"property_type_title"} >מ"ר בנוי</p>
    <input type="number" onChange={handleChange("build_mr")} className={"build_mr"} id={""} placeholder={`כמה מ"ר יש בנכס`} />
</div>
<div className={'property_type'}>
<p className={"property_type_title"} >*גודל במ"ר סך הכל</p>
    <input type="number" onChange={handleChange("build_mr_total")} className={"build_mr"} id={""} placeholder={``} />
</div>

<div className={'property_type'}>
<p className={"property_type_title"} >*מחיר</p>
    <input type="number" onChange={handleChange("price")} className={"build_mr"} id={""} placeholder={`סכום מינימלי 100,000`} />
</div>

<div className={'property_type'}>
<p className={"property_type_title"} >*תאריך כניסה</p>
<div dir='rtl' className={'inline_box1'}>
    <input type="date" onChange={handleChange("entry_date")} className={"date"} id={'entry_date'} />
<input  onChange={date()} className={'inline_box'} type='checkbox'/>
<p className={'inline_box'}>מיידי</p>
</div>
</div>
<div class="flex-container">
   <button  class="flex-items continue_button">המשך</button>
   <button class="flex-items prev_button">חזרה</button>
</div>

</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
    <span className="numIcon">5</span>

      <Accordion.Toggle className={'accordion_title'} as={Button} variant="link" eventKey="3">
        תמונות וסרטונים
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="3">
      <Card.Body>
        {/* msg */}
      <Card className={' adress_badge'} style={{ width: '70vw',dir:'rtl' }}>
  <Card.Img className={' '} variant="right" src="" />
  <Card.Body style={{dir:'rtl'}} className={''} >
    <Card.Title className={'adress_badge_title'}></Card.Title>
    <Card.Text  className='adress_badge_text'>
לא לדאוג
    </Card.Text>
  </Card.Body>
</Card>
{/*  */}
<div className={'info_text_photos'}>
<p style={{marginBottom:'0rem'}}>?ידעת שמודעות עם תמונות ברורות מקבלות פי 10 יותר פניות </p>
<p >לא להסס להעלות לפה תמונות (אפשר עד 10 + וידאו) ולהבליט את הצדדים הטובים ביותר של הנכס</p>
</div>
<br/> 
<div dir={'rtl'} className={'parent3'}>
<div  className={''}>
  {
  !previewSource &&
   (<form >
     <div className={'div33'}>
     <span className={'input_file_title'}>העלאת סרטון</span>
     <input type='file' accept="video/*" name='main_image' onChange={handleFileInputChange} value={fileInput}  />
     </div>
  </form>)}
  {previewSource && <div className={'div33'}>
     <span className={'input_file_title'}>הסרטון עלה,אפשר להמשיך בפרסום</span>
     </div>}
</div>

<div className={' '}>
  {
  !previewVideo &&
   (<form >
     <div className={'div44'}>
     <span className={'input_file_title'}>העלאת תמונות</span>
     <input type='file' name='main_video' onChange={handleFileInputChange} value={videoInput}  />
     </div>
  </form>)}
    {previewVideo && (
    <div  className={'div44'}>
     <span className={'input_file_title'}>העלאת תמונות</span>
       <img style={{height:'80%',maxWidth:'100%', }} src={previewVideo}/>
    </div>
   )}
</div>
</div>
<p style={{width:'80vw',float:'right'}}>
  <hr style={{width:'80vw'}} />
</p>
<p style={{width:'80vw',float:'right',textAlign:'right'}}>תמונות שיופיעו בגוף המודעה</p>
{/* body photos */}
<div dir={'rtl'} className={'parent3'}>
<div  className={''}>
  {
  !previewPic2 &&
   (<form >
     <div className={'div33'}>
     <span className={'input_file_title'}>העלאת תמונות</span>
     <input type='file' name='pic2' onChange={handleFileInputChange} value={fileInput}  />
     </div>

  </form>)}
  {previewPic2 && (
    <div  className={'div33'}>
     <span className={'input_file_title'}>העלאת תמונות</span>
       <img style={{height:'80%',maxWidth:'100%', }} src={previewPic2}/>
    </div>
   )}
</div>

<div className={' '}>
  {
  !previewPic1 &&
   (<form >
     <div className={'div33'}>
     <span className={'input_file_title'}>העלאת תמונות</span>
     <input type='file' name='pic1' onChange={handleFileInputChange} value={pic1}  />
     </div>
  </form>)}
    {previewPic1 && (
    <div  className={'div33'}>
     <span className={'input_file_title'}>העלאת תמונות</span>
       <img style={{height:'80%',maxWidth:'100%', }} src={previewPic1}/>
    </div>
   )}
</div>
</div>
{/* another line */}
<div dir={'rtl'} className={'parent3'}>
<div  className={''}>
  {
  !previewPic4 &&
   (<form >
     <div className={'div33'}>
     <span className={'input_file_title'}>העלאת תמונות</span>
     <input type='file' name='pic4' onChange={handleFileInputChange} value={pic4}  />
     </div>
  </form>)}
  {previewPic4 && (
    <div  className={'div33'}>
     <span className={'input_file_title'}>העלאת תמונות</span>
       <img style={{height:'80%',maxWidth:'100%', }} src={previewPic4}/>
    </div>
   )}
</div>

<div className={' '}>
  {
  !previewPic3 &&
   (<form >
     <div className={'div33'}>
     <span className={'input_file_title'}>העלאת תמונות</span>
     <input type='file' name='pic3' onChange={handleFileInputChange} value={pic3}  />
     </div>
  </form>)}
    {previewPic3 && (
    <div  className={'div33'}>
     <span className={'input_file_title'}>העלאת תמונות</span>
       <img style={{height:'80%',maxWidth:'100%', }} src={previewPic3}/>
    </div>
   )}
</div>
</div>
    <div class="flex-container">
   <button  class="flex-items continue_button">המשך</button>
   <button class="flex-items prev_button">חזרה</button>
</div>
{/* submit button for cloudinary */}
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
    <span className="numIcon">6</span>

      <Accordion.Toggle className={'accordion_title'} as={Button} variant="link" eventKey="4">
        פרטים ליצירת קשר
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="4">
      <Card.Body>
        
        {/* שם איש הקשר */}
        <div className={'property_type'}>
<p className={"property_type_title"} >*שם איש הקשר</p>
    <input type="text" onChange={handleChange("contact_name")} className={"address_city"} id={""} placeholder={`${isAuthenticated().user.name}`} defaultValue={`${isAuthenticated().user.name}`} />
</div>
<br/>
<br/>

<div className={'property_type'}>
<p className={"property_type_title"} >*טלפון ראשי</p>
<div class="parent_phone">
<div class="div1_phone"> 
<select  defaultValue={'null'}  onChange={handleChange("contact_number_start")} className={''} id="" name="">
<option  value="050">050</option>
<option  value="051">051</option>
<option  value="052">052</option>
<option  value="053">053</option>
<option  value="054">054</option>
<option  value="055">055</option>
<option  value="058">058</option>
  </select>
</div>
<div > 
    <input className={"div2_phone"}  type="number"  placeholder="630-50-81" pattern={"[0-9]{3}-[0-9]{2}-[0-9]{2}"} required onBlur={handleChange("contact_number")}  />
</div>
</div>
</div>
<br/>
<div className={'property_type'}>
<p className={"property_type_title"} >*דוא"ל</p>
    <input type={"email"} onChange={handleChange("mail")} className={"address_city"}   />
</div>
<div class="flex-container">
   <button  class="flex-items continue_button">המשך</button>
   <button class="flex-items prev_button">חזרה</button>
</div>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
    <span className="numIcon">7</span>
      <Accordion.Toggle className={'accordion_title'} as={Button} variant="link" eventKey="5">
        סיום פרסום
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="5">
      <Card.Body>
        <div dir={'rtl'} >
    <p style={{textAlign:'right'}}>
    זהו, אנחנו בסוף. לנו נשאר לשמור את המודעה שלך, לך נשאר לבחור את מסלול הפרסום.  
    </p>
    {/*  */}
    <p style={{textAlign:'right'}}>
    אגב רצינו לספר לך שיש באתר עוד x מודעות דומוות לשלך באיזור y והסביבה שמתחרות על תשומת לב הקוני</p>
    {/*  */}
    <p style={{textAlign:'right'}}>
 ההמלצה שלנו? לשדרג את המודעה. להופיע לפני כולם ולהתקדם להסכם תיק תק   </p>
 <hr/>
 <h6 style={{textAlign:'right'}}>
 באיזה מסלול לפרסם את המודעה? זה הרגע לבלוט מעל כולם  
  </h6>
        </div>
        <div class="parent_Route">
<div class="div1_Route">
<p onClick={()=>{setValues({ ...values, 'Route': 'vip' })}}>VIP</p>
 </div>
<div class="div2_Route"> 
<p onClick={()=>{setValues({ ...values, 'Route': 'marked' })}}>מודגשת</p>
</div>
<div class="div3_Route">
  <p onClick={()=>{setValues({ ...values, 'Route': 'basic' })}}>בסיסי</p>
</div>
</div>
<br/>
<br/>
<br/>
<br/>
<br/>
    <button onClick={handleSubmitFile} type='button' >upload files to cloudinary</button>
    <button onClick={clickSubmit}  type='button' >העלה טופס ליד 2</button>
            
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
     
     </div>
            {/* <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div> */}
{/*                
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={handleChange("description")}
                    className="form-control"
                    value={description}
                />
            </div> */}
{/* 
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    value={price}
                />
            </div> */}
{/* 
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                >
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select
                    onChange={handleChange("shipping")}
                    className="form-control"
                >
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input
                    onChange={handleChange("quantity")}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            <button className="btn btn-outline-primary">Create Product</button> */}
        </Form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
       
    return (
        <Layout
            title="Add a new product"
            description={`G'day ${user.name}, ready to add a new product?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;
