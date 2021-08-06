import React, { useState,useReducer } from "react";
import SearchContext2 from "./search-context2";
import {searchReducer} from '../reducers/SearchFormReducer'

const SearchState2 = (props) => {
  const [searchParameters, setSearchParameters] = useState({
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
  const [numOfRooms,setNumOfRooms]= useState([1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
  const [numOfFloors,setNumOfFloors]= useState(['פרטר/מרתף',1,2,3,4,5,6,7,8,9,10,11,12,13,14])
  
  const [search,dispatch]=useReducer(searchReducer,searchParameters)


  return (
    <SearchContext2.Provider
      value={{
        search,
        dispatch,
        searchParameters,
        setSearchParameters
      }}
    >
      {props.children}
    </SearchContext2.Provider>
  );
};

export default SearchState2;