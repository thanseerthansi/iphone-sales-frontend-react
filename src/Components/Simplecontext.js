import axios from 'axios';
import jwt_decode from "jwt-decode";
import React, { createContext, useEffect } from 'react'
import {useNavigate } from 'react-router-dom';
export const Simplecontext = createContext();



export default function Simplecontextprovider({children}) {
    
    let navigate = useNavigate();
    
    useEffect(() => {
        // window.localStorage.setItem("refresh_token",[])
        if (window.localStorage.getItem('refresh_token')!==null){
            // console.log("login both token ")
            accesscheck()
        }else{
            // console.log("null refresh token")
            return navigate('/adminlogin')
        }
         
    }, [])
    
    const accesscheck = async()=>{
        
        const token = localStorage.getItem('access_token');
        var refresh_token = window.localStorage.getItem('refresh_token')
        var decodedToken=jwt_decode(token, {complete: true});
        var dateNow = new Date();
    if(decodedToken.exp < dateNow.getTime()){
        try {
            let accessdata = await axios({
              method: 'post',
              url: 'http://127.0.0.1:8000/api/token/refresh/',
              data:{"refresh" : refresh_token },
          })
        //   console.log("data",accessdata)    
          if(accessdata.status===200){
            window.localStorage.setItem('access_token', accessdata.data.access)   
          } else{
            return navigate('/adminlogin')
          }
           
        }catch (error) {
            // console.log("error",error)
            // console.log("erro/rmessga",error.response.status)
            if (error.response.status===401){
                return navigate('/adminlogin');
            }
          }
    }}
  return (
    <Simplecontext.Provider value={{
        accesscheck
    }}>{children}</Simplecontext.Provider>
  )
}
