export const productReducer=(product,action)=>{
    switch (action.type) {
        case 'init_product':
            console.log({...action.product},'state')
            return{...action.product}
        case 'change_route':
        console.log(action.route)
        console.log(product)
            return{...product,
                Route:action.route}
        case 'delete_product':
                return[{...product,
                    name:'ok2 ok2'
                }]    
            break;
    
        default:
            break;
    }

}