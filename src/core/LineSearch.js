import React, { useState, useEffect,useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../config";
import SearchContext from "../context/search-context";
import { getFilteredProducts } from "./apiCore";
import '../css/searchForm.css'
import './../css/LineSearch.css'
import { BsSearch,BsXCircle,BsQuestionCircle,BsPlusCircle } from 'react-icons/bs';
import {submitSearchControl} from './../controller/searchControl';
import { dateHelper,roomsQuickButtonFuncHelper,priceQuickButtonFuncHelper,inputChangeHandlerHelper,changeRoomSelectionHelper,changeFloorSelectionHelper } from "../controller/searchFormHelper";

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
    const [numberOfRadioSelected,setNumberOfRadioSelected]=useState(0)
    let countRadiosCheck=numberOfRadioSelected;
    

    const date = (event) => {
      let res=dateHelper(searchParameters,event)
      console.log(res,'resresres')      
      if(res){
      setSearchParameters({...searchParameters,entery_date:res})
      }
      };
      
const changeMaxRooms=(e)=>{
  setSearchParameters({...searchParameters,['max_rooms']: e.target.value})
}
const changeMaxfloors=(e)=>{
  setSearchParameters({...searchParameters, ['max_num_of_floors']: e.target.value})
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
    setSearchParameters({...searchParameters, [e.target.name]: !answer})
    setNumberOfRadioSelected(countRadiosCheck)
}
    
    function inputChangeHandler(event) {
        setSearchParameters({...searchParameters, [event.target.name]: event.target.value }); 
        console.log(searchParameters,'search parameters from context') 
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

    const changeRoomSelection=(e)=>{
      let res=changeRoomSelectionHelper(e)
      console.log(res);
      setNumOfRooms(res.NumOfRooms)
      setSearchParameters({...searchParameters, min_num_of_rooms: res.min_num_of_rooms})
              let num=document.getElementById('selectRooms').value
             }

             const changeFloorSelection=(e)=>{
              let res=changeFloorSelectionHelper(e)
              setNumOfFloors(res.NumOfFloors)
              setSearchParameters({...searchParameters, min_num_of_floors: res.min_num_of_floors})
              console.log(searchParameters)
            }


    useEffect(() => {
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

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
<div className={'parent_lineSearch_upper'} style={{width:'90vw',margin:'70px auto 0',textAlign:'right'}}>
  
<div class="parent_lineSearch">
<div class="div1_lineSearch"><input id={"search_input"} name={'property_address_city'} onChange={inputChangeHandler} placeholder={'לדוגמה:תל אביב יפו'} className={'adress_input_search_bar'} /></div>
<div class="div2_lineSearch">
  <p onClick={openDropDown} style={{fontSize:'.875rem',color:'#ccc',cursor:'pointer'}} id={'dropDown_father'} className={'adress_input_search_bar'}><span id={'dropDown_arrow'} className={'down_arrow'} style={{float:'left'}} >&#709;</span> בחרו סוגי נכסים</p>
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
    <span  className={'dropDown_checkbox_title'}>בתים</span>  
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
  <div class="div3_lineSearch">  <p onClick={openDropDownRooms} style={{fontSize:'.875rem',color:'#ccc',cursor:'pointer'}} id={'dropDown_father'} className={'adress_input_search_bar'}><span id={'dropDown_arrow_rooms'} className={'down_arrow'} style={{float:'left'}} >&#709;</span>חדרים</p>
  
  {dropDownRooms&&
  <div  dir='rtl' className={'new_dropDownRooms'}>
    <span >
    <select id={'selectRooms'} style={{cursor:'pointer'}} onChange={changeRoomSelection} className={'new_dropDownRooms_select'}>
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
    <select onChange={changeMaxRooms} style={{cursor:'pointer'}} className={'new_dropDownRooms_select'}>
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
  <div onClick={openAdvancedSearch} style={{cursor:'pointer'}} className={'adress_input_search_bar advence_search'}><span><span>חיפוש מתקדם</span> <span id={'circle_icon'} style={{fontSize:'.8rem'}}><BsPlusCircle/>
 </span> <span className={'display_none'} id={'circle_icon_x'} style={{fontSize:'.8rem'}} ><BsXCircle /> </span> </span></div>
   </div>
<div class="div6_lineSearch">
<div onClick={()=>{submitSearchControl(searchParameters,history)}} style={{cursor:'pointer'}}  className={'adress_input_search_bar advence_search_submit'}><span ><span >חיפוש</span> <span style={{fontSize:'.8rem'}} ><BsSearch /> </span></span></div>
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
<div  class="div6_advanced_level2 advanced_level2_input"><input name={'min_mr'} onChange={inputChangeHandler} placeholder={'מ - '} className={'changeFloorSelection1'} style={{textAlign:'right',cursor:'text'}} /> </div>
<div class="div7_advanced_level2 advanced_level2_input"><input name={'max_mr'} onChange={inputChangeHandler} placeholder={'עד - '} className={'changeFloorSelection1'} style={{textAlign:'right',cursor:'text'}}/></div>
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
  <p onClick={()=>{submitSearchControl(searchParameters,history)}}  className={'submit_button'}>חיפוש</p>
  <span className={'clear_button'}>נקה</span>
</div>
        </div>
    }
</div>

             );
};

export default LineSearch;
