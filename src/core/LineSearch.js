import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { API } from "../config";
import Card from "./Card";
import { Container, Row, Col } from 'reactstrap';
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import '../searchForm.css'
import extra from '../imgs/extra.png';
import apartments from '../imgs/apartments.png';
import houses from '../imgs/houses.png';
import orangeExtra from '../imgs/orangeExtra.png';
import orangeApartments from '../imgs/orangeApartments.png';
import orangeHouses from '../imgs/orangeHouses.png';
import './../LineSearch.css'

import { useHistory } from "react-router-dom";


const LineSearch = () => {
  let history = useHistory();
  const [dropDown,setDropDown]=useState(false)
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [numOfRooms,setNumOfRooms]= useState([1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
    const [numOfFloors,setNumOfFloors]= useState(['פרטר/מרתף',1,2,3,4,5,6,7,8,9,10,11,12,13,14])
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [advancedSearch,setAdvancedSearch]= useState(false)
    const [numberOfRadioSelected,setNumberOfRadioSelected]=useState(0)
    let countRadiosCheck=numberOfRadioSelected;
    

    const [values, setValues] = useState({
        entery_date:null,
        exclusively:null,
        name:'',
        description: "",
        price: "",
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
        property_type1:"",
        property_type2:"",
        property_type3:"",
        property_condition:"",
        property_address_city:"",
        property_address_street:"",
        property_address_num:null,
        property_floor:null,
        property_total_floors:null,
        num_of_rooms:null,
        min_num_of_rooms:null,
        max_num_of_rooms:null,
        min_num_of_floors:null,
        max_num_of_floors:null,
        min_price:null,
        max_price:null,
        min_mr:null,
        max_mr:null,
        is_on_pillars:null,
        num_of_parking:null,
        num_of_balcony:null,
        balcony:null,
        build_mr:null,
        build_mr_total:null,
        contact_name:'',
        contact_number_start:'',
        contact_number:'',
        mail:'',
        Route:null,
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
const {
    entery_date,
    exclusively,
    name,
    description,
    price,
    min_price,
    max_price,
    min_mr,
    max_mr,
    category,
    shipping,
    quantity,
    photo,
    loading,
    createdProduct,
    redirectToProfile,
    formData,
    property_type1,
    property_type2,
    property_type3,
    property_condition,
    property_address_city,
    property_address_street,
    property_address_num,
    property_floor,
    property_total_floors,
    num_of_rooms,
    min_num_of_rooms,
    max_num_of_rooms,
    min_num_of_floors,
    max_num_of_floors,
    is_on_pillars,
    num_of_parking,
    num_of_balcony,
    balcony,
    build_mr,
    build_mr_total,
    contact_name,
    contact_number_start,
    contact_number,
    mail,
    Route,
    air_condition,
    shelter,
    garage,
    pandor,
    furniture,
    handicapped,
    elevator,
    tadiran,
    unit,
    renovated,
    kosher,
    boiler,
    bars
}=values
const submitSearch=()=>{
    fetch(`${API}/products/by/Filter`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({...values})
})
.then(function(res){ res.json().then(body =>  {

  history.push("/shop", { body}); 
  console.log()}); })
.catch(function(res){ console.log(res) })

}
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
      
      document.getElementById('entery_date').value=today 
      setValues({ ...values, entery_date: today }); 
      console.log(values)
      document.getElementById('entery_date').disabled = true;
    }
    else{
      document.getElementById('entery_date').disabled = false;

    }
};

const radiosChange=(e)=>{
    const radio=document.getElementById(e.target.id)
    let answer=e.target.classList.contains('CheckedButton')?true:false
    if(answer){
       radio.classList=('unCheckedButton')
       radio.value=''
       countRadiosCheck--
    }else{
        radio.classList=('CheckedButton')
        radio.value='v'
       countRadiosCheck++ 
    }
    setValues({...values, [e.target.name]: !answer})
    setNumberOfRadioSelected(countRadiosCheck)
    
}
const advancedSearchFunc=(e)=>{    
    if(advancedSearch===false)
    {
        setAdvancedSearch(true)
        document.getElementById('plusButton').innerHTML='-'
    }else{
        setAdvancedSearch(false)
        document.getElementById('plusButton').innerHTML='+'

    }
    
}


const roomsQuickButtonFunc=(e)=>{
    const minRooms=document.getElementById("selectRooms")
    const maxRooms=document.getElementById("selectRooms2")
switch (e.target.value) {
    case '1':
        setNumOfRooms([2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
        minRooms.selectedIndex  = 3;
        maxRooms.selectedIndex  = 3;
        setValues({...values, min_num_of_rooms: '2',max_num_of_rooms: '3' })
        
        break;
        case '2':
        setNumOfRooms([3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
        minRooms.selectedIndex  = 5;
        maxRooms.selectedIndex  = 3;
        setValues({...values, min_num_of_rooms: '3',max_num_of_rooms: '4' })
        
        break;
        case '3':
            setNumOfRooms([4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
            minRooms.selectedIndex  = 7;
        maxRooms.selectedIndex  = 3;
        setValues({...values, min_num_of_rooms: '4',max_num_of_rooms: '5' })

        break;
        case '4':
            setNumOfRooms([5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
            minRooms.selectedIndex  = 9;
        maxRooms.selectedIndex  = 3;
        setValues({...values, min_num_of_rooms: '5',max_num_of_rooms: '6' })

        break;
    default:
        break;
}
}
const priceQuickButtonFunc=(e)=>{
    const minPrice=document.getElementById("min_price")
    const maxPrice=document.getElementById("max_price")
switch (e.target.value) {
    case '1':
        setValues({...values, min_price: '0',max_price: '1,500,000' })
        minPrice.value = "0";
        maxPrice.value = "1,500,000";
        break;
        case '2':
            setValues({...values, min_price: '1,500,000',max_price: '2,000,000' })
            minPrice.value = "1,500,000";
            maxPrice.value = "2,000,000";
            break;
        case '3':
            setValues({...values, min_price: '2,000,000',max_price: '3,500,000' })
            minPrice.value = "2,000,000";
            maxPrice.value = "3,500,000";
            break;
        case '4':
            setValues({...values, min_price: '3,500,000',max_price: '5,000,000' })
            minPrice.value = "3,500,000";
            maxPrice.value = "5,000,000";
            break;
    default:
        break;
}
}
    // const init = () => {
    //     getCategories().then(data => {
    //         if (data.error) {
    //             setError(data.error);
    //         } else {
    //             setCategories(data);
    //         }
    //     });
    // };
    
    function inputChangeHandler(event) {
        if(event.target.name==='property_type1')
        {
            console.log(values)
            document.getElementById('apartmentsImg').classList.contains('image_style_orange')?
            setValues({...values, [event.target.name]: event.target.value }):
            setValues({...values, [event.target.name]: '' });
            return 
        }

        if(event.target.name==='property_type2')
        {
            console.log(values)
            document.getElementById('housesImg').classList.contains('image_style_orange')?
            setValues({...values, [event.target.name]: event.target.value }):
            setValues({...values, [event.target.name]: '' });
            return 
        }
        if(event.target.name==='property_type3')
        {
            console.log(values)
            document.getElementById('extraImg').classList.contains('image_style_orange')?
            setValues({...values, [event.target.name]: event.target.value }):
            setValues({...values, [event.target.name]: '' });
            return 
        }
        
        setValues({...values, [event.target.name]: event.target.value }); 
        console.log(values) 
    } 

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };
    const changeRoomSelection=(e)=>{
            let num=document.getElementById('selectRooms').value
               console.log(numOfRooms)
               console.log(num)
               switch(num) {
                case '1':
                    setNumOfRooms([1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '1'})
                  break;
                  case 'הכל':
                    setNumOfRooms([1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '1'})
    
                    break;
                case '1.5':
                    setNumOfRooms([1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '1.5'})
                    break;
                  case '2':
                    setNumOfRooms([2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '2'})
                    break;
                  case '2.5':
                    setNumOfRooms([2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '2.5'})
                  break;
                  case '3':
                    setNumOfRooms([3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '3'})
                  break;
                  case '3.5':
                    setNumOfRooms([3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '3.5'})
                  break;
                  case '4':
                    setNumOfRooms([4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '4'})
                  break;
                  case '4.5':
                    setNumOfRooms([4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '4.5'})
                  break;
                  case '5':
                    setNumOfRooms([5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '5'})
                  break;
                  case '5.5':
                    setNumOfRooms([5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '5.5'})
                  break;
                  case '6':
                    setNumOfRooms([6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '6'})
                  break;
                  case '6.5':
                    setNumOfRooms([6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '6.5'})
                  break;
                  case '7':
                    setNumOfRooms([7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '7'})
                  break;
                  case '7.5':
                    setNumOfRooms([7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '7.5'})
                  break;
                  case '8':
                    setNumOfRooms([8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '8'})
                  break;
                  case '8.5':
                    setNumOfRooms([8.5,9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '8.5'})
                  break;
                  case '9':
                    setNumOfRooms([9,9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '9'})
                  break;
                  case '9.5':
                    setNumOfRooms([9.5,10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '9.5'})
                  break;
                  case '10':
                    setNumOfRooms([10,10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '10'})
                  break;
                  case '10.5':
                    setNumOfRooms([10.5,11,11.5,12])
                    setValues({...values, min_num_of_rooms: '10.5'})
                  break;
                  case '11':
                    setNumOfRooms([11,11.5,12])
                    setValues({...values, min_num_of_rooms: '11'})
                  break;
                  case '11.5':
                    setNumOfRooms([11.5,12])
                    setValues({...values, min_num_of_rooms: '11.5'})
                  break;
                  case '12':
                    setNumOfRooms([12])
                    setValues({...values, min_num_of_rooms: '12'})
                  break;
                default:
                    // setNumOfRooms([1,1.5,2,2.5,3,3.5,4,4.5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
              }
           }
           const changeFloorSelection=(e)=>{
            let num=document.getElementById('selectFloors').value
               console.log(num)
               switch(num) {
                case '1':
                    setNumOfFloors(['פרטר/מרתף',1,2,3,4,5,6,7,8,9,10,11,12,13,14])
                    setValues({...values, min_num_of_floors: '1'})
                  break;
                  case 'הכל':
                    setNumOfFloors([1,2,3,4,5,6,7,8,9,10,11,12,13,14])
                    setValues({...values, min_num_of_floors: '1'})
    
                    break;
                  case '2':
                    setNumOfFloors([2,3,4,5,6,7,8,9,10,11,12,13,14])
                    setValues({...values, min_num_of_floors: '2'})
                    break;
                  case '3':
                    setNumOfFloors([3,4,5,6,7,8,9,10,11,12,13,14])
                    setValues({...values, min_num_of_floors: '3'})
                  break;
                
                  case '4':
                    setNumOfFloors([4,5,6,7,8,9,10,11,12,13,14])
                    setValues({...values, min_num_of_floors: '4'})
                  break;
                  case '5':
                    setNumOfFloors([5,6,7,8,9,10,11,12,13,14])
                    setValues({...values, min_num_of_floors: '5'})
                  break;
                  case '6':
                    setNumOfFloors([6,7,8,9,10,11,12,13,14])
                    setValues({...values, min_num_of_floors: '6'})
                  break;
                  
                  case '7':
                    setNumOfFloors([7,8,9,10,11,12,13,14])
                    setValues({...values, min_num_of_floors: '7'})
                  break;
                  
                  case '8':
                    setNumOfFloors([8,9,10,11,12,13,14])
                    setValues({...values, min_num_of_floors: '8'})
                  break;
                  
                  case '9':
                    setNumOfFloors([9,10,11,12,13,14])
                    setValues({...values, min_num_of_floors: '9'})
                  break;
                  
                  case '10':
                    setNumOfFloors([10,11,12,13,14])
                    setValues({...values, min_num_of_floors: '10'})
                  break;
                  
                  case '11':
                    setNumOfFloors([11,12,13,14])
                    setValues({...values, min_num_of_floors: '11'})
                  break;
                  
                  case '12':
                    setNumOfFloors([12,13,14])
                    setValues({...values, min_num_of_floors: '12'})
                  break;
                  case '13':
                    setNumOfFloors([13,14])
                    setValues({...values, min_num_of_floors: '13'})
                  break;
                  case '14':
                    setNumOfFloors([14])
                    setValues({...values, min_num_of_floors: '14'})
                  break;
                default:
                    // setNumOfRooms([1,1.5,2,2.5,3,3.5,4,4.5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
              }
           }

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        // init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        // loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };
    const openDropDown=()=>{
setDropDown(!dropDown)
    }


// document.getElementById('graphlabel2').style.width = style.getPropertyValue("height");

    return (
<div className={'parent_lineSearch_upper'} style={{width:'90vw',margin:'0 auto',textAlign:'right'}}>
<div class="parent_lineSearch">
<div class="div1_lineSearch"><input placeholder={'לדוגמה:תל אביב יפו'} className={'adress_input_search_bar'} /></div>
<div class="div2_lineSearch">
  <p onClick={openDropDown} style={{fontSize:'.875rem',color:'#ccc'}} id={'dropDown_father'} className={'adress_input_search_bar'}><span className={'down_arrow'} style={{float:'left'}} >&#709;</span> בחרו סוגי נכסים</p>
  {dropDown&&
  <div id={'new_dropDown'} dir='rtl' className={'new_dropDown'}>
    <div className={'dropDown_field'}>
    <input type='checkbox' />
    <span className={'dropDown_checkbox_title'}>כל סוגי הנכסים</span>
    </div>

    <div className={'dropDown_field'}>
    <input type='checkbox' />
    <span className={'dropDown_checkbox_title'}>דירות</span>
    <br/>
    <span className={'down_arrow'} style={{fontSize:'larger'}} >&#709;</span>
    </div>

    <div className={'dropDown_field'}>
    <input type='checkbox' />
    <span className={'dropDown_checkbox_title'}>בתים</span>  
    <br/>
    <span className={'down_arrow'} style={{fontSize:'larger'}} >&#709;</span></div>

    <div className={'dropDown_field'}>
    <input type='checkbox' />
    <span className={'dropDown_checkbox_title'}>סוגים נוספים</span>
    <br/>
    <span className={'down_arrow'} style={{fontSize:'larger'}} >&#709;</span>
    </div>
    <hr/>
    <p className={'dropDown_submit'}>בחירה</p>
    </div>}
  </div>
<div class="div3_lineSearch">c </div>
<div class="div4_lineSearch">d </div>
<div class="div5_lineSearch">e </div>
<div class="div6_lineSearch">f </div>
<div class="div7_lineSearch"><p className={'searchBar_input_title'}>חפשו אזור, עיר, שכונה או רחוב</p></div>
<div class="div8_lineSearch"><p className={'searchBar_input_title'}>סוג נכס</p></div>
<div class="div9_lineSearch"><p className={'searchBar_input_title'}>חדרים</p></div>
<div class="div10_lineSearch"></div>
<div class="div11_lineSearch"><p className={'searchBar_input_title'}>מחיר</p></div>
<div class="div12_lineSearch"></div>
<div class="div13_lineSearch"><p className={'which_property_title'}>?איזה נכס <span className={'which_property_title_orange'} >למכירה</span> תרצו לחפש</p></div>
<div class="div14_lineSearch"><p className={'note_email_title'}>קבלו התראות במייל על החיפוש <span>&#x1F514;</span></p> </div>
</div>
</div>

             );
};

export default LineSearch;
