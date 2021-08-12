export const productReducer=(product,action)=>{
    switch (action.type) {
        case 'init_product':
            console.log({...action.product},'state')
            return{...action.product}

        case 'change_field':
        product[action.name]=action.value    
        return{...product}

        default:
            break;
    }

}