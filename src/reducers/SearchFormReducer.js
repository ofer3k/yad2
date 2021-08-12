export const searchReducer=(product,action)=>{
    switch (action.type) {
    
        case 'init_product':
            return{...action.product}

        case 'change_field':
        product[action.name]=action.value    
        return{...product}

        default:
            return {...product}
            break;
    }

}