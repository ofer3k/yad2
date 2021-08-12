import React, { useState, useEffect,useContext } from "react";
import { useHistory } from "react-router-dom";
import Layout from "./Layout";
import SearchContext2 from "../context/search-context2";
import {submitSearchControl, submitSearchControlScroll} from './../controller/searchControl';
import { Container, Row, Col } from 'reactstrap';
import { getFilteredProducts } from "./apiCore";
import { prices } from "./fixedPrices";
import '../css/searchForm.css'
// photos
import extra from '../imgs/extra.png';
import apartments from '../imgs/apartments.png';
import houses from '../imgs/houses.png';
import orangeExtra from '../imgs/orangeExtra.png';
import orangeApartments from '../imgs/orangeApartments.png';
import orangeHouses from '../imgs/orangeHouses.png'; 

const ShopUpgrade = () => {
  const {searchParameters,setSearchParameters,search,dispatch} = useContext(SearchContext2);
  console.log(search,'search')
  let history = useHistory();
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [numOfRooms,setNumOfRooms]= useState([1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
    const [numOfFloors,setNumOfFloors]= useState(['פרטר/מרתף',1,2,3,4,5,6,7,8,9,10,11,12,13,14])
    // const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [advancedSearch,setAdvancedSearch]= useState(false)
    const [numberOfRadioSelected,setNumberOfRadioSelected]=useState(0)
    let countRadiosCheck=numberOfRadioSelected;


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
      setSearchParameters({ ...searchParameters, entery_date: today }); 
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

    dispatch({type:'change_field',name:e.target.name,value:!answer})    
    setSearchParameters({...searchParameters, [e.target.name]: !answer})
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
        setSearchParameters({...searchParameters, min_num_of_rooms: '2',max_num_of_rooms: '3' })
        
        break;
        case '2':
        setNumOfRooms([3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
        minRooms.selectedIndex  = 5;
        maxRooms.selectedIndex  = 3;
        setSearchParameters({...searchParameters, min_num_of_rooms: '3',max_num_of_rooms: '4' })
        
        break;
        case '3':
            setNumOfRooms([4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
            minRooms.selectedIndex  = 7;
        maxRooms.selectedIndex  = 3;
        setSearchParameters({...searchParameters, min_num_of_rooms: '4',max_num_of_rooms: '5' })

        break;
        case '4':
            setNumOfRooms([5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
            minRooms.selectedIndex  = 9;
        maxRooms.selectedIndex  = 3;
        setSearchParameters({...searchParameters, min_num_of_rooms: '5',max_num_of_rooms: '6' })
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
      setSearchParameters({...searchParameters, min_price: '0',max_price: '1500000' })
        minPrice.value = "0";
        maxPrice.value = "1,500,000";
        break;
        case '2':
          setSearchParameters({...searchParameters, min_price: '1500000',max_price: '2000000' })
            minPrice.value = "1,500,000";
            maxPrice.value = "2,000,000";
            break;
        case '3':
          setSearchParameters({...searchParameters, min_price: '2000000',max_price: '3500000' })
            minPrice.value = "2,000,000";
            maxPrice.value = "3,500,000";
            break;
        case '4':
            setSearchParameters({...searchParameters, min_price: '3500000',max_price: '5000000' })
            minPrice.value = "3,500,000";
            maxPrice.value = "5,000,000";
            break;
    default:
        break;
}
}
    
    function inputChangeHandler(event) {
        if(event.target.name==='property_type1')
        {
            document.getElementById('apartmentsImg').classList.contains('image_style_orange')?
            setSearchParameters({...searchParameters, [event.target.name]: event.target.value }):
            setSearchParameters({...searchParameters, [event.target.name]: '' });
            return 
        }

        if(event.target.name==='property_type2')
        {
            document.getElementById('housesImg').classList.contains('image_style_orange')?
            setSearchParameters({...searchParameters, [event.target.name]: event.target.value }):
            setSearchParameters({...searchParameters, [event.target.name]: '' });
            return 
        }
        if(event.target.name==='property_type3')
        {

            document.getElementById('extraImg').classList.contains('image_style_orange')?
            // setSearchParameters({...searchParameters, [event.target.name]: event.target.value })
        dispatch({type:'change_field',name:event.target.name,value:event.target.value})    
            :
        dispatch({type:'change_field',name:event.target.name,value:''})    
            // setSearchParameters({...searchParameters, [event.target.name]: '' });
            return 
        }
        dispatch({type:'change_field',name:event.target.name,value:event.target.value})
        setSearchParameters({...searchParameters, [event.target.name]: event.target.value }); 
        console.log(searchParameters,' searchParameters searchParameters') 
    } 

    // const loadFilteredResults = newFilters => {
    //     getFilteredProducts(skip, limit, newFilters).then(data => {
    //         if (data.error) {
    //             setError(data.error);
    //         } else {
    //             setFilteredResults(data.data);
    //             setSize(data.size);
    //             setSkip(0);
    //         }
    //     });
    // };
    const changeRoomSelection=(e)=>{
            let num=document.getElementById('selectRooms').value
               console.log(numOfRooms)
               console.log(num)
               switch(num) {
                case '1':
                    setNumOfRooms([1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '1'})
                  break;
                  case 'הכל':
                    setNumOfRooms([1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '1'})
                    break;
                case '1.5':
                    setNumOfRooms([1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '1.5'})
                    break;
                  case '2':
                    setNumOfRooms([2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '2'})
                    break;
                  case '2.5':
                    setNumOfRooms([2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '2.5'})
                  break;
                  case '3':
                    setNumOfRooms([3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '3'})
                  break;
                  case '3.5':
                    setNumOfRooms([3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '3.5'})
                  break;
                  case '4':
                    setNumOfRooms([4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '4'})
                  break;
                  case '4.5':
                    setNumOfRooms([4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '4.5'})
                  break;
                  case '5':
                    setNumOfRooms([5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '5'})
                  break;
                  case '5.5':
                    setNumOfRooms([5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '5.5'})
                  break;
                  case '6':
                    setNumOfRooms([6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '6'})
                  break;
                  case '6.5':
                    setNumOfRooms([6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '6.5'})
                  break;
                  case '7':
                    setNumOfRooms([7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '7'})
                  break;
                  case '7.5':
                    setNumOfRooms([7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '7.5'})
                  break;
                  case '8':
                    setNumOfRooms([8,8.5,9,9.5,10,10.5,11,11.5,12])
                    // setValues({...values, min_num_of_rooms: '8'})
                    setSearchParameters({...searchParameters, min_num_of_rooms: '8'})
                  break;
                  case '8.5':
                    setNumOfRooms([8.5,9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '8.5'})
                  break;
                  case '9':
                    setNumOfRooms([9,9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '9'})
                  break;
                  case '9.5':
                    setNumOfRooms([9.5,10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '9.5'})
                  break;
                  case '10':
                    setNumOfRooms([10,10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '10'})
                  break;
                  case '10.5':
                    setNumOfRooms([10.5,11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '10.5'})
                  break;
                  case '11':
                    setNumOfRooms([11,11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '11'})
                  break;
                  case '11.5':
                    setNumOfRooms([11.5,12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '11.5'})
                  break;
                  case '12':
                    setNumOfRooms([12])
                    setSearchParameters({...searchParameters, min_num_of_rooms: '12'})
                  break;
                default:
              }
           }
           const changeFloorSelection=(e)=>{
            let num=document.getElementById('selectFloors').value
               console.log(num)
               switch(num) {
                case '1':
                    setNumOfFloors(['פרטר/מרתף',1,2,3,4,5,6,7,8,9,10,11,12,13,14])
                    setSearchParameters({...searchParameters, min_num_of_floors: '1'})
                  break;
                  case 'הכל':
                    setNumOfFloors([1,2,3,4,5,6,7,8,9,10,11,12,13,14])
                    setSearchParameters({...searchParameters, min_num_of_floors: '1'})
                    break;
                  case '2':
                    setNumOfFloors([2,3,4,5,6,7,8,9,10,11,12,13,14])
                    setSearchParameters({...searchParameters, min_num_of_floors: '2'})
                    break;
                  case '3':
                    setNumOfFloors([3,4,5,6,7,8,9,10,11,12,13,14])
                    setSearchParameters({...searchParameters, min_num_of_floors: '3'})
                  break;
                
                  case '4':
                    setNumOfFloors([4,5,6,7,8,9,10,11,12,13,14])
                    setSearchParameters({...searchParameters, min_num_of_floors: '4'})
                  break;
                  case '5':
                    setNumOfFloors([5,6,7,8,9,10,11,12,13,14])
                    setSearchParameters({...searchParameters, min_num_of_floors: '5'})
                  break;
                  case '6':
                    setNumOfFloors([6,7,8,9,10,11,12,13,14])
                    setSearchParameters({...searchParameters, min_num_of_floors: '6'})
                  break;
                  
                  case '7':
                    setNumOfFloors([7,8,9,10,11,12,13,14])
                    setSearchParameters({...searchParameters, min_num_of_floors: '7'})
                  break;
                  
                  case '8':
                    setNumOfFloors([8,9,10,11,12,13,14])
                    setSearchParameters({...searchParameters, min_num_of_floors: '8'})
                  break;
                  
                  case '9':
                    setNumOfFloors([9,10,11,12,13,14])
                    setSearchParameters({...searchParameters, min_num_of_floors: '9'})
                  break;
                  
                  case '10':
                    setNumOfFloors([10,11,12,13,14])
                    setSearchParameters({...searchParameters, min_num_of_floors: '10'})
                  break;
                  case '11':
                    setNumOfFloors([11,12,13,14])
                    setSearchParameters({...searchParameters, min_num_of_floors: '11'})
                  break;
                  
                  case '12':
                    setNumOfFloors([12,13,14])
                    // setValues({...values, min_num_of_floors: '12'})
                    setSearchParameters({...searchParameters, min_num_of_floors: '12'})
                  break;
                  case '13':
                    setNumOfFloors([13,14])
                    // setValues({...values, min_num_of_floors: '13'})
                    setSearchParameters({...searchParameters, min_num_of_floors: '13'})
                  break;
                  case '14':
                    setNumOfFloors([14])
                    // setValues({...values, min_num_of_floors: '14'})
                    setSearchParameters({...searchParameters, min_num_of_floors: '14'})
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
        // loadFilteredResults(skip, limit, myFilters.filters);
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


    return (
        <Layout
            title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid"
        >

            <div style={{marginTop:'20px'}} className="row">
            <div className={'property_type'}>
<p className={"property_type_title_fullForm"} style={{marginBottom:'0'}} >חפשו אזור עיר או שכונה</p>
    <input type="text" onChange={inputChangeHandler} className={"address_city"} id={"search_input"} placeholder="?איפה נמצא הנכס" />
</div>
            </div>
<hr/>

<p style={{marginRight:'20px'}} className={"property_title1"} >סוג נכס</p>
<div className="row">
<div class="flex-container">
   <div class="flex-items">
   <label>
  <input class={'checkbox_special'} onClick={inputChangeHandler} name='property_type3' id='property_type3' value={['Plots','Assisted living']}  type="checkbox"  />
  <img id={'extraImg'} onClick={()=>{
      if(document.getElementById('extraImg').src===extra)
      {
        document.getElementById('extraImg').src=orangeExtra
        document.getElementById('extraImg').classList='image_style_orange'
      }
      else{
        document.getElementById('extraImg').src=extra
        document.getElementById('extraImg').classList='image_style'

      }
  }}  className={'image_style'} src={extra}/>
</label>
   </div>
   <div class="flex-items">
   <label>
  <input class={'checkbox_special'} onClick={inputChangeHandler} name='property_type2' id='property_type2' value={['Private house','Townhouse','Farm','Auxiliary farm']}   type="checkbox"/>
  <img  id={'housesImg'} onClick={()=>{
      if(document.getElementById('housesImg').src===houses)
      {
        document.getElementById('housesImg').src=orangeHouses
        document.getElementById('housesImg').classList='image_style_orange'
      }
      else{
        document.getElementById('housesImg').src=houses
        document.getElementById('housesImg').classList='image_style'
      }
  } } className={'image_style'} src={houses}/>
</label>
   </div>
   <div class="flex-items"> 
<label>
  <input class={'checkbox_special'}  onClick={inputChangeHandler} name='property_type1' id='property_type1' value={['Apartment','Garden Apartment','roof','Duplex','Vacation Apartment','basement','Triplex','Unit']} type="checkbox"  />
  <img id={'apartmentsImg'} onClick={()=>{
      if(document.getElementById('apartmentsImg').src===apartments)
      {
        document.getElementById('apartmentsImg').src=orangeApartments
        document.getElementById('apartmentsImg').classList='image_style_orange'

      }
      else{
        document.getElementById('apartmentsImg').classList='image_style'
        document.getElementById('apartmentsImg').src=apartments
      }
  } } className={'image_style'} src={apartments}/>
</label>
   </div>
   
</div>    

</div>
<h6 className={'a_title'}>להצגת כל סוגי הנכסים</h6>
<hr/>
<div style={{direction:'rtl',marginRight:'10px'}} className="row">
<div className={'property_type'}>
<p className={"property_type_title_fullForm"} >חדרים</p>

<div class="flex-container1">
   <div class="flex-items1">
   <select name='min_num_of_rooms' className={'roomSelection'} id={'selectRooms'} onChange={changeRoomSelection} >
<option value={1}>הכל</option>
    <option value={1}>1</option>
    <option value={1.5}>1.5</option>
    <option value={2}>2</option>
    <option value={2.5}>2.5</option>
    <option value={3}>3</option>
    <option value={3.5}>3.5</option>
    <option value={4}>4</option>
    <option value={4.5}>4.5</option>
    <option value={5}>5</option>
    <option value={5.5}>5.5</option>
    <option value={6}>6</option>
    <option value={6.5}>6.5</option>
    <option value={7}>7</option>
    <option value={7.5}>7.5</option>
    <option value={8}>8</option>
    <option value={8.5}>8.5</option>
    <option value={9}>9</option>
    <option value={9.5}>9.5</option>
    <option value={10}>10</option>
    <option value={10.5}>10.5</option>
    <option value={11}>11</option>
    <option value={11.5}>11.5</option>
    <option value={12}>12</option>
  </select>
   </div>
   <div style={{marginRight:'auto',width:'2rem',}} class="flex-items1">-</div>
   <div class="flex-items1 ">
   <select name='max_num_of_rooms'  id={'selectRooms2'} onChange={ inputChangeHandler }  className={'roomSelection'} >
   <option value={numOfRooms.length}>הכל</option>
       {
        numOfRooms.map(x=><option value={x}>{x}</option>)
       }
  </select>
   </div>
</div>
</div>
</div>
<div style={{float:'right',marginTop:'2rem'}} dir={'rtl'}>
<Container >    
      <Row>
        <Col xs="auto">
            <button value={1} onClick={roomsQuickButtonFunc} className={'roomsQuickButton'}>2 - 3 חדרים</button>
        </Col>
        <Col xs="auto">
        <button value={2} onClick={roomsQuickButtonFunc} className={'roomsQuickButton'}>3 - 4 חדרים</button>
        </Col>
        <Col xs="auto">
        <button value={3} onClick={roomsQuickButtonFunc} className={'roomsQuickButton'}>4 - 5 חדרים</button>
        </Col>
        <Col xs="auto">
        <button value={4} onClick={roomsQuickButtonFunc} className={'roomsQuickButton'}>5 - 6 חדרים</button>
        </Col>
      </Row>

    </Container>
</div>
      
<br/>
<br/>
<br/>
<br/>
      <hr style={{marginTop:'40px'}} />
<div style={{direction:'rtl',marginRight:'10px'}} className="row">
<div className={'property_type'}>
<p className={"property_type_title_fullForm"} >מחיר</p>

<div class="flex-container1">
   <div class="flex-items1">
       <input placeholder={'ממחיר'} name='min_price' className={'roomSelection'} id={'min_price'}  onChange={ inputChangeHandler } />
   </div>
   <div class="flex-items1 ">
   <input placeholder={'עד מחיר'} name='max_price' className={'roomSelection'} id={'max_price'}  onChange={ inputChangeHandler } />
   </div>
</div>
</div>
</div>
<div style={{float:'right',marginTop:'2rem'}} dir={'rtl'}>
<Container >    
      <Row>
        <Col xs="auto">
            <button value={1} onClick={priceQuickButtonFunc} className={'roomsQuickButton'}>עד 1,500,000</button>
        </Col>
        <Col xs="auto">
        <button value={2} onClick={priceQuickButtonFunc} className={'roomsQuickButton'}>1.5 - 2 מליון ש"ח</button>
        </Col>
        <Col xs="auto">
        <button value={3} onClick={priceQuickButtonFunc} className={'roomsQuickButton'}>2 - 3.5 מליון ש"ח</button>
        </Col>
        <Col xs="auto">
        <button value={4} onClick={priceQuickButtonFunc} className={'roomsQuickButton'}>3.5 - 5 מליון ש"ח</button>
        </Col>
      </Row>

    </Container>
</div>
<br/>
<br/>
<br/>
<br/>
<hr/>
<div style={{float:'right',marginRight:'10px'}} >
<button onClick={advancedSearchFunc} className={!advancedSearch?'advancedButton':'advancedButton__no_padding'} id={'advancedSearch'}>חיפוש מתקדם  { (numberOfRadioSelected>0)&& <span>{`(${numberOfRadioSelected})`} </span>} <span id={'plusButton'} >+</span> </button>    
</div>
{/*  */}
<br/>
<br/>
{advancedSearch &&<div dir='rtl' className={'advanced'}>
<div   class="parent_radios_fullForm">
<div class="div1_radios_fullForm">
<button onClick={radiosChange} id="pandor" name="pandor" className={'unCheckedButton'}>
&#10003;
    </button> 
<label  style={{marginRight:'0.4em'}} for="ossm">דלתות פנדור</label> 
</div>

<div class="div2_fullForm"> 
<button onClick={radiosChange} id="parking" name="parking" className={'unCheckedButton'}>
&#10003;
    </button> 
<label style={{marginRight:'0.4em'}} for="ossm">חניה</label> 
</div>

<div class="div3_radios_fullForm">
<button onClick={radiosChange} id="elevator" name="elevator" className={'unCheckedButton'}>
&#10003;
    </button> 
<label style={{marginRight:'0.4em'}} for="ossm">מעלית</label>     
    </div>
    
    <div class="div4_radios_fullForm">    
<button onClick={radiosChange} id="air_condition" name="air_condition" className={'unCheckedButton'}>
&#10003;
    </button> 
<label style={{marginRight:'0.4em'}} for="ossm">מיזוג</label>     
     </div>

<div class="div5_radios_fullForm">
<button onClick={radiosChange} id="balcony" name="balcony" className={'unCheckedButton'}>
&#10003;
    </button> 
<label style={{marginRight:'0.4em'}} for="ossm">מרפסת</label>  
</div>
<div class="div6_radios_fullForm">
<button onClick={radiosChange} id="shelter" name="shelter" className={'unCheckedButton'}>
&#10003;
    </button> 
<label style={{marginRight:'0.4em'}} for="ossm">ממ"ד</label> 
</div>
<div class="div7_radios_fullForm">
<button onClick={radiosChange} id="bars" name="bars" className={'unCheckedButton'}>
&#10003;
    </button> 
<label style={{marginRight:'0.4em'}} for="ossm">סורגים</label> 
</div>

<div class="div8_radios_fullForm">
<button onClick={radiosChange} id="garage" name="garage" className={'unCheckedButton'}>
&#10003;
    </button> 
<label style={{marginRight:'0.4em'}} for="ossm">מחסן</label> 
 </div>

<div class="div9_radios_fullForm">
<button onClick={radiosChange} id="handicapped" name="handicapped" className={'unCheckedButton'}>
&#10003;
    </button> 
<label style={{marginRight:'0.4em'}} for="ossm">גישה לנכים</label> 
     </div>
<div class="div10_radios_fullForm">
<button onClick={radiosChange} id="renovated" name="renovated" className={'unCheckedButton'}>
&#10003;
    </button> 
<label style={{marginRight:'0.4em'}} for="ossm">משופצת</label>    
     </div>
<div class="div11_radios_fullForm">
<button onClick={radiosChange} id="furniture" name="furniture" className={'unCheckedButton'}>
&#10003;
    </button> 
<label style={{marginRight:'0.4em'}} for="ossm">מרוהטת</label>    
      </div>
<div class="div12_radios_fullForm">
<button onClick={radiosChange} id="exclusively" name="exclusively" className={'unCheckedButton'}>
&#10003;
    </button> 
<label style={{marginRight:'0.4em'}} for="ossm">בבלעדיות</label>    
          
     </div>
</div>

<br/>

<hr/>
<div style={{direction:'rtl',marginRight:'10px'}} className="row">
<div className={'property_type'}>
<p className={"property_type_title_fullForm"} >קומה</p>
<div class="flex-container1">
   <div class="flex-items1">
   <select name='min_num_of_floors' className={'roomSelection'} id={'selectFloors'} onChange={changeFloorSelection} >
<option value={1}>הכל</option>
<option value={1}>פרטר/מרתף</option>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
    <option value={6}>6</option>
    <option value={7}>7</option>
    <option value={8}>8</option>
    <option value={9}>9</option>
    <option value={10}>10</option>
    <option value={11}>11</option>
    <option value={12}>12</option>
    <option value={12}>13</option>
    <option value={12}>14</option>
  </select>
   </div>
   <div style={{marginRight:'auto',width:'2rem',}} class="flex-items1">-</div>
   <div class="flex-items1 ">
   <select name='max_num_of_floors'  id={'selectFloors2'} defaultValue={'14'}  onChange={ inputChangeHandler }  className={'roomSelection'} >
   <option value={'14'}>הכל</option>
       {
        numOfFloors.map(x=><option value={x}>{x}</option>)
       }
  </select>
   </div>
</div>
</div>
</div>
<hr style={{marginTop:'40px'}} />
<div style={{direction:'rtl',marginRight:'10px'}} className="row">
<div className={'property_type'}>
<p className={"property_type_title_fullForm"} >גודל דירה (במ"ר)</p>

<div class="flex-container1">
   <div class="flex-items1">
       <input placeholder={'מ-'} name='min_mr' className={'roomSelection'} id={'min_mr'}  onChange={ inputChangeHandler } />
   </div>
   <div class="flex-items1 ">
   <input placeholder={'עד-'} name='max_mr' className={'roomSelection'} id={'max_mr'}  onChange={ inputChangeHandler } />
   </div>
</div>
</div>
</div>
<hr/>
<div className={'property_type'}>
<h4 className={'entey_date_title__fullForm'} >תאריך כניסה</h4>
<div  dir='rtl' className={'inline_box1'}>
    <input placeholder="2013-01-25"  type="date" onChange={inputChangeHandler} name={'entery_date'} className={"date"} style={{marginTop:'20px'}} id={'entery_date'} />
<br/>
<input style={{width:'15px',height:'15px',opacity:'100',marginBottom:'-15px'}} onChange={date()} className={'inline_box'} type='checkbox'/>
<p className={'inline_box'}>כניסה מיידית</p>
</div>
</div>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<hr/>
<div style={{marginRight:'10px',paddingBottom:'4rem'}} className="row">
            <div className={'property_type'}>
<p style={{marginBottom:'0'}} className={"property_type_title_fullForm"} >חיפוש חופשי</p>
    <input type="text" name={'description'} onChange={inputChangeHandler} className={"address_city"}  />
</div>

            </div>
            

    </div>}

            <div className="row">
                <div onClick={()=>{submitSearchControl(searchParameters,history)}} className={'footer'}>
חיפוש
                </div>
                
                {/* <input name={'price'} onChange={inputChangeHandler} /> */}
                {/* <div className="">
                    <h2 className="mb-4">Products</h2>
                    {/* <div className="row">
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                            </div>
                        ))}
                    </div> */}
                    <hr />
                    {/* {loadMoreButton()} */}
                {/* </div> */} 
            </div>
        </Layout>
    );
};

export default ShopUpgrade;
