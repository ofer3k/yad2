import React, { useState } from "react";
import ProductContext from "./product-context";

const ProductState = (props) => {
  const [valuesContext, setValuesContext] = useState({
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
const [radiosContext, setRadiosContext] = useState({
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

  return (
    <ProductContext.Provider
      value={{
        valuesContext,
        setValuesContext,
        radiosContext,
        setRadiosContext
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;