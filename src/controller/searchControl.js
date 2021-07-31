import { API } from "../config";

  function submitSearchControl(searchParameters,history){
    fetch(`${API}/products/by/Filter`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({...searchParameters})
})
.then(function(res){ res.json().then(body =>  {
  history.push("/shop", { body});
  window.location.reload(false);
   }); })
.catch(function(res){ console.log(res) })
}

export { submitSearchControl}