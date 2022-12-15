import axios from 'axios';
import { BaseURL } from './urlcall';
// let canceltoken;
export default async function  Callaxios(method,url,datalist) { 
    // if(typeof canceltoken != typeof undefined){
    //     canceltoken.cancel("Cancelling Request")
    // }
    // canceltoken = axios.CancelToken.source()
    const token = localStorage.getItem('access_token');
    // console.log("token",token)
    let body = {
                method: 'post',
                url: BaseURL+url,
                headers:{"Authorization" : `Bearer ${token}`},
                data: datalist
                }
    if (token === null){  
        // console.log("undefined token")     
        body = {
            method: 'post',
            url: BaseURL+url,           
            data: datalist
            }
    }
   
    // var refresh_token = window.localStorage.getItem('refresh_token')
    // console.log("token",token)       
    // console.log("method",method)       
    // console.log("datalist",datalist)       
    try {
        if(method==="get"){
            // console.log("url",BaseURL)
            let data = await axios.get(BaseURL+url,{params:datalist})
            // console.log("dataget",data)
            return data
        }else if(method==="next"){
            // console.log("url",BaseURL)
            let data = await axios.get(url)
            // console.log("dataget",data)
            return data
        }
        else if(method==="post"){
            // console.log("post")
            let data = await  axios(body)
                // console.log("datapost",data)
            return data
        }else if (method==="delete"){
            // console.log("delete")
            let data = await axios({
                method: 'delete',
                url: BaseURL+url,
                headers:{"Authorization" : `Bearer ${token}`},
                data:datalist,
              })
              return data
        }else if(method==="patch"){
            // console.log("patch")
            let data = await axios({
                method: 'patch',
                url: BaseURL+url,
                headers:{"Authorization" : `Bearer ${token}`},
                data:datalist
              })
              return data

        }
        
        
        // console.log("sdata",data.data)   
        // setvalue(data.data)
        
    } catch (error) {
        console.log(error)
        // if (error.message==="Request failed with status code 401"){
        //     console.log("notoken")
        //     window.location.href = '/adminlogin';
        // }
        return null
    }

    
 
}
