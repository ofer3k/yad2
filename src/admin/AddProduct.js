import React, { useState, useEffect,useContext } from "react";
import ProductContext from "../context/product-context";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories,uploadImage } from "./apiAdmin";
import { FaRegSnowflake,FaWheelchair,FaShekelSign } from 'react-icons/fa';
import { FiBox } from 'react-icons/fi';
import { BiBox,BiCabinet} from 'react-icons/bi';
import { CgCamera } from 'react-icons/cg';
import { RiPaintBrushLine,RiDoorClosedLine } from 'react-icons/ri';
import { GiElevator,GiTap,GiSolarPower } from 'react-icons/gi';
import { BsPlusCircle,BsFillTrashFill } from 'react-icons/bs';
import { AiOutlineTable,AiOutlinePlus,AiOutlineCrown } from 'react-icons/ai';
import { API } from "../config";
import './../css/addProduct.css'
import '../css/addProductResponsiv.css'


let picsList={
  pic1:'',
  pic2:'',
  pic3:'',
  pic4:'',
  pic5:'',
  pic6:'',
}
const mq = window.matchMedia( "(max-width: 690px)" );   
const AddProduct = () => {
// context
  const {valuesContext,
    setValuesContext,
    radiosContext,
    setRadiosContext
  } = useContext(ProductContext);
  // 
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
const [isAddContact,setIsAddContact]=useState(false)
const [isAgreeTerms,setIsAgreeTerms]=useState(false)
const [secondeCircleClass,setSecondeCirclrClass]=useState('circle_before_select')
const [thirdCircleClass,setthirdCirclrClass]=useState('circle_before_select')
const [forthCircleClass,setForthCirclrClass]=useState('circle_before_select')
const [fifthCircleClass,setFifthCirclrClass]=useState('circle_before_select')
const [sixthCirclrClass,setSixthCirclrClass]=useState('circle_before_select')





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
}

const handleSubmitFile=()=>{
// e.preventDefault()
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
  const reader=new FileReader()
reader.readAsDataURL(file)

reader.onloadend=()=>{
  switch (name) {
    case 'main_image':
      setPreviewSource(reader.result)
      console.log('main_image')
      break;
      case 'main_video':
        setPreviewVideo(reader.result)
      console.log('main video')
      break;
      case 'pic1':
        setPreviewPic1(reader.result)
      console.log('pic1')
      break;
      case 'pic2':
        setPreviewPic2(reader.result)
      console.log('pic2')
      break;
      case 'pic3':
        setPreviewPic3(reader.result)
      console.log('pic3')
      break;
      case 'pic4':
        setPreviewPic4(reader.result)
      console.log('pic4')
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
        loading,
        error,
        createdProduct,
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
    
    const finishUpload=(route)=>{
      setValuesContext({ ...valuesContext, 'Route': route })
      clickSubmit()
    }
    const handleCheckTerms=(e)=>{
      let value=e.target.checked
      setIsAgreeTerms(!isAgreeTerms)
    }

    const handleChange = name => event => {
  console.log(imagesUrlList)
        let value =
            name === "photo" ? event.target.files[0] : event.target.value;
        if(name==='property_address_city'||name==='property_address_street')
        {
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
        setValuesContext({...valuesContext, [name]: value})
        setValues({ ...values, [name]: value });
        console.log(valuesContext,'setValuesContext')
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
      setValuesContext({ ...valuesContext, entry_date: today })
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
      setRadiosContext({...radiosContext, [name]: value})
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


    const clickSubmit = () => {
        setValues({ ...values, error: "", loading: true });
        console.log(picsList)
        let switchig1=picsList.pic1
        let switchig2=picsList.pic2
        picsList.pic1=switchig2
        picsList.pic2=switchig1
        let obj={fullForm:valuesContext,redioButtons:radiosContext,pics:picsList}
        try {
          createProduct(user._id, token, obj).then(console.log('new post is cool cool cool')).then(res=>{
            console.log(res)
            if(res.err)
            {
setValues({ ...values, error: "משהו בהעלאת המודעה השתבש", loading: false });
            }
            else{
setValues({ ...values, error: "", loading: true });

            }
          })
          
        } catch (error) {
setValues({ ...values, error: "משהו בהעלאת המודעה השתבש", loading: false });

        }
          
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
    const [isSelected,setIselected]=useState('1')
    const [iscCicked_next,setIsCicked_next]=useState(false)
    const [iscCicked2_next,setIsCicked2_next]=useState(false)
    const [iscCicked3_next,setIsCicked3_next]=useState(false)
    const [iscCicked4_next,setIsCicked4_next]=useState(false)
    const [iscCicked5_next,setIsCicked5_next]=useState(false)

    const [firstFields,setFirstFields]=useState({
      type:false,
      condition:false,
      city:false,
      number:false,
      floor:false,
      total_floors:false
    })
    
    
    const firstNext=()=>{     
      setIsCicked2_next(true)
      if(document.getElementById('property_type').value=='null')
      {
        setFirstFields(firstFields => {
          return {
            ...firstFields,
            type: false
          };
        });
         }else{
        setFirstFields(firstFields => {
          return {
            ...firstFields,
            type: true
          };
        });
      }

      if(document.getElementById('property_condition').value=='null')
      {
        setFirstFields(firstFields => {
          return {
            ...firstFields,
           condition: false
          };
        });
      }else{
        setFirstFields(firstFields => {
          return {
            ...firstFields,
            condition: true
          };
        }); 
      }
      //city 
      if(document.getElementById('search_input').value.length<4)
      {
        setFirstFields(firstFields => {
          return {
            ...firstFields,
            city: false
          };
        });
      }else{
        setFirstFields(firstFields => {
          return {
            ...firstFields,
            city: true
          };
        }); 
      }
      //number 
      if(document.getElementById('house_num').value==''||document.getElementById('house_num').value<=0||document.getElementById('house_num').value>999)
      {
        setFirstFields(firstFields => {
          return {
            ...firstFields,
            number: false
          };
        });
      }else{
        setFirstFields(firstFields => {
          return {
            ...firstFields,
            number: true
          };
        }); 
      }
      //floor 
      if(document.getElementById('house_floor').value==''||document.getElementById('house_floor').value<0||document.getElementById('house_floor').value>70)
      {
        setFirstFields(firstFields => {
          return {
            ...firstFields,
            floor: false
          };
        });
      }else{
        setFirstFields(firstFields => {
          return {
            ...firstFields,
            floor: true
          };
        }); 
      }
      if(document.getElementById('house_total_floors').value==''||document.getElementById('house_total_floors').value<0||document.getElementById('house_total_floors').value>70||parseInt(valuesContext.property_total_floors)<parseInt(valuesContext.property_floor))
      {
        setFirstFields(firstFields => {
          return {
            ...firstFields,
            total_floors: false
          };
        });
      }else{

        setFirstFields(firstFields => {
          return {
            ...firstFields,
            total_floors: true
          };
        }); 
      }
        console.log('valuesContext.property_total_floors',valuesContext.property_total_floors)
        console.log(firstFields)
      if(Object.keys(firstFields).every((k) => firstFields[k]))
      moveNextSection(2)
      }


const moveNextSection=(num)=>{
  setIselected(num)
  if(num===5)
  {
    handleSubmitFile()
  }
  switch (num) {
    case 2:
      setSecondeCirclrClass('circle_selected')
      break;
      case 3:
        setSecondeCirclrClass('circle_after_check')
        setthirdCirclrClass('circle_selected')
      break;
      case 4:
        setthirdCirclrClass('circle_after_check')
        setForthCirclrClass('circle_selected')
      break;
      case 5:
        setForthCirclrClass('circle_after_check')
        setFifthCirclrClass('circle_selected')
      break;
      case 6:
        setFifthCirclrClass('circle_after_check')
        setSixthCirclrClass('circle_selected')
      break;
    default:
      break;
  }
  
}

const moveLastSection=(num)=>{
  setIselected(num)
  switch (num) {
    case 1:
      setSecondeCirclrClass('circle_after_check')
      break;
    case 2:
      setSecondeCirclrClass('circle_selected')
      setthirdCirclrClass('circle_after_check')
      break;
      case 3:
        setForthCirclrClass('circle_after_check')
        setthirdCirclrClass('circle_selected')
      break;
      case 4:
        setFifthCirclrClass('circle_after_check')
        setForthCirclrClass('circle_selected')
      break;
      case 5:
        setSixthCirclrClass('circle_after_check')
        setFifthCirclrClass('circle_selected')
      break;
      case 4:
        setFifthCirclrClass('circle_after_check')
        setSixthCirclrClass('circle_selected')
      break;
    default:
      break;
  }
  
}

// 
    const handleFieldSelection=(e)=>{
      console.log(e.target)
      console.log(e.target.getAttribute('name'))

      switch (e.target.getAttribute('name')) {
        case 'adress_field':
          setIselected('1')
          break;
        case 'details_field':
          setIselected('2')
          break;
          case 'payments_field':
            setIselected('3')
            break;
            
            case 'media_field':
          setIselected('4')
          break;

          case 'contact_field':
          setIselected('5')
          break;

          case 'publish_field':
          setIselected('6')
          break;
        default:
          setIselected('0')
          break;
      }
    }

    const secondeNext=()=>{     
      setIsCicked3_next(true)
      if(values.num_of_rooms==null)
      {
        // document.getElementById('num_of_rooms').style.borderColor='#c00'  
         }else{
        // document.getElementById('num_of_rooms').style.borderColor='#ccc'
        moveNextSection(3)
      }
}
const thirdNext=()=>{     
  setIsCicked4_next(true)

  if(values.build_mr>200000||values.build_mr<10)
  {
    values.build_mr=null
  }
  if(values.build_mr_total<values.build_mr)
  {
    document.getElementById('build_mr_total').style.borderColor='#c00'  
     }else{
    document.getElementById('build_mr_total').style.borderColor='#ccc'
  }
  if(values.price>20000000||values.price<100000)
  {
    values.price=null
    // document.getElementById('price').style.borderColor='#c00'  
     }else{
    // document.getElementById('price').style.borderColor='#ccc'
  }
  if(values.entry_date==null)
  {
    // document.getElementById('entry_date').style.borderColor='#c00'  
     }else{
    // document.getElementById('entry_date').style.borderColor='#ccc'
  }
  if((!values.build_mr_total<values.build_mr)&&values.entry_date!=null&&values.price!=null&&values.build_mr_total!=null&&values.build_mr!=null)
  {
moveNextSection(4)
  }

}
const fifthNext=()=>{     
  isAgreeTerms===false?setIsCicked5_next(true):moveNextSection(6)
  
}
// ------------------------------------------------return----------------------------------------------------
    const newPostForm = () => (
      <div className={'full_page'}>
        <div class="parent_add_product_acordion">
<div   className={isSelected=='1'?"field_style div1_add_product_acordion":"field_style_not_selected div1_add_product_acordion"}>
<div  style={{direction:'rtl'}}>
  <span   className={isSelected=='1'?"circle_selected":'circle_after_check'}>{isSelected=='1'?<span name={'adress_field'} >1</span>:<span name={'adress_field'} >&#10003;</span>}</span>
  <span className={isSelected=='1'?"text_select":'text_not_select'} >כתובת הנכס</span>
  </div>
  {isSelected=='1'&&
  <div style={{paddingRight:'5.5%'}}>
    <span className={'adress_field__note'}>סימנו עבורך את שדות החובה. שלא נפספס פרט חשוב </span>
    {/* first section */}
    <div class="parent_address_field_info">
<div class="div1_address_field_info">
  <span className={'field_info_title'}>*סוג הנכס</span>
  </div>
<div class={"div2_address_field_info"}>
<select className={iscCicked2_next&&!values.property_type?'field_select error':'field_select'} defaultValue={'null'}  onChange={handleChange("property_type")} id="property_type" name="property_type">
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
{!firstFields.type&&iscCicked_next&&values.property_type.length<1&&<p className={'invalid_field_note'}>שדה חובה סוג הנכס</p>}
</div>

<div class="div3_address_field_info"><span className={'field_info_title'}>*מצב הנכס</span></div>
<div class="div4_address_field_info">
<select  className={iscCicked2_next&&!values.property_condition?'field_select error':'field_select'} defaultValue={'null'} onChange={handleChange("property_condition")} id="property_condition" name="property_condition">
<option  hidden value="null">משופץ? חדש מקבלן?</option>
<option value="New from a contractor">חדש מקבלן (לא גרו בו בכלל)</option>
<option value="New (property up to 5 years old)">חדש (נכס בן עד 5 שנים)</option>
<option value="Renovated">משופץ (שופץ ב 5 השנים האחרונות)</option>
<option value="In saved mode">במצב שמור (במצב טוב,לא שופץ)</option>
<option value="Renovation required">דרוש שיפוץ (זקוק לעבודת שיפוץ)</option>
</select>
{!firstFields.condition&&iscCicked_next&&values.property_condition.length<1&&<p className={'invalid_field_note'}>שדה חובה מצב הנכס</p>}
</div>
<div class="div5_address_field_info"> <span className={'field_info_title'}>*ישוב</span> </div>
<div class="div6_address_field_info">
    <input className={iscCicked2_next&&!values.property_address_city?'field_select error':'field_select'} type="text" onBlur={handleChange("property_address_city")} onClick={handleChange("property_address_city")} onChange={handleChange("property_address_city")} id={"search_input"} placeholder="איפה נמצא הנכס?" />
{!firstFields.city&&iscCicked_next&&values.property_address_city.length<1&&<p className={'invalid_field_note'}>יש לבחור ישוב מתוך הרשימה</p>}
</div>
<div class="div7_address_field_info"><span className={'field_info_title'}>רחוב</span></div>
<div class="div8_address_field_info">
    <input className={'field_select'} type="text" onClick={handleChange("property_address_street")} onChange={handleChange("property_address_street")}  id={"search_input_street"} placeholder="הכנסת שם הרחוב" />
</div>
</div>
{/* */}
<div class="parent_address_field_info__next">
<div class="div1_address_field_info__next"><span className={'field_info_title'}>*מס' בית</span></div>
<div class="div2_address_field_info__next">
    <input className={iscCicked2_next&&!values.property_address_num?'field_select error':'field_select'} type="number" id={'house_num'} onChange={handleChange("property_address_num")}  />
{!firstFields.number&&iscCicked_next&&values.property_address_num==null&&<p className={'invalid_field_note'}>יש לבחור מס' בית מתוך הרשימה</p>}
</div>
<div class="div3_address_field_info__next"><span className={'field_info_title'}>*קומה</span></div>
<div class="div4_address_field_info__next">
    <input className={iscCicked2_next&&!values.property_floor?'field_select__next error':'field_select__next'} id={'house_floor'} type="number" onChange={handleChange("property_floor")}  placeholder="הכנסת מספר קומה" />
{!firstFields.floor&&iscCicked_next&&values.property_floor==null&&<p className={'invalid_field_note'}>שדה חובה קומה</p>}
</div>
<div style={{marginRight:'-20%'}} class="div5_address_field_info__next"><span  className={'field_info_title'}>*סה"כ קומות בבניין</span></div>
<div class="div6_address_field_info__next">
<input className={iscCicked2_next&&!values.property_total_floors?'field_select__next error':'field_select__next'} style={{marginRight:'-20%'}}  type="number" onChange={handleChange("property_total_floors")} id={'house_total_floors'} placeholder={`הכנסת סה"כ קומות`} />
{!firstFields.total_floors&&iscCicked_next&&values.property_total_floors==null&&<p className={'invalid_field_note'} style={{marginRight:'-20%'}}>שדה חובה סה"כ קומות בבניין</p>}
</div>
<div class="div7_address_field_info__next"><span style={{color: '#ccc'}} className={'field_info_title__disabled'}>שכונה</span></div>
<div class="div8_address_field_info__next">
<input className={'field_select__next'} type="text" id={'field_select__disabled'} disabled  placeholder={`${values.property_address_street}`} />
</div>
<div class="div9_address_field_info__next">
  <span className={'goverment_note'}>המידע הזה מגיע  מגוף ממשלתי ולא ניתן לשינוי</span>
</div>
<div class="div10_address_field_info__next">
<span style={{color: '#ccc'}} className={'field_info_title__disabled'}>אזור מכירה</span>
</div>
<div class="div11_address_field_info__next">
<input className={'field_select__next'} type="text" id={'field_select__disabled'} disabled  placeholder={`בחירת אזור מכירה`} />
</div>
<div class="div12_address_field_info__next">
<span className={'goverment_note'}>המידע הזה מגיע  מגוף ממשלתי ולא ניתן לשינוי</span>
</div>
<div  class="div13_address_field_info__next">
  <input type='checkbox' className={'updated_checkbox'}  />
  <span className={'updated_title'}>אני רוצה לקבל עדכון חודשי במייל עם הערכת שווי מעודכנת עבור הנכס, עסקאות באזור והצעות מקצועיות מיועצי נדל"ן</span>
</div>
</div>
{/* buttons */}
<div style={{direction:'ltr'}} class="parent_buttons">
<div class="div1_buttons">
<button className={'back_button_ok'}>חזרה</button>
</div>
<div class="div2_buttons">
  <button onClick={firstNext} className={'continue_button_ok'}></button>
</div>
</div>
{/* end */}
  </div>
  }  
</div>

<div style={{direction:'rtl'}} className={isSelected=='2'?"field_style div2_add_product_acordion":"field_style_not_selected div2_add_product_acordion"}>
<div  >
  { !(secondeCircleClass=='circle_after_check')&&
  <span  name={'details_field'} className={secondeCircleClass}>
    2
    </span>}
    { (secondeCircleClass==='circle_after_check')&& 
  <span 
   name={'details_field'} className={secondeCircleClass}>
    &#10003;
    </span>}
  <span className={isSelected=='2'?"text_select":'text_not_select'} >על הנכס</span>
  {isSelected=='2'&&
  <div style={{paddingRight:'5.5%',marginTop:'10px'}}>
    <div class="parent_section2">
<div class="div1_section2"><span className={'field_info_title'}>מספר חדרים*</span></div>
<div class="div2_section2">
<select  className={iscCicked3_next&&!values.num_of_rooms?'field_select error':'field_select'} defaultValue={'null'}  onChange={handleChange("num_of_rooms")}  id="num_of_rooms" name="num_of_rooms">
<option hidden value="null">בחירת מספר חדרים</option>
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
{values.num_of_rooms==null&&iscCicked3_next&&<p className={'invalid_field_note'}>שדה חובה סוג הנכס</p>}
</div>
{/* parking */}
<div class="div3_section2"><span className={'field_info_title'}>חניה</span></div>
<div class="div4_section2">

<div class="parent_parking field_select">
<div  className={values.num_of_parking==null||values.num_of_parking=='0'?'div1_parking selected':'div1_parking not_selected'}  value='0'>
  <span value='0' className={'radio_select_center_text'} onClick={handleChange("num_of_parking")} >ללא</span>
</div>
<div className={values.num_of_parking=='1'?'div2_parking selected':'div2_parking not_selected'}  value='1'>
<span value='1' className={'radio_select_center_text'} onClick={handleChange("num_of_parking")} >1</span>
</div>
<div className={values.num_of_parking=='2'?'div3_parking selected':'div3_parking not_selected'}  value='2'>
<span value='2' className={'radio_select_center_text'} onClick={handleChange("num_of_parking")} >2</span>
</div>
<div className={values.num_of_parking=='3'?'div4_parking selected':'div4_parking not_selected'}  value='3'>
<span value='3' className={'radio_select_center_text'} onClick={handleChange("num_of_parking")} >3</span>
</div>
</div>

</div>
<div class="div5_section2"><span className={'field_info_title'}>מרפסת</span></div>
<div class="div6_section2">
<div class="parent_parking field_select">
<div  className={values.num_of_balcony==null||values.num_of_balcony=='0'?'div1_parking selected':'div1_parking not_selected'}  value='0'>
  <span value='0' className={'radio_select_center_text'} onClick={handleChange("num_of_balcony")} >ללא</span>
</div>
<div className={values.num_of_balcony=='1'?'div2_parking selected':'div2_parking not_selected'}  value='1'>
<span value='1' className={'radio_select_center_text'} onClick={handleChange("num_of_balcony")} >1</span>
</div>
<div className={values.num_of_balcony=='2'?'div3_parking selected':'div3_parking not_selected'}  value='2'>
<span value='2' className={'radio_select_center_text'} onClick={handleChange("num_of_balcony")} >2</span>
</div>
<div className={values.num_of_balcony=='3'?'div4_parking selected':'div4_parking not_selected'}  value='3'>
<span value='3' className={'radio_select_center_text'} onClick={handleChange("num_of_balcony")} >3</span>
</div>
</div>
</div>
</div>
<p style={{marginTop:'20px'}} className={'bold_title'}>מאפיני הנכס</p>
{/*  */}
<div class="parent_radios_responsive">
<div class="div1_radios_responsive">
<button className={radios.air_condition?'radio_button_field_selected':'radio_button_field'} id={'air_condition'} >
<div onClick={handleRadio("air_condition")} >
<FaRegSnowflake/>
<span >מיזוג</span>
</div>
</button> 
</div>

<div class="div2_radios_responsive">
<button id={'shelter'} className={radios.shelter?'radio_button_field_selected':'radio_button_field'}>
<div onClick={handleRadio("shelter")} >
<FiBox/>
<span >ממ"ד</span>
</div>
</button>
</div>

<div class="div3_radios_responsive">
<button id={'garage'} className={radios.garage?'radio_button_field_selected':'radio_button_field'}>
<div onClick={handleRadio("garage")} ><BiBox/>
<span>מחסן</span> </div>
</button>
</div>

<div class="div4_radios_responsive">
<button id={'pandor'} className={radios.pandor?'radio_button_field_selected':'radio_button_field'}>
<div onClick={handleRadio("pandor")} ><RiDoorClosedLine/>
<span>דלתות פנדור</span></div>
</button>
</div>

<div class="div5_radios_responsive">
<button id={"furniture"} className={radios.furniture?'radio_button_field_selected':'radio_button_field'} >
<div onClick={handleRadio("furniture")} ><BiCabinet/>
<span >ריהוט</span></div>
</button>
</div>

<div class="div6_radios_responsive">
<button id={"handicapped"} className={radios.handicapped?'radio_button_field_selected':'radio_button_field'}>
<div onClick={handleRadio("handicapped")} ><FaWheelchair/>
<span>גישה לנכים</span></div>
</button>
</div>

<div class="div7_radios_responsive">
<button id={"elevator"} className={radios.elevator?'radio_button_field_selected':'radio_button_field'}>
<div onClick={handleRadio("elevator")} ><GiElevator/>
<span>מעלית</span></div>
</button>
</div>

<div class="div8_radios_responsive">
<button id={"tadiran"} className={radios.tadiran?'radio_button_field_selected':'radio_button_field'}>
<div onClick={handleRadio("tadiran")} ><FaRegSnowflake/>
<span>מזגן תדיראן</span></div>
</button>
</div>

<div class="div9_radios_responsive">
<button id={"renovated"} className={radios.renovated?'radio_button_field_selected':'radio_button_field'}>
<div onClick={handleRadio("renovated")} ><RiPaintBrushLine/>
<span>משופצת</span></div>
</button>
</div>

<div class="div10_radios_responsive">
<button id={"kosher"} className={radios.kosher?'radio_button_field_selected':'radio_button_field'}>
<div onClick={handleRadio("kosher")} ><GiTap/>
<span>מטבח כשר</span></div>
</button>
</div>

<div class="div11_radios_responsive">
<button id={"boiler"} className={radios.boiler?'radio_button_field_selected':'radio_button_field'}>
<div onClick={handleRadio("boiler")} ><GiSolarPower/>
<span>דוד שמש</span></div>
</button>
</div>

<div class="div12_radios_responsive">
<button id={"bars"} className={radios.bars?'radio_button_field_selected':'radio_button_field'}>
<div onClick={handleRadio("bars")} ><AiOutlineTable/>
<span >סורגים</span></div>
</button>
</div>
</div>
<p style={{marginTop:'20px'}} className={'bold_title'}>מה חשוב לך שידעו על הנכס?</p>

<div>
</div>
<div class="flex_container_textArea">
   <div class="flex_items_textArea">
<span >פרוט הנכס</span>
   </div>
   <div class="flex_items_textArea">
   <span className={'word_limit_textArea'}  id={'leftA'} >{maxLetters}/400</span>
   </div>
</div>

<textarea className={'field_select_reverse'} id={'textA'} 
placeholder={`זה המקום לתאר את הפרטים הבולטים, למשל, האם נערך שיפוץ במבנה, מה שופץ, כיווני אוויר, האווירה ברחוב וכו`}
               onChange={
                 handleChange2()
                   }
                   onKeyUp={
                     handleChange('description')
                   }
               maxlength={400}
           />

{/*  */}
<div style={{direction:'ltr'}} class="parent_buttons">
<div class="div1_buttons">
<button onClick={()=>moveLastSection(1)} className={'back_button_ok'}>חזרה</button>
</div>
<div class="div2_buttons">
  <button onClick={secondeNext} className={'continue_button_ok'}></button>
</div>
</div>
    </div>}
  </div>
</div>

<div  className={isSelected=='3'?"field_style div3_add_product_acordion":"field_style_not_selected div3_add_product_acordion"}>
<div  style={{direction:'rtl'}}>
{ !(thirdCircleClass=='circle_after_check')&&
  <span style={{cursor:'default'}} name={'payments_field'} className={thirdCircleClass}>
    3
    </span>}
    { (thirdCircleClass==='circle_after_check')&& 
  <span style={{cursor:'default'}} name={'payments_field'} className={thirdCircleClass}>
    &#10003;
    </span>}
  <span className={isSelected=='3'?"text_select":'text_not_select'} >תשלומים, תאריכים ועוד</span>
  {isSelected=='3'&&
  <div style={{paddingRight:'5.5%',marginTop:'10px'}}>
    {/* hello */}
    <div class="parent_section2">
<div class="div1_section2"><span className={'field_info_title'}>מר בנוי*</span></div>
<div class="div2_section2">
    <input style={{marginRight:'-15px'}} type="number" className={iscCicked4_next&&(values.build_mr==null)?'field_select error':'field_select'} onChange={handleChange("build_mr")}  id={"build_mr"} placeholder={`כמה מ"ר יש בנכס`} />
{/* {values.build_mr!==null&&<p className={'invalid_field_note'}>שדה חובה סוג הנכס</p>} */}
</div>
{/* parking */}
<div class="div3_section2">
<span className={'field_info_title'} >גודל במ"ר סך הכל*</span>
  </div>
<div class="div4_section2">
    <input type="number" style={{marginRight:'-15px'}} className={iscCicked4_next&&values.build_mr_total?'field_select error':'field_select'} onChange={handleChange("build_mr_total")}  id={"build_mr_total"} placeholder={``} />
</div>
<div class="div5_section2">
<span className={'field_info_title'} >מחיר*</span>
</div>
<div class="div6_section2">
    <input type="number" style={{marginRight:'-15px'}} onChange={handleChange("price")} className={iscCicked4_next&&!values.price?'field_select error':'field_select'} id={"price"} placeholder={`סכום מינימלי 100,000`} />
</div>
<p className={"field_info_title"} >תאריך כניסה*</p>
<div dir='rtl' >
    <input style={{marginRight:'-15px',maxWidth:'45%'}} className={iscCicked4_next&&!values.entry_date?'field_select error':'field_select'} type="date" onChange={handleChange("entry_date")}  id={'entry_date'} />
    <input onChange={date()} className={'inline_box'} type='checkbox'/>
<span className={'inline_box'}>מיידי</span>
</div>
{/* buttons */}
<div style={{direction:'ltr'}}  class="parent_buttons">
<div class="div1_buttons">
<button onClick={()=>moveLastSection(2)} className={'back_button_ok'}>חזרה</button>
</div>
<div class="div2_buttons">
  <button onClick={thirdNext} className={'continue_button_ok'}></button>
</div>
</div>
</div>
    </div>}
  </div>
</div>

<div  className={isSelected=='4'?"field_style div4_add_product_acordion":"field_style_not_selected div4_add_product_acordion"}>
<div  style={{direction:'rtl'}}>
{ !(forthCircleClass=='circle_after_check')&&
  <span style={{cursor:'default'}} name={'media_field'} className={forthCircleClass}>
    4
    </span>}
    { (forthCircleClass==='circle_after_check')&& 
  <span style={{cursor:'default'}} name={'media_field'} className={forthCircleClass}>
    &#10003;
    </span>}
  <span className={isSelected=='4'?"text_select":'text_not_select'} >תמונות וסרטונים</span>
  {isSelected=='4'&&
  <div style={{paddingRight:'5.5%',marginTop:'10px'}}>
    <span className={'media_note'} >ידעת שמודעות עם תמונות ברורות מקבלות פי 10 יותר פניות? </span>
    <br/>
    <span className={'media_note'} >לא להסס להעלות לפה תמונות (אפשר עד 10 + וידאו) ולהבליט את הצדדים הטובים ביותר של הנכס</span>
    <div class="parent_media_main">
<div class="div1_media_main">
<div  class="flex-container_video video_input_border">
  {
    !previewVideo&&
    <>
    <div class="flex-items_video"><CgCamera size={'30px'} color={'gray'}/></div>
    <div class="flex-items_video">העלאת סרטון</div>
    <input className={'video_input'} type='file' accept='video/*' name='main_video' onChange={handleFileInputChange} value={videoInput}  />
    </>
  }
  {
    previewVideo&&
    <>
    <span style={{textAlign:'center'}} class="flex-items_video">הסרטון עלה, אפשר להמשיך בפרסום</span>    
    </>
  }
</div>
</div>

<div class="div2_media_main">
<div  class="flex-container_video main_pic_input_border">
  { 
    !previewSource&&
    <>
    <div class="flex-items_video"><AiOutlinePlus size={'30px'} color={'gray'}/></div>
    <div class="flex-items_video">העלאת תמונות</div>
    <input accept="image/*" className={'video_input'} type='file' name='main_image' onChange={handleFileInputChange} value={videoInput}  />
    </>
  }
  {
    previewSource&&
    <>
    <span style={{textAlign:'center'}} class="flex-items_video">
  <img className={'fit_image'}  src={previewSource}/>
      </span>    
    </>
  }
</div>
</div>
</div>
<hr style={{marginLeft:'20px',background:'black'}} />    
<div class="parent_media_body">
<div class="div1_media_body">

<div  class="flex-container_video video_input_border">
  { 
    !previewPic1&&
    <>
    <div class="flex-items_video"><AiOutlinePlus size={'30px'} color={'gray'}/></div>
    <div class="flex-items_video">העלאת תמונות</div>
    <input accept="image/*" className={'video_input'} type='file' name='pic1' onChange={handleFileInputChange} value={videoInput}  />
    </>
  }
  {
    previewPic1&&
    <>
    <span style={{textAlign:'center'}} class="flex-items_video">
  <img className={'fit_image'}  src={previewPic1}/>
      </span>    
    </>
  }
</div>
</div>

<div class="div2_media_body">
<div  class="flex-container_video video_input_border">
  { 
    !previewPic2&&
    <>
    <div class="flex-items_video"><AiOutlinePlus size={'30px'} color={'gray'}/></div>
    <div class="flex-items_video">העלאת תמונות</div>
    <input accept="image/*" className={'video_input'} type='file' name='pic2' onChange={handleFileInputChange} value={videoInput}  />
    </>
  }
  {
    previewPic2&&
    <>
    <span style={{textAlign:'center'}} class="flex-items_video">
  <img className={'fit_image'}  src={previewPic2}/>
      </span>    
    </>
  }
</div>
</div>
<div class="div3_media_body">
<div  class="flex-container_video video_input_border">
  { 
    !previewPic3&&
    <>
    <div class="flex-items_video"><AiOutlinePlus size={'30px'} color={'gray'}/></div>
    <div class="flex-items_video">העלאת תמונות</div>
    <input accept="image/*" className={'video_input'} type='file' name='pic3' onChange={handleFileInputChange} value={videoInput}  />
    </>
  }
  {
    previewPic3&&
    <>
    <span style={{textAlign:'center'}} class="flex-items_video">
  <img className={'fit_image'}  src={previewPic3}/>
      </span>    
    </>
  }
</div>
</div>
<div class="div4_media_body">
<div  class="flex-container_video video_input_border">
  { 
    !previewPic4&&
    <>
    <div class="flex-items_video"><AiOutlinePlus size={'30px'} color={'gray'}/></div>
    <div class="flex-items_video">העלאת תמונות</div>
    <input accept="image/*" className={'video_input'} type='file' name='pic4' onChange={handleFileInputChange} value={videoInput}  />
    </>
  }
  {
    previewPic4&&
    <>
    <span style={{textAlign:'center'}} class="flex-items_video">
  <img className={'fit_image'}  src={previewPic4}/>
      </span>    
    </>
  }
</div>
</div>
<div class="div5_media_body">
<div  class="flex-container_video video_input_border">
    <div class="flex-items_video"><AiOutlinePlus size={'30px'} color={'gray'}/></div>
    <div class="flex-items_video">העלאת תמונות</div>
    <input disabled accept="image/*" className={'video_input'} type='file' name='pic3' onChange={handleFileInputChange} value={videoInput}  />
</div>
</div>

<div class="div6_media_body">
<div  class="flex-container_video video_input_border">
    <div class="flex-items_video"><AiOutlinePlus size={'30px'} color={'gray'}/></div>
    <div class="flex-items_video">העלאת תמונות</div>
    <input disabled accept="image/*" className={'video_input'} type='file' name='pic3' onChange={handleFileInputChange} value={videoInput}  />
</div>
</div>

<div class="div7_media_body">
<div  class="flex-container_video video_input_border">
    <div class="flex-items_video"><AiOutlinePlus size={'30px'} color={'gray'}/></div>
    <div class="flex-items_video">העלאת תמונות</div>
    <input disabled accept="image/*" className={'video_input'} type='file' name='pic3' onChange={handleFileInputChange} value={videoInput}  />
</div>
</div>

<div class="div8_media_body">
<div  class="flex-container_video video_input_border">
    <div class="flex-items_video"><AiOutlinePlus size={'30px'} color={'gray'}/></div>
    <div class="flex-items_video">העלאת תמונות</div>
    <input disabled accept="image/*" className={'video_input'} type='file' name='pic3' onChange={handleFileInputChange} value={videoInput}  />
</div>
</div>

<div class="div9_media_body">
<div style={{maxWidth:'220px',margin:'0 auto'}}  class="flex-container_video video_input_border">
    <div class="flex-items_video"><AiOutlinePlus size={'30px'} color={'gray'}/></div>
    <div class="flex-items_video">העלאת תמונות</div>
    <input disabled accept="image/*" className={'video_input'} type='file' name='pic3' onChange={handleFileInputChange} value={videoInput}  />
</div>
</div>
</div>
{/* buttons */}
<div style={{direction:'ltr'}}  class="parent_buttons">
<div class="div1_buttons">
<button onClick={()=>moveLastSection(3)} className={'back_button_ok'}>חזרה</button>
</div>
<div class="div2_buttons">
  <button onClick={()=>{moveNextSection(5)}} className={'continue_button_ok'}></button>
</div>
</div>
    </div>
    }
  </div>
</div>

<div  className={isSelected=='5'?"field_style div5_add_product_acordion":"field_style_not_selected div5_add_product_acordion"}>
<div  style={{direction:'rtl'}}>
{ !(fifthCircleClass=='circle_after_check')&&
  <span style={{cursor:'default'}} name={'contact_field'} className={fifthCircleClass}>
    5
    </span>}
    { (fifthCircleClass==='circle_after_check')&& 
  <span style={{cursor:'default'}} name={'contact_field'} className={fifthCircleClass}>
    &#10003;
    </span>}
  <span className={isSelected=='5'?"text_select":'text_not_select'} >פרטים ליצירת קשר</span>
  {isSelected=='5'&&
  <div style={{paddingRight:'5.5%',marginTop:'10px'}}>
<div class="parent_contact_infoA">
<div class="div1_contact_infoA"> 
<span>*שם איש קשר</span>
</div>
<div class="div2_contact_infoA">
<span>*טלפון ראשי</span>
</div>
<div class="div3_contact_infoA">
  <input className={'name_contact_infoA_input'} onChange={handleChange("contact_name")} placeholder={`${isAuthenticated().user.name}`} defaultValue={`${isAuthenticated().user.name}`} type="text" />
</div>
<div class="div4_contact_infoA"> 
    <input className={'contact_infoA_input'}  type="number"  placeholder="630-50-81" pattern={"[0-9]{3}-[0-9]{2}-[0-9]{2}"} required onBlur={handleChange("contact_number")}  />
</div>

<div class="div5_contact_infoA">
<select  defaultValue={'null'}  onChange={handleChange("contact_number_start")} className={'contact_infoA_input'}>
<option  value="050">050</option>
<option  value="051">051</option>
<option  value="052">052</option>
<option  value="053">053</option>
<option  value="054">054</option>
<option  value="055">055</option>
<option  value="058">058</option>
</select>
</div>
<div class="div6_contact_infoA"> 
<input disabled className={'verified_number'} placeholder={`   המספר אומת`} style={{width:'80%',textAlign:'right'}}/>
</div>
</div>
{
  !isAddContact&&
<div onClick={()=>{setIsAddContact(true)}} className={'add_contact'}>
<span><BsPlusCircle/></span>
<span style={{marginRight:'6px'}}>הוספת אישר קשר נוסף</span>
</div>
}
{
  isAddContact&&
<div style={{marginTop:'40px'}} class="parent_contact_infoA">
<div class="div1_contact_infoA"> 
<span>איש קשר נוסף</span>
</div>
<div class="div2_contact_infoA">
<span>טלפון נוסף</span>
</div>
<div class="div3_contact_infoA">
  <input className={'name_contact_infoA_input'}  type="text" />
</div>
<div class="div4_contact_infoA"> 
    <input className={'contact_infoA_input'}  type="number"  pattern={"[0-9]{3}-[0-9]{2}-[0-9]{2}"} />
</div>

<div class="div5_contact_infoA">
<select  defaultValue={'null'}   className={'contact_infoA_input'}>
<option  value="050">050</option>
<option  value="051">051</option>
<option  value="052">052</option>
<option  value="053">053</option>
<option  value="054">054</option>
<option  value="055">055</option>
<option  value="058">058</option>
</select>
</div>

<div onClick={()=>{setIsAddContact(false)}} style={{color:'gray',fontSize:'14px',marginTop:'6px'}} class="div6_contact_infoA"> 
<span>ביטול</span>
<span><BsFillTrashFill/></span>
</div>

</div>
}
<div>
  <span  className={'field_info_title'}>
    דוא"ל
  </span>
  <br/>
      <input style={{marginRight:'-15px'}} className={'field_select'} value={isAuthenticated().user.email} type={"email"} onChange={handleChange("mail")} placeholder={`${isAuthenticated().user.email}`} />
</div>
<div className={'field_select agree_terms'}>
  <input onChange={handleCheckTerms} style={{marginTop:'0'}}  className={'updated_checkbox'} type={'checkbox'}/>
  <span>קראתי ואישרתי את <a href={'https://www.yad2.co.il/eula'} style={{color: '#ff6600'}} className={'terms_link'}>התקנון</a>*</span>
</div>

{
  !isAgreeTerms&&iscCicked5_next&&
  <p className={'terms_note'}>חובה לסמן אם תרצו להמשיך</p>
}
{/* buttons */}
<div style={{direction:'ltr'}} class="parent_buttons">
<div class="div1_buttons">
</div>
<div class="div2_buttons">
  <button onClick={fifthNext} className={'continue_button_pic_route'}>המשך לבחירת מסלול</button>
</div>
</div>
    </div>}

  </div>
</div>

<div  className={isSelected=='6'?"field_style div6_add_product_acordion":"field_style_not_selected div6_add_product_acordion"}>
<div  style={{direction:'rtl'}}>
<span style={{cursor:'default'}} name={'publish_field'} className={sixthCirclrClass}>6</span>
  <span className={isSelected=='6'?"text_select":'text_not_select'} >סיום פרסום</span>
  {isSelected=='6'&&!(mq.matches)&&
  <div style={{paddingRight:'5.5%',marginTop:'10px'}}>
  <span className={'pick_route_title'}>זהו, אנחנו בסוף. לנו נשאר לשמור את המודעה שלך, לך נשאר לבחור את מסלול הפרסום.</span>
<hr style={{marginLeft:'20px',background:'black'}} />    
<span style={{fontWeight:'400'}} className={'pick_route_title'}>באיזה מסלול לפרסם את המודעה? זה הרגע לבלוט מעל כולם</span>
<div class="parent_routes">
<div class="div1_routes basic_route">
  <div style={{backgroundColor:'rgb(252,251,251)'}} class="parent_basic">
  <div class="div1_basic">
<span className={'route_title'}>בסיסי</span>
  </div>
  <div class="div2_basic">
<span className={'route_include'} >מודעה רגילה  &#10003;</span>
  </div>
  <div class="div3_basic">
  <span className={'route_not_include'}>הקפצה אוטומטית לחסכון בזמן  &#10005;
</span>
  </div>
  <div onClick={()=>{finishUpload('basic') }} class="div4_basic">
  <span className={'not_vip_button'}>  
    <span>חינם</span>
    <span> / 120 ימים</span>
  </span>
  </div>
</div>
</div>
<div class="div2_routes vip_route">
<div class="parent_vip">
<div class="div1_vip">
<span className={'route_title'}>VIP</span>
</div>
<div class="div2_vip">
<span className={'crown_vip'}> <span>מומלץ</span> <span className={'crown_icon'}><AiOutlineCrown /></span></span>
</div>
<div class="div3_vip">
<span className={'route_include'} >מודעה מודגשת בצבע צהוב  &#10003;</span>
</div>
<div class="div4_vip">
<span className={'route_include'} >הקפצה אוטומטית לחסכון בזמן  &#10003;</span>
</div>
<div class="div5_vip">
<span className={'route_include'} >הופעה לפני הודעות רגילות וורודות  &#10003;</span>
</div>
<div onClick={()=>{finishUpload('vip') }} class="div6_vip">
  <span className={'vip_button'}>
  <span>199 <FaShekelSign/>  </span>
  <span className={'vip_button__days'}> / 28 ימים</span>
  </span>

</div>
</div>
</div>
<div class="div3_routes marked">
<div class="parent_basic">
  <div class="div1_basic">
<span className={'route_title'}>מודגשת</span>
  </div>
  <div class="div2_basic">
<span className={'route_include'} >מודעה מודגשת בצבע ורוד  &#10003;</span>
  </div>
  <div class="div3_basic">
  <span className={'route_include'}>הקפצה אוטומטית לחסכון בזמן  &#10003;
</span>
  </div>
  <div onClick={()=>{finishUpload('marked') }} style={{direction:'rtl'}} class="div4_basic">
  <span style={{color:'#ff7100',backgroundColor:'white'}} className={'vip_button'}>
  <span  >99 <FaShekelSign/>  </span>
  <span className={'vip_button__days'}> / 28 ימים</span>
  </span>
  </div>
</div>
</div>
</div>

{/* <button onClick={clickSubmit}>יד 2</button> */}

{/* <button style={{marginRight:'40px'}} onClick={handleSubmitFile}>מדיה לענן</button> */}
  </div>}
  {isSelected=='6'&&(mq.matches)&&
  <div style={{paddingRight:'5.5%',marginTop:'10px'}}>
    
    <span className={'pick_route_title'}>זהו, אנחנו בסוף. לנו נשאר לשמור את המודעה שלך, לך נשאר לבחור את מסלול הפרסום.</span>
<hr style={{marginLeft:'20px',background:'black'}} />    
<span style={{fontWeight:'400'}} className={'pick_route_title'}>באיזה מסלול לפרסם את המודעה? זה הרגע לבלוט מעל כולם</span>
<div class="parent_route_s_sc">
<div class="div1_route_s_sc vip_route_s_sc">
  <p className={'route_title_s_sc'}>vip</p>
  <span className={'crown_vip_s_sc'}>  <span className={'crown_icon'}><AiOutlineCrown /></span><span>מומלץ</span></span>
  <p style={{marginTop:'10px'}}><span className={'route_include_s_sc'} >&#10003; מודעה מודגשת בצבע צהוב  </span></p>
  <p><span className={'route_include_s_sc'} >&#10003; הקפצה אוטומטית לחסון בזמן  </span></p>
  <p><span className={'route_include_s_sc'} >&#10003; הופעה לפני מודעות רגילות וורודות  </span></p>
  
  <p onClick={()=>{finishUpload('vip') }} className={'vip_button_s_sc'}>
    <span >
  <span>199 <FaShekelSign/>  </span>
  <span className={'vip_button__days'}> / 28 ימים</span>
  </span>
  </p>  
</div>
{/*  */}
<div class="div2_route_s_sc">
<div class="div1_route_s_sc marked_route_s_sc">
  <p className={'route_title_s_sc'}>מודגשת</p>
  <p style={{marginTop:'10px'}}><span className={'route_include_s_sc'} >&#10003; מודעה מודגשת בצבע ורוד  </span></p>
  <p><span className={'route_include_s_sc'} >&#10003; הקפצה אוטומטית לחסון בזמן  </span></p>
  
  <p onClick={()=>{finishUpload('marked') }} className={'marked_button_s_sc'}>
  <span >
  <span  >99 <FaShekelSign/>  </span>
  <span className={'vip_button__days'}> / 28 ימים</span>
  </span>
  </p>  
</div>
</div>
{/*  */}
<div class="div3_route_s_sc">
<div class="div1_route_s_sc marked_route_s_sc">
  <p className={'route_title_s_sc'}>בסיסי</p>
  <p style={{marginTop:'10px'}}><span className={'route_include_s_sc'} >&#10003; מודעה רגילה  </span></p>
  <p><span style={{opacity:'0.5'}} className={'route_include_s_sc'} >&#10005; הקפצה אוטומטית לחסון בזמן  </span></p>
  
  <p onClick={()=>{finishUpload('basic') }} className={'marked_button_s_sc'}>
  <span >
  <span  >חינם </span>
  <span className={'vip_button__days'}> / 120 ימים</span>
  </span>
  </p>  
</div>
</div>
</div>


    </div>}
    </div>
</div>

</div>



       
        </div>
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
            <div style={{textAlign:'center'}} className="alert alert-success">
                <h2>המודעה פורסמה בהצלחה</h2>
            </div>
        );
       
    return (
        <Layout
            title="Add a new product"
            description={`G'day ${user.name}, ready to add a new product?`}
        >
            <div style={{backgroundColor:'rgb(245,245,245)'}} className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {newPostForm()}
                    {showLoading()}
                    {showError()}

                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;
