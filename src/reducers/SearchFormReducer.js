export const searchReducer=(product,action)=>{
    switch (action.type) {
    
        case 'init_product':
            console.log({...action.product},'state')
            return{...action.product}

        case 'change_field':
        console.log(action.name)
        console.log(action.value)
        product[action.name]=action.value    
        return{...product}

        default:
            return {...product}
            break;
    }

}