const correctName=(name)=>{
    switch (name) {
        case 'Apartment':
            return('דירה')
            break;
        case 'Garden Apartment':
            return('דירת גן')
            break;
            case "Private house":
                return('בית פרטי')
                break;
        
        default:
            break;
    }
}
const correctNamePropertyCondition=(name)=>{
    switch (name) {
        case "In saved mode":
            return('במצב שמור, (במצב טוב, לא שופץ)')
            break;
            case "Renovated":
                return('משופץ')
                break;
            
        default:
            break;
    }
}
const correctDate=(date)=>{
    let today = new Date().toLocaleDateString()
let entryDate =new Date(date).toLocaleDateString()

switch (entryDate) {
    case today:
        return('כניסה מיידית')
        break;

    default:
        return(entryDate)
        break;
}
}

export {correctName, correctNamePropertyCondition,correctDate}