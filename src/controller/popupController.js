const correctNamePropertyCondition=(name)=>{
    switch (name) {
        case "In saved mode":
            return('במצב שמור, (במצב טוב, לא שופץ)')
            break;
    
        default:
            break;
    }
}
const correctDate=(date)=>{
    let today = new Date().toLocaleDateString()
let entryDate =new Date(date).toLocaleDateString()
// console.log(typeof date,'date')
switch (entryDate) {
    case today:
        return('כניסה מיידית')
        break;

    default:
        return(entryDate)
        break;
}
}

const correctNameProperty=(name)=>{
    switch (name) {
        case 'Apartment':
            return('דירה')
            break;
        case 'Garden Apartment':
            return('דירת גן')
            break;
        default:
            break;
    }
}

export {correctNamePropertyCondition,correctDate,correctNameProperty}