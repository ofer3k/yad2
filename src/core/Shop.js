import React, { useState, useEffect } from "react";
import { Modal, Button } from 'antd';
import Layout from "./Layout";
import Card from "./Card";
import CardYad2 from "./CardYad2";
import CardYad2Acordion  from "./CardYad2Acordion";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import { BiFilterAlt } from 'react-icons/bi';
import { RiMapPinLine } from 'react-icons/ri';
import { Accordion,Form,ButtonGroup ,ToggleButton,Pagination } from 'react-bootstrap';
import { useHistory } from "react-router-dom";


import './../cardYad2.css'
import { orange } from "@material-ui/core/colors";



// 
const getValue = ({ price }) => +price.slice(1) || 0;
// var studios = [{ name: "Whole Yoga", price: "$17.00" }, { name: "Rino Yoga Social", price: "Suggested Donation" }, { name: "Samadhi Yoga", price: "$20.00" }, { name: "Corepower Yoga", price: "$25.00" }, { name: "The River Yoga", price: "$20.00" }, { name: "Endorphin Yoga", price: "$10.00" }, { name: "Kindness Yoga", price: "$20.00" }, { name: "Yoga High", price: "$15.00" }, { name: "Freyja Project", price: "$22.00" }, { name: "Kula Yoga", price: "$17.00" }];

// 
const Shop = (state) => {
    let history = useHistory();
    const mq = window.matchMedia( "(max-width: 920px)" );


    
    // console.log(state.location.state.body,'state')

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [originalFullList, setOriginalFullList] = useState([]);

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
    // 
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const showModal2 = () => {
        setIsModalVisible2(true);
    };
    const handleOk2 = () => {
        setIsModalVisible2(false);
    };
    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };
// 
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };
    

    const loadFilteredResults = newFilters => {
        if(state.location.state== undefined){
            getFilteredProducts(skip, limit, newFilters).then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setFilteredResults(data.data);
                    setOriginalFullList(data.data)
                    console.log(data.data,'data.data')
                    setSize(data.size);
                    setSkip(0);
                }
            })
        }
        else{
            console.log(state.location.state.body.data)
            setFilteredResults(state.location.state.body.data)
            setOriginalFullList(state.location.state.body.data)
                
                    setSize(state.location.state.body.size);
                    setSkip(0);
        }
     
    };

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
        init();
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
        loadFilteredResults(myFilters.filters);
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
    const priceSort = (condition) => {
        let saver=filteredResults
        let ordered;
        if(condition=='lowToHigh')
        {
            ordered = saver.sort((a, b) => (a.price > b.price) ? 1 : -1)
        }
        if(condition=='highToLow'){
            ordered = saver.sort((a, b) => (a.price > b.price) ? -1 : 1)
        }
        setFilteredResults([...ordered])
        console.log(filteredResults)
      }
      const dateSort = () => {
        let ordered=filteredResults
        ordered.sort(function(a,b){
            return new Date(a.createdAt) - new Date(b.createdAt);
          });
        setFilteredResults([...ordered])
          console.log(ordered)
        
        // setFilteredResults([...ordered])
        console.log(filteredResults)
      }
      const redirectToSearchForm=()=>{
        history.push("/SearchForm"); 
      }

      const imageFilter=()=>{
        let saver=filteredResults
        let ordered;
        ordered=saver.filter(obj => obj.pic1 !== undefined  );
        ordered.filter(obj => obj.pic1.length > 4  );
        setFilteredResults([...ordered])
      }
      
    return (
        <div >
        <Layout
            title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid"
        >
            <div onClick={redirectToSearchForm} className={'fixed_searchBar'}>
                <span className={'fixed_searchBar_text'}>נדלן למכירה</span>
            </div>
            <div style={{marginTop:'12px'}}  class="parent_shop_filters">
<div  class="div1_shop_filters"> 
<span onClick={showModal}  className={'sort_button_main'}>מיין תוצאות &#8645;</span>
</div>
<div onClick={showModal2} class="div2_shop_filters"> <span className={'filter_button_main'}>סנן תוצאות <BiFilterAlt/></span>
</div>
<div class="div3_shop_filters"> </div>
<div class="div4_shop_filters"> <span className={'map_button_main'}><span style={{fontSize:'.875rem',color:'#363636'}}>מפה</span>  <RiMapPinLine color={'#0fca80'} /></span></div>
<div class="div5_shop_filters"> <span className={'note_for_user'}> </span> </div>
{/* <div class="div6_shop_filters"> מציג</div>
<div class="div7_shop_filters"> {filteredResults.length}</div> */}
</div>

<p className={'amount_of_products'}> מציג {filteredResults.length} מודעות</p>

            <div style={{float:'right',textAlign:'right'}} dir={'rtl'} className="row">
             
                <div className="">  
                    <div className="">
                        {(mq.matches)&& filteredResults.map((product, i) => (
                            <div key={i} className="col-12 mb-1">
                                <CardYad2 product={product} />
                            </div>
                        )) }
                        {/*  */}
                        {!(mq.matches)&& filteredResults.map((product, i) => (
                            <div key={i} className="col-12 mb-1">
                                <CardYad2Acordion product={product} />
                            </div>
                        )) }
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
            
            {/*   return (React.createElement(React.Fragment, null,
        React.createElement(Button, { type: "primary", onClick: showModal }, "Open Modal"),
        React.createElement(Modal, { title: "Basic Modal", visible: isModalVisible, onOk: handleOk, onCancel: handleCancel },
            React.createElement("p", null, "Some contents..."),
            React.createElement("p", null, "Some contents..."),
            React.createElement("p", null, "Some contents...")))); */}
            <div width={'100vw'} style={{position:'fixed',bottom:'0',left:'0',}} >
           
            </div>
        </Layout>
        <Modal footer={false} bodyStyle={{backgroundColor:'white',position:'fixed',bottom:'0',width:'100vw'}} style={{position:'fixed',bottom:'0',margintop:'100vh'}} visible={isModalVisible}  onOk={handleOk} onCancel={handleCancel}>
        <span className={'radios_list'}>
        <label class="container"> <span className={'radio_title'}>לפי תאריך</span>
  <input onClick={dateSort} type="radio"  name="radio"/>
  <span class="checkmark"></span>
</label>

<label class="container">
<span className={'radio_title'}>מחיר - מהזול ליקר</span>
  <input onClick={()=>{priceSort('lowToHigh')}} type="radio" name="radio"/>
  <span class="checkmark"></span>
</label>
<label class="container">
<span className={'radio_title'}>מחיר - מהיקר לזול</span>
  <input onClick={()=>{priceSort('highToLow')}} type="radio" name="radio"/>
  <span class="checkmark"></span>
</label>
        </span>
        </Modal>
{/*  */}
                <Modal footer={false} bodyStyle={{backgroundColor:'white',position:'fixed',bottom:'0',width:'100vw'}} style={{position:'fixed',bottom:'0',margintop:'100vh'}} visible={isModalVisible2}  onOk={handleOk2} onCancel={handleCancel2}>
        <span className={'radios_list'}>
        <label class="container"> <span className={'radio_title'}>רק עם מחיר</span>
  <input  onClick={()=>{setFilteredResults(originalFullList)}}  type="radio"  name="radio2"/>
  <span class="checkmark"></span>
</label>
<label class="container">
<span  className={'radio_title'}>רק עם תמונה</span>
  <input onClick={imageFilter}  type="radio" name="radio2"/>
  <span class="checkmark"></span>
</label>
    </span>
        </Modal>
                 {/*  */}
        </div>
        
    );
};

export default Shop;
