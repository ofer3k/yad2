import React,{useState,useEffect} from 'react'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';  
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { API } from '../../config';
export default function PicsCarousel(props) {
const [pic1,setPic1]=useState('')
const [pic2,setPic2]=useState('')
const [pic3,setPic3]=useState('')
const [pic4,setPic4]=useState('')
const [pic5,setPic5]=useState('')
const [pic6,setPic6]=useState('')
const productId = props.match.params.productId

console.log(productId,'productId')

function submitSearchControl(productId){
  fetch(`${API}/single/product`,
{
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: "POST",
  body: JSON.stringify({productId})
})
.then(function(res){ res.json().then(body =>  { 
if(body[0].hasOwnProperty('pic1'))
  body[0].pic1.length>10?setPic1(body[0].pic1):setPic1('https://irishgardenplantsociety.com/wp-content/uploads/2015/10/no-image-available.gif')  
if(body[0].hasOwnProperty('pic2'))
  body[0].pic2.length>10?setPic2(body[0].pic2):setPic2('https://irishgardenplantsociety.com/wp-content/uploads/2015/10/no-image-available.gif')
if(body[0].hasOwnProperty('pic3'))
  body[0].pic3.length>10?setPic3(body[0].pic3):setPic3('https://irishgardenplantsociety.com/wp-content/uploads/2015/10/no-image-available.gif')
if(body[0].hasOwnProperty('pic4'))
  body[0].pic4.length>10?setPic4(body[0].pic4):setPic4('https://irishgardenplantsociety.com/wp-content/uploads/2015/10/no-image-available.gif')
if(body[0].hasOwnProperty('pic5'))
  body[0].pic5.length>10?setPic5(body[0].pic5):setPic5('https://irishgardenplantsociety.com/wp-content/uploads/2015/10/no-image-available.gif')
if(body[0].hasOwnProperty('pic6'))
  body[0].pic6.length>10?setPic6(body[0].pic6):setPic6('https://irishgardenplantsociety.com/wp-content/uploads/2015/10/no-image-available.gif')
 }); })
.catch(function(res){ console.log(res) })
}



// 
useEffect(() => {
  // Update the document title using the browser API
  submitSearchControl(productId)
  // document.title = `You clicked ${count} times`;
},[]);
    return (
        <div className={'full_page_background'}>
          <Link  to='/shop'>
            <p className={'back_from_carousle'}  style={{zIndex:'10000'}}>
              <BsArrowLeft size={'34px'} />
          </p>
          </Link>
        <div className={'slider'}>  
        <AwesomeSlider>
        <div>
            <img src={pic1}></img>
            
        </div>
        <div>     
        <video width="320" height="240" controls>
  <source src={pic2} type="video/mp4"/>
Your browser does not support the video tag.
</video>
     {/*  */}
        </div>
        <div>
        <img className={'img_fitter'} src={pic3}></img>
        </div>
        <div>
        <img className={'img_fitter'} src={pic4}></img>
        </div>
        <div>
        <img className={'img_fitter'} src={pic5}></img>
        </div>
        <div>
        <img className={'img_fitter'} src={pic6}></img>
        </div>
      </AwesomeSlider>
      </div>
      </div>
      )
}
