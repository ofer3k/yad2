import { API } from "../config";

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const uploadImage = ({formData}) => {
    return fetch(`${API}/photo`, {
        method: "POST",
        
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const createProduct = (userId, token, product) => {
    var data = new FormData();
    data.append( "json", JSON.stringify( product ) );

    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: data
    })
        .then(response => {
            if(response.ok)
            {
                console.log('product',product)
                return response.json();
            }
            else{
                throw new Error('בעיה ביצירת המודעה');
            }
            
        })
        .catch(err => {
            return({err:'משהו השתבש בהעלאת המודעה'})

        });
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
