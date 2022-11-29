import axios from 'axios';

export default async function  Callaxios(method,url,datalist) { 
    const token = localStorage.getItem('access_token');
    // var refresh_token = window.localStorage.getItem('refresh_token')       
    try {
        if(method==="get"){
            let data = await axios.get(url)
            return data
        }else if(method==="post"){
            let data = await  axios({
                method: 'post',
                url: url,
                headers:{"Authorization" : `Bearer ${token}`},
                data: datalist
                })
            return data
        }else if (method==="delete"){
            let data = await axios({
                method: 'delete',
                url: url,
                headers:{"Authorization" : `Bearer ${token}`},
                data:datalist,
              })
              return data
        }
        
        
        // console.log("sdata",data.data)   
        // setvalue(data.data)
        
    } catch (error) {
        console.log(error)
        return null
    }

    
 
}
