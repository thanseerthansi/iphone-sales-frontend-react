import axios from 'axios';
import { BaseURL } from './urlcall';

export default async function  Callaxios(method,url,datalist) { 
    const token = localStorage.getItem('access_token');
    // var refresh_token = window.localStorage.getItem('refresh_token')
    // console.log("datalist",datalist)       
    try {
        if(method==="get"){
            // console.log("url",BaseURL)
            let data = await axios.get(BaseURL+url)
            console.log("dataget",data)
            return data
        }else if(method==="post"){
            console.log("post")
            let data = await  axios({
                method: 'post',
                url: BaseURL+url,
                headers:{"Authorization" : `Bearer ${token}`},
                data: datalist
                })
                console.log("datapost",data)
            return data
        }else if (method==="delete"){
            console.log("delete")
            let data = await axios({
                method: 'delete',
                url: BaseURL+url,
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
