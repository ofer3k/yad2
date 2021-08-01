import React, {useEffect,useState} from 'react'
import axios from 'axios'
export default function Book(query,pageNumber,) {
    const [loadingB,setLoading]=useState(true)
    const [errorB,setError]=useState(false)
    const [booksB,setBooks]=useState([])
    const [hasMoreB,setHasMore]=useState(false)
    useEffect(()=>{
        setLoading(true)
        setError(false)
        let cancel
        axios(
    {
        method:'GET',
        url:'https://openlibrary.org/search.json',
        params:{q:query,page:pageNumber},
        cancelToken: new axios.CancelToken(c=>cancel=c)
    }
).then(res=>{
    setBooks([{...booksB},res.data.docs.map(b=>b.title)])
    setHasMore(res.data.docs.length>0)
    setLoading(false)
    console.log(res)
}).catch(e =>{
    if(axios.isCancel(e)) return
    setError(true)
})
return ()=>cancel()
    },[query,pageNumber])
    return {loadingB,errorB,booksB,hasMoreB}
}
