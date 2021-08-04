

const changePropertyTypeName=(propertyType)=>{
    switch (propertyType) {
        case 'Apartment':
            return('דירה')
            break;
    
        default:
            return('דירה')
            break;
    }
}
const changePropertyConditionName=(propertyCondition)=>{
    switch (propertyCondition) {
        case "New from a contractor":
            return('חדש מקבלן')
            break;
    
        default:
            return('חדש מקבלן')
            break;
    }
}

export { changePropertyTypeName,changePropertyConditionName };