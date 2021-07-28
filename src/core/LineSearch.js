import React, { useState, useEffect,useContext } from "react";
import { API } from "../config";
import SearchContext from "../context/search-context";
import { getFilteredProducts } from "./apiCore";
import { prices } from "./fixedPrices";
import '../searchForm.css'
import './../LineSearch.css'
import { BsSearch } from 'react-icons/bs';
import { BsXCircle,BsQuestionCircle,BsPlusCircle } from 'react-icons/bs';
import { useHistory } from "react-router-dom";


const LineSearch = () => {
  const { searchParameters,setSearchParameters } = useContext(SearchContext);
  let history = useHistory();
  const [dropDown,setDropDown]=useState(false)
  const [dropDownRooms,setdropDownRooms]=useState(false)
  const [dropDownAdvanced,setDropDownAdvanced]=useState(false)
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [numOfRooms,setNumOfRooms]= useState([1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
    const [numOfFloors,setNumOfFloors]= useState(['פרטר/מרתף',1,2,3,4,5,6,7,8,9,10,11,12,13,14])
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

// const {
//     entery_date,
//     exclusively,
//     name,
//     description,
//     price,
//     min_price,
//     max_price,
//     min_mr,
//     max_mr,
//     category,
//     shipping,
//     quantity,
//     photo,
//     loading,
//     createdProduct,
//     redirectToProfile,
//     formData,
//     property_type1,
//     property_type2,
//     property_type3,
//     property_condition,
//     property_address_city,
//     property_address_street,
//     property_address_num,
//     property_floor,
//     property_total_floors,
//     num_of_rooms,
//     min_num_of_rooms,
//     max_num_of_rooms,
//     min_num_of_floors,
//     max_num_of_floors,
//     is_on_pillars,
//     num_of_parking,
//     num_of_balcony,
//     balcony,
//     build_mr,
//     build_mr_total,
//     contact_name,
//     contact_number_start,
//     contact_number,
//     mail,
//     Route,
//     air_condition,
//     shelter,
//     garage,
//     pandor,
//     furniture,
//     handicapped,
//     elevator,
//     tadiran,
//     unit,
//     renovated,
//     kosher,
//     boiler,
//     bars
// }=values
const submitSearch=()=>{
    fetch(`${API}/products/by/Filter`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({...searchParameters})
})
.then(function(res){ res.json().then(body =>  {
  history.push("/shop", { body});
  window.location.reload(false);
   }); })
.catch(function(res){ console.log(res) })
}

const date = (event)   => {
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
      setSearchParameters({ ...searchParameters, entery_date: today }); 
      document.getElementById('entery_date').disabled = true;
    }
    else{
      document.getElementById('entery_date').disabled = false;

    }
};

const changeMaxRooms=(e)=>{
  setValues({...values, ['max_rooms']: e.target.value})
  setSearchParameters({...searchParameters,['max_rooms']: e.target.value})
  console.log(values)
}

const changeMaxfloors=(e)=>{
  setValues({...values, ['max_num_of_floors']: e.target.value})
  setSearchParameters({...searchParameters, ['max_num_of_floors']: e.target.value})
  console.log(values)
}

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
    setSearchParameters({...searchParameters, [e.target.name]: !answer})
    setNumberOfRadioSelected(countRadiosCheck)
    
}
// const advancedSearchFunc=(e)=>{    
//     if(advancedSearch===false)
//     {
//         setAdvancedSearch(true)
//         document.getElementById('plusButton').innerHTML='-'
//     }else{
//         setAdvancedSearch(false)
//         document.getElementById('plusButton').innerHTML='+'

//     }
    
// }


// const roomsQuickButtonFunc=(e)=>{
//     const minRooms=document.getElementById("selectRooms")
//     const maxRooms=document.getElementById("selectRooms2")
// switch (e.target.value) {
//     case '1':
//         setNumOfRooms([2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
//         minRooms.selectedIndex  = 3;
//         maxRooms.selectedIndex  = 3;
//         setValues({...values, min_num_of_rooms: '2',max_num_of_rooms: '3' })
        
//         break;
//         case '2':
//         setNumOfRooms([3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
//         minRooms.selectedIndex  = 5;
//         maxRooms.selectedIndex  = 3;
//         setValues({...values, min_num_of_rooms: '3',max_num_of_rooms: '4' })
        
//         break;
//         case '3':
//             setNumOfRooms([4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
//             minRooms.selectedIndex  = 7;
//         maxRooms.selectedIndex  = 3;
//         setValues({...values, min_num_of_rooms: '4',max_num_of_rooms: '5' })

//         break;
//         case '4':
//             setNumOfRooms([5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
//             minRooms.selectedIndex  = 9;
//         maxRooms.selectedIndex  = 3;
//         setValues({...values, min_num_of_rooms: '5',max_num_of_rooms: '6' })

//         break;
//     default:
//         break;
// }
// }
// const priceQuickButtonFunc=(e)=>{
//     const minPrice=document.getElementById("min_price")
//     const maxPrice=document.getElementById("max_price")
// switch (e.target.value) {
//     case '1':
//         setValues({...values, min_price: '0',max_price: '1,500,000' })
//         minPrice.value = "0";
//         maxPrice.value = "1,500,000";
//         break;
//         case '2':
//             setValues({...values, min_price: '1,500,000',max_price: '2,000,000' })
//             minPrice.value = "1,500,000";
//             maxPrice.value = "2,000,000";
//             break;
//         case '3':
//             setValues({...values, min_price: '2,000,000',max_price: '3,500,000' })
//             minPrice.value = "2,000,000";
//             maxPrice.value = "3,500,000";
//             break;
//         case '4':
//             setValues({...values, min_price: '3,500,000',max_price: '5,000,000' })
//             minPrice.value = "3,500,000";
//             maxPrice.value = "5,000,000";
//             break;
//     default:
//         break;
// }
// }
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
        // if(event.target.name==='property_type1')
        // {
        //     console.log(values)
        //     document.getElementById('apartmentsImg').classList.contains('image_style_orange')?
        //     setValues({...values, [event.target.name]: event.target.value }):
        //     setValues({...values, [event.target.name]: '' });
        //     // context 
        //     document.getElementById('apartmentsImg').classList.contains('image_style_orange')?
        //     setSearchParameters({...searchParameters, [event.target.name]: event.target.value }):
        //     setSearchParameters({...searchParameters, [event.target.name]: '' });
        //     return 
        // }
        // if(event.target.name==='property_type2')
        // {
        //     console.log(values)
        //     document.getElementById('housesImg').classList.contains('image_style_orange')?
        //     setValues({...values, [event.target.name]: event.target.value }):
        //     setValues({...values, [event.target.name]: '' });
        //   // context
        //   document.getElementById('housesImg').classList.contains('image_style_orange')?
        //   setSearchParameters({...searchParameters, [event.target.name]: event.target.value }):
        //   setSearchParameters({...searchParameters, [event.target.name]: '' });
        //     return 
        // }
        // if(event.target.name==='property_type3')
        // {
        //     console.log(values)
        //     document.getElementById('extraImg').classList.contains('image_style_orange')?
        //     setValues({...values, [event.target.name]: event.target.value }):
        //     setValues({...values, [event.target.name]: '' });
        //     // 
        //     document.getElementById('extraImg').classList.contains('image_style_orange')?
        //     searchParameters({...searchParameters, [event.target.name]: event.target.value }):
        //     searchParameters({...searchParameters, [event.target.name]: '' });
        //     return 
        // }
        
        // setValues({...values, [event.target.name]: event.target.value });
        setSearchParameters({...searchParameters, [event.target.name]: event.target.value }); 

        console.log(searchParameters,'search parameters from context') 
        console.log(values,'search parameters from value') 
    } 

    const loadFilteredResults = newFilters => {
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
    // changing room drop down so it will be from ''min num of rooms chosen'' to the end
    const changeRoomSelection=(e)=>{
            let num=document.getElementById('selectRooms').value
              //  console.log(numOfRooms)
              //  console.log(num)
              //  console.log({...values})
               switch(num) {
                case '1':
                    setNumOfRooms([1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '1'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '1'})
                  break;
                  case 'הכל':
                    setNumOfRooms([1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '1'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '1'})
                    break;
                case '1.5':
                    setNumOfRooms([1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '1.5'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '1.5'})
                    break;
                  case '2':
                    setNumOfRooms([2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '2'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '2'})
                    break;
                  case '2.5':
                    setNumOfRooms([2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '2.5'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '2.5'})
                    break;
                  case '3':
                    setNumOfRooms([3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '3'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '3'})
                  break;
                  case '3.5':
                    setNumOfRooms([3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '3.5'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '3.5'})
                  break;
                  case '4':
                    setNumOfRooms([4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '4'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '4'})
                  break;
                  case '4.5':
                    setNumOfRooms([4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '4.5'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '4.5'})
                  break;
                  case '5':
                    setNumOfRooms([5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '5'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '5'})
                  break;
                  case '5.5':
                    setNumOfRooms([5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '5.5'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '5.5'})
                  break;
                  case '6':
                    setNumOfRooms([6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '6'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '6'})
                  break;
                  case '6.5':
                    setNumOfRooms([6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '6.5'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '6.5'})
                  break;
                  case '7':
                    setNumOfRooms([7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '7'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '7'})
                  break;
                  case '7.5':
                    setNumOfRooms([7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '7.5'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '7.5'})
                  break;
                  case '8':
                    setNumOfRooms([8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '8'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '8'})
                  break;
                  case '8.5':
                    setNumOfRooms([8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '8.5'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '8.5'})
                  break;
                  case '9':
                    setNumOfRooms([9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '9'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '9'})
                  break;
                  case '9.5':
                    setNumOfRooms([9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '9.5'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '9.5'})
                  break;
                  case '10':
                    setNumOfRooms([10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '10'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '10'})
                  break;
                  case '10.5':
                    setNumOfRooms([10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '10.5'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '10.5'})
                  break;
                  case '11':
                    setNumOfRooms([11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '11'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '11'})
                  break;
                  case '11.5':
                    setNumOfRooms([11.5,12])
                    // setValues({...values, min_num_of_rooms: '11.5'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '11.5'})
                  break;
                  case '12':
                    setNumOfRooms([12])
                    // setValues({...values, min_num_of_rooms: '12'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '12'})
                  break;
                default:
                    // setNumOfRooms([1,1.5,2,2.5,3,3.5,4,4.5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
              }
           }
           const changeFloorSelection=(e)=>{
            let num=document.getElementById('selectFloors').value
              //  console.log({...values})
               switch(num) {
                case '1':
                    setNumOfFloors(['פרטר/מרתף',1,2,3,4,5,6,7,8,9,10,11,12,13,14])
                    // setValues({...values, min_num_of_floors: '1'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '1'})
                  break;
                  case 'הכל':
                    setNumOfFloors(['פרטר/מרתף',1,2,3,4,5,6,7,8,9,10,11,12,13,14])
                    // setValues({...values, min_num_of_floors: '1'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '1'})    
                    break;
                  case '2':
                    setNumOfFloors([2,3,4,5,6,7,8,9,10,11,12,13,14])
                    // setValues({...values, min_num_of_floors: '2'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '2'})
                    break;
                  case '3':
                    setNumOfFloors([3,4,5,6,7,8,9,10,11,12,13,14])
                    // setValues({...values, min_num_of_floors: '3'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '3'})
                  break;
                  case '4':
                    setNumOfFloors([4,5,6,7,8,9,10,11,12,13,14])
                    // setValues({...values, min_num_of_floors: '4'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '4'})
                  break;
                  case '5':
                    setNumOfFloors([5,6,7,8,9,10,11,12,13,14])
                    // setValues({...values, min_num_of_floors: '5'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '5'})
                  break;
                  case '6':
                    setNumOfFloors([6,7,8,9,10,11,12,13,14])
                    // setValues({...values, min_num_of_floors: '6'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '6'})
                  break;
                  
                  case '7':
                    setNumOfFloors([7,8,9,10,11,12,13,14])
                    // setValues({...values, min_num_of_floors: '7'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '7'})
                  break;
                  case '8':
                    setNumOfFloors([8,9,10,11,12,13,14])
                    // setValues({...values, min_num_of_floors: '8'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '8'})
                  break;
                  case '9':
                    setNumOfFloors([9,10,11,12,13,14])
                    // setValues({...values, min_num_of_floors: '9'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '9'})
                  break;
                  case '10':
                    setNumOfFloors([10,11,12,13,14])
                    // setValues({...values, min_num_of_floors: '10'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '10'})
                  break;
                  case '11':
                    setNumOfFloors([11,12,13,14])
                    // setValues({...values, min_num_of_floors: '11'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '11'})
                  break;
                  case '12':
                    setNumOfFloors([12,13,14])
                    // setValues({...values, min_num_of_floors: '12'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '12'})
                  break;
                  case '13':
                    setNumOfFloors([13,14])
                    // setValues({...values, min_num_of_floors: '13'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '13'})
                  break;
                  case '14':
                    setNumOfFloors([14])
                    // setValues({...values, min_num_of_floors: '14'})
                    setSearchParameters({...searchParameters,min_num_of_floors: '14'})
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

    // const handleFilters = (filters, filterBy) => {
    //     // console.log("SHOP", filters, filterBy);
    //     const newFilters = { ...myFilters };
    //     newFilters.filters[filterBy] = filters;

    //     if (filterBy === "price") {
    //         let priceValues = handlePrice(filters);
    //         newFilters.filters[filterBy] = priceValues;
    //     }
    //     // loadFilteredResults(myFilters.filters);
    //     setMyFilters(newFilters);
    // };

    // const handlePrice = value => {
    //     const data = prices;
    //     let array = [];

    //     for (let key in data) {
    //         if (data[key]._id === parseInt(value)) {
    //             array = data[key].array;
    //         }
    //     }
    //     return array;
    // };

    const openDropDown=()=>{
setDropDown(!dropDown)
!dropDown?
document.getElementById('dropDown_arrow').innerHTML=('&#708;'):
document.getElementById('dropDown_arrow').innerHTML=('&#709;')
    }

    const openDropDownRooms=()=>{
      setdropDownRooms(!dropDownRooms)
      !dropDownRooms?
      document.getElementById('dropDown_arrow_rooms').innerHTML=('&#708;'):
      document.getElementById('dropDown_arrow_rooms').innerHTML=('&#709;')
          }

      const openAdvancedSearch=()=>{
          setDropDownAdvanced(!dropDownAdvanced)
          if(!dropDownAdvanced){
            document.getElementById('circle_icon').classList=('display_none')
            document.getElementById('circle_icon_x').classList=('')
          }else{
            document.getElementById('circle_icon').classList=('')
            document.getElementById('circle_icon_x').classList=('display_none')
          }
                }

//-----------------------------------------------return---------------------------------------------------
    return (
<div className={'parent_lineSearch_upper'} style={{width:'90vw',margin:'0 auto',textAlign:'right'}}>
  <p>{searchParameters.max_rooms}</p>
<div class="parent_lineSearch">
<div class="div1_lineSearch"><input placeholder={'לדוגמה:תל אביב יפו'} className={'adress_input_search_bar'} /></div>
<div class="div2_lineSearch">
  <p onClick={openDropDown} style={{fontSize:'.875rem',color:'#ccc'}} id={'dropDown_father'} className={'adress_input_search_bar'}><span id={'dropDown_arrow'} className={'down_arrow'} style={{float:'left'}} >&#709;</span> בחרו סוגי נכסים</p>
  {dropDown&&
  <div id={'new_dropDown'} dir='rtl' className={'new_dropDown'}>
    <div className={'dropDown_field'}>
    <input type='checkbox' />
    <span className={'dropDown_checkbox_title'}>כל סוגי הנכסים</span>
    </div>
    <div className={'dropDown_field'}>
    
    <input  type='checkbox' />
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
    </div>    
    }
    
  </div>
  <div class="div3_lineSearch">  <p onClick={openDropDownRooms} style={{fontSize:'.875rem',color:'#ccc'}} id={'dropDown_father'} className={'adress_input_search_bar'}><span id={'dropDown_arrow_rooms'} className={'down_arrow'} style={{float:'left'}} >&#709;</span>חדרים</p>
  {dropDownRooms&&
  <div  dir='rtl' className={'new_dropDownRooms'}>
    <span >
    <select id={'selectRooms'} onChange={changeRoomSelection} className={'new_dropDownRooms_select'}>
      <option hidden>מ -  </option>
      <option value='1' >1</option>
      <option value='1.5'>1.5</option>
      <option value='2'>2</option>
      <option value='2.5'>2.5</option>
      <option value='3'>3</option>
      <option value='3.5'>3.5</option>
      <option value='4'>4</option>
      <option value='4.5'>4.5</option>
      <option value='5'>5</option>
      <option value='5.5'>5.5</option>
      <option value='6'>6</option>
      <option value='6.5'>6.5</option>
      <option value='7'>7</option>
      <option value='7.5'>7.5</option>
    </select>
    </span>
    
    <span >
    <select onChange={changeMaxRooms} className={'new_dropDownRooms_select'}>
      <option hidden>עד - </option>
      {numOfRooms.map(a=><option>{a}</option>)}
    </select>
    </span>
    </div>}</div>
<div class="div4_lineSearch">
  <div className={'price_input_search_bar'}>
  <input onChange={inputChangeHandler} name='max_price' className={'price_input_search_bar_field'} placeholder={'עד מחיר'}/> 
  <input onChange={inputChangeHandler} name='min_price' className={'price_input_search_bar_field'} placeholder={'ממחיר'}/> 
  </div>
</div>
<div class="div5_lineSearch">
  <div onClick={openAdvancedSearch} className={'adress_input_search_bar advence_search'}><span><span>חיפוש מתקדם</span> <span id={'circle_icon'} style={{fontSize:'.8rem'}}><BsPlusCircle/>
 </span> <span className={'display_none'} id={'circle_icon_x'} style={{fontSize:'.8rem'}} ><BsXCircle /> </span> </span></div>
   </div>
<div class="div6_lineSearch">
<div className={'adress_input_search_bar advence_search_submit'}><span ><span onClick={submitSearch}>חיפוש</span> <span style={{fontSize:'.8rem'}} ><BsSearch /> </span></span></div>
   </div>
<div class="div7_lineSearch"><p className={'searchBar_input_title'}>חפשו אזור, עיר, שכונה או רחוב</p></div>
<div class="div8_lineSearch"><p className={'searchBar_input_title'}>סוג נכס</p></div>
<div class="div9_lineSearch"><p className={'searchBar_input_title'}>חדרים</p></div>
<div class="div10_lineSearch"><p className={'searchBar_input_title'}>מחיר</p></div>
<div class="div11_lineSearch"></div>
<div class="div12_lineSearch"></div>
<div class="div13_lineSearch"><p className={'which_property_title'}>?איזה נכס <span className={'which_property_title_orange'} >למכירה</span> תרצו לחפש</p></div>
<div class="div14_lineSearch"><p className={'note_email_title'}>קבלו התראות במייל על החיפוש <span>&#x1F514;</span></p> </div>
</div>
{
      dropDownAdvanced&&
      <div className={'advanced_drop_down'}>
        <div class="parent_advanced_line_search">
<div class="div1_advanced_line_search advanced_line_search_title "> מאפייני דירה</div>
<div class="div2_advanced_line_search"><input type='checkbox' id={'pandor'} name={'pandor'} onChange={radiosChange} /> </div>
<div class="div3_advanced_line_search advanced_line_search_text">דלתות פנדור</div>
<div class="div4_advanced_line_search"><input type='checkbox' id={'parking'} name={'parking'} onChange={radiosChange} /></div>
<div class="div5_advanced_line_search advanced_line_search_text">חניה</div>
<div class="div6_advanced_line_search"><input type='checkbox' id={'elevator'} name={'elevator'} onChange={radiosChange} /></div>
<div class="div7_advanced_line_search advanced_line_search_text">מעלית</div>
<div class="div8_advanced_line_search"><input type='checkbox' id={'air_condition'} name={'air_condition'} onChange={radiosChange} /></div>
<div class="div9_advanced_line_search advanced_line_search_text">מיזוג</div>
<div class="div10_advanced_line_search"><input type='checkbox' id={'balcony'} name={'balcony'} onChange={radiosChange} /></div>
<div class="div11_advanced_line_search advanced_line_search_text">מרפסת</div>
<div class="div12_advanced_line_search"><input type='checkbox' id={'shelter'} name={'shelter'} onChange={radiosChange} /></div>
<div class="div13_advanced_line_search advanced_line_search_text">ממ"ד</div>
<div class="div14_advanced_line_search"><input type='checkbox' id={'bars'} name={'bars'} onChange={radiosChange} /></div>
<div class="div15_advanced_line_search advanced_line_search_text">סורגים</div>
<div class="div16_advanced_line_search"><input type='checkbox' id={'garage'} name={'garage'} onChange={radiosChange} /></div>
<div class="div17_advanced_line_search advanced_line_search_text">מחסן</div>
<div class="div18_advanced_line_search"><input type='checkbox' id={'handicapped'} name={'handicapped'} onChange={radiosChange} /></div>
<div class="div19_advanced_line_search advanced_line_search_text">גישה לנכים</div>
<div class="div20_advanced_line_search"><input type='checkbox' id={'renovated'} name={'renovated'} onChange={radiosChange} /></div>
<div class="div21_advanced_line_search advanced_line_search_text">משופצת</div>
<div class="div22_advanced_line_search"><input type='checkbox' id={'furniture'} name={'furniture'} onChange={radiosChange} /></div>
<div class="div23_advanced_line_search advanced_line_search_text">מרוהטת</div>
<div class="div24_advanced_line_search"><input type='checkbox' id={'none'} name={'none'} onChange={radiosChange} /></div>
<div class="div25_advanced_line_search advanced_line_search_text">בבלעדיות</div>
<div class="div26_advanced_line_search"></div>
<div class="div27_advanced_line_search "></div>
<div class="div28_advanced_line_search"></div>
<div class="div29_advanced_line_search"></div>
<div class="div30_advanced_line_search"></div>
<div class="div31_advanced_line_search"></div>
</div>
<hr/>

<div class="parent_advanced_level2">
<div class="div1_advanced_level2 advanced_level2_title">קומה</div>
<div class="div3_advanced_level2 advanced_level2_title">תאריך כניסה</div>
<div class="div2_advanced_level2 advanced_level2_title">גודל דירה (במ"ר)</div>
<div class="div4_advanced_level2 advanced_level2_input"> 
<span >
<select className={'changeFloorSelection1'} id={'selectFloors'} onChange={changeFloorSelection} >
      <option hidden>מ -  </option>
      <option value='1' >1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
      <option value='5'>5</option>
      <option value='6'>6</option>
      <option value='7'>7</option>
      <option value='8'>8</option>
      <option value='9'>9</option>
      <option value='10'>10</option>
      <option value='11'>11</option>
      <option value='12'>12</option>
      <option value='13'>13</option>
      <option value='14'>14</option>
    </select>
  
</span>
</div>
<div class="div5_advanced_level2 advanced_level2_input">
<span >
    <select className={'changeFloorSelection1'} onChange={changeMaxfloors} >
      <option hidden>עד - </option>
      {numOfFloors.map(a=><option>{a}</option>)}
    </select>
    </span>
</div>
<div class="div6_advanced_level2 advanced_level2_input"><input name={'min_mr'} onChange={inputChangeHandler} placeholder={'מ - '} className={'changeFloorSelection1'} style={{textAlign:'right'}}/> </div>
<div class="div7_advanced_level2 advanced_level2_input"><input name={'max_mr'} onChange={inputChangeHandler} placeholder={'עד - '} className={'changeFloorSelection1'} style={{textAlign:'right'}}/></div>
<div class="div8_advanced_level2 advanced_level2_input"><input type={'date'} name={'entry_date'} id={'entery_date'} onChange={inputChangeHandler} className={'changeFloorSelection1'} style={{textAlign:'right'}}/></div>
<div class="div9_advanced_level2 advanced_level2_input" ></div>
<div class="div10_advanced_level2 advanced_level2_input" style={{width:'200%'}}><span className={'title_enter_now'}>כניסה מיידית</span><input onClick={date} className={'checkbox_enter_now'} type={'checkbox'} /></div>
</div>
<hr/>
<div class="parent_advanced_level3">
<div class="div1_advanced_level3"><span>חיפוש חופשי</span></div>
<div class="div2_advanced_level3"><input style={{width:'92%'}}/></div>
<div class="div3_advanced_level3"><BsQuestionCircle style={{fontSize:'12px'}} /> <span>הצגת מושבים וקיבוצים בלבד</span>  <input type={'checkbox'}/></div>
<div class="div4_advanced_level3"></div>
</div>
<hr/>
<div className={'search_submit_section'}>
  <p onClick={submitSearch}  className={'submit_button'}>חיפוש</p>
  <span className={'clear_button'}>נקה</span>
</div>
        </div>
    }
</div>

             );
};

export default LineSearch;
