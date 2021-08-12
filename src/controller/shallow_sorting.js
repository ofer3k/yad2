const shallowPriceSort = (condition,filteredResults) => {
    let saver=filteredResults
    let ordered;
    if(condition=='lowToHigh')
    {
        ordered = saver.sort((a, b) => (a.price > b.price) ? 1 : -1)
    }
    if(condition=='highToLow'){
        ordered = saver.sort((a, b) => (a.price > b.price) ? -1 : 1)
    }
    console.log(filteredResults)
    return([...ordered])
  }

  export {shallowPriceSort}