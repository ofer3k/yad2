const dateHelper = (searchParameters,event)  => {
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
      document.getElementById('entery_date').disabled = true;
      return(today); 
    }
    else{
      document.getElementById('entery_date').disabled = false;
        return(null)
    }
};


const roomsQuickButtonFuncHelper=(e)=>{
    const minRooms=document.getElementById("selectRooms")
    const maxRooms=document.getElementById("selectRooms2")
switch (e.target.value) {
    case '1':
        // setNumOfRooms([2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
        minRooms.selectedIndex  = 3;
        maxRooms.selectedIndex  = 3;
        return({numOfRooms:[2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '2',max_num_of_rooms: '3'})        
        break;
        case '2':
        minRooms.selectedIndex  = 5;
        maxRooms.selectedIndex  = 3;
        return({numOfRooms:[3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '3',max_num_of_rooms: '4'})        
        break;
        case '3':
            minRooms.selectedIndex  = 7;
            maxRooms.selectedIndex  = 3;
            return({numOfRooms:[4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '4',max_num_of_rooms: '5'})

        break;
        case '4':
            // setNumOfRooms([5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12])
            minRooms.selectedIndex  = 9;
        maxRooms.selectedIndex  = 3;
        return({numOfRooms:[5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '5',max_num_of_rooms: '6'})
        break;
    default:
        break;
}
}


const priceQuickButtonFuncHelper=(e)=>{
    const minPrice=document.getElementById("min_price")
    const maxPrice=document.getElementById("max_price")
switch (e.target.value) {
    case '1':
        minPrice.value = "0";
        maxPrice.value = "1,500,000";
        return({ min_price: '0',max_price: '1500000' })
        break;
        case '2':
            minPrice.value = "1,500,000";
            maxPrice.value = "2,000,000";
          return({ min_price: '1500000',max_price: '2000000' })
          break;
        case '3':
            minPrice.value = "2,000,000";
            maxPrice.value = "3,500,000";
          return({ min_price: '2000000',max_price: '3500000' })
          break;
        case '4':
            minPrice.value = "3,500,000";
            maxPrice.value = "5,000,000";
            return({ min_price: '3500000',max_price: '5000000' })
            break;
    default:
        break;
}
}

function inputChangeHandlerHelper(event) {
    if(event.target.name==='property_type1')
    {
        if(!document.getElementById('apartmentsImg').classList.contains('image_style_orange'))
        return ({[event.target.name]: ''})
    }

    if(event.target.name==='property_type2')
    {
       if(!document.getElementById('housesImg').classList.contains('image_style_orange')) 
        return ({[event.target.name]: ''})
    }
    if(event.target.name==='property_type3')
    {
        if(!document.getElementById('extraImg').classList.contains('image_style_orange'))
        return ({[event.target.name]: ''})
    }
    return({[event.target.name]: event.target.value})
} 

const changeRoomSelectionHelper=(e)=>{
    let num=document.getElementById('selectRooms').value
       console.log(num)
       switch(num) {
        case '1':
            return({NumOfRooms:[1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '1'})
          break;
          case 'הכל':
            return({NumOfRooms:[1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '1'})
            break;
        case '1.5':
            return({NumOfRooms:[1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '1.5'})
            break;
          case '2':
            return({NumOfRooms:[2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '2'})
            break;
          case '2.5':
            return({NumOfRooms:[2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '2.5'})
          break;
          case '3':
            return({NumOfRooms:[3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '3'})
          break;
          case '3.5':
            return({NumOfRooms:[3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '3.5'})
          break;
          case '4':
            return({NumOfRooms:[4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '4'})
          break;
          case '4.5':
            return({NumOfRooms:[4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '4.5'})
          break;
          case '5':
            return({NumOfRooms:[5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '5'})
          break;
          case '5.5':
            return({NumOfRooms:[5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '5.5'})
          break;
          case '6':
            return({NumOfRooms:[6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '6'})
          break;
          case '6.5':
            return({NumOfRooms:[6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '6.5'})
          break;
          case '7':
            return({NumOfRooms:[7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '7'})
          break;
          case '7.5':
            return({NumOfRooms:[7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '7.5'})
          break;
          case '8':
            return({NumOfRooms:[8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '8'})
          break;
          case '8.5':
            return({NumOfRooms:[8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '8.5'})
          break;
          case '9':
            return({NumOfRooms:[9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '9'})
          break;
          case '9.5':
            return({NumOfRooms:[9.5,10,10.5,11,11.5,12],min_num_of_rooms: '9.5'})
          break;
          case '10':
            return({NumOfRooms:[10,10.5,11,11.5,12],min_num_of_rooms: '10'})
          break;
          case '10.5':
            return({NumOfRooms:[10.5,11,11.5,12],min_num_of_rooms: '10.5'})
          break;
          case '11':
            return({NumOfRooms:[11,11.5,12],min_num_of_rooms: '11'})
          break;
          case '11.5':
            return({NumOfRooms:[11.5,12],min_num_of_rooms: '11.5'})
          break;
          case '12':
            return({NumOfRooms:[12],min_num_of_rooms: '12'})
          break;
        default:
            return({NumOfRooms:[1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],min_num_of_rooms: '1'})
    }
   }

   const changeFloorSelectionHelper=(e)=>{
    let num=document.getElementById('selectFloors').value
       switch(num) {
        case '1':
            return({NumOfFloors:['פרטר/מרתף',1,2,3,4,5,6,7,8,9,10,11,12,13,14],min_num_of_floors: '1'})
          break;
          case 'הכל':
            return({NumOfFloors:['פרטר/מרתף',1,2,3,4,5,6,7,8,9,10,11,12,13,14],min_num_of_floors: '1'})
            break;
          case '2':
            return({NumOfFloors:[2,3,4,5,6,7,8,9,10,11,12,13,14],min_num_of_floors: '2'})
            break;
          case '3':
            return({NumOfFloors:[3,4,5,6,7,8,9,10,11,12,13,14],min_num_of_floors: '3'})
          break;        
          case '4':
            return({NumOfFloors:[4,5,6,7,8,9,10,11,12,13,14],min_num_of_floors: '4'})
          break;
          case '5':
            return({NumOfFloors:[5,6,7,8,9,10,11,12,13,14],min_num_of_floors: '5'})
          break;
          case '6':
            return({NumOfFloors:[6,7,8,9,10,11,12,13,14],min_num_of_floors: '6'})
          break; 
          case '7':
            return({NumOfFloors:[7,8,9,10,11,12,13,14],min_num_of_floors: '7'})
          break;
          case '8':
            return({NumOfFloors:[8,9,10,11,12,13,14],min_num_of_floors: '8'})
          break;
          case '9':
            return({NumOfFloors:[9,10,11,12,13,14],min_num_of_floors: '9'})
          break;
          case '10':
            return({NumOfFloors:[10,11,12,13,14],min_num_of_floors: '10'})
          break;
          case '11':
            return({NumOfFloors:[11,12,13,14],min_num_of_floors: '11'})
          break; 
          case '12':
            return({NumOfFloors:[12,13,14],min_num_of_floors: '12'})
          break;
          case '13':
            return({NumOfFloors:[13,14],min_num_of_floors: '13'})
          break;
          case '14':
            return({NumOfFloors:[14],min_num_of_floors: '14'})
          break;
        default:
            return({NumOfFloors:['פרטר/מרתף',1,2,3,4,5,6,7,8,9,10,11,12,13,14],min_num_of_floors: '1'})
      }
   }


export {dateHelper,roomsQuickButtonFuncHelper,priceQuickButtonFuncHelper,inputChangeHandlerHelper,changeRoomSelectionHelper,changeFloorSelectionHelper}