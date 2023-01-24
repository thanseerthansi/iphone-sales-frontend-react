import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BaseURL } from './urlcall';
// import jwt_decode from "jwt-decode";
// import { Simplecontext } from './Simplecontext';
// let canceltoken;
export default async function  Callaxios(method,url,datalist) { 
    // const {accesscheck} =useContext(Simplecontext)
    // if(typeof canceltoken != typeof undefined){
    //     canceltoken.cancel("Cancelling Request")
    // }
    // canceltoken = axios.CancelToken.source()
    // accesscheck()
    
    
    const token = localStorage.getItem('access_token');
    // console.log("token",token)
    // var refresh_token = window.localStorage.getItem('refresh_token')
    // if (refresh_token && token){
    //     var decodedToken=jwt_decode(token, {complete: true});
    //     var dateNow = new Date();
    //     // console.log("valid1",refresh_token)
    //     if(decodedToken.exp < dateNow.getTime()){
    //       // console.log("valid",refresh_token)
    //       try {
    //           let accessdata = await axios({
    //             method: 'post',
    //             url: BaseURL+'api/token/refresh/',
    //             data:{"refresh" : refresh_token },
    //           })
    //       //   console.log("data",accessdata)    
    //           if(accessdata.status===200){
    //             window.localStorage.setItem('access_token', accessdata.data.access)   
    //           } 
              
    //       }catch (error) {
    //         console.log("error",error)
    //         // console.log("erro/rmessga",error.response.status)
    //         if (error.response.status===401){
    //             // return navigate('/adminlogin');
    //             window.location.href = '/adminlogin';
    //         }
    //       }
    //     }
    //   }
    
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
