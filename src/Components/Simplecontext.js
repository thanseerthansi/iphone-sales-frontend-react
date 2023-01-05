import axios from 'axios';
import jwt_decode from "jwt-decode";
import React, { createContext, useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import Callaxios from './Callaxios';
import { BaseURL } from './urlcall';
export const Simplecontext = createContext();



export default function Simplecontextprovider({children}) {
  // const [next,setnext]=useState(null)
  const [products,setproducts]=useState([])
  const [modeldata,setmodeldata]=useState([])
  const [categorydata,setcategorydata]=useState([])
  let navigate = useNavigate();
  
  useEffect(() => {
      // window.localStorage.setItem("refresh_token",[])
      if (window.localStorage.getItem('refresh_token')!==null){
          // console.log("login both token ")
          
          getproduct()
          getcategory()
          getmodel()
      }
      else{
        getproduct()
      }
         
    }, [])
    const getproduct = async()=>{
      let data = await Callaxios("get","product/product/")
      // console.log("dataresponsenwxt",data.data.results)
      if (data.status===200){
          // setnext(data.data.next)  
          setproducts(data.data) 

      }else{
          // notifyerror()
      }
  }
  
  const accesscheck = async()=>{
    
    const token = localStorage.getItem('access_token');
    var refresh_token = window.localStorage.getItem('refresh_token')
    // console.log("valid1",refresh_token)
    
    if (refresh_token && token){
      var decodedToken=jwt_decode(token, {complete: true});
      var dateNow = new Date();
      // console.log("valid1",refresh_token)
      if(decodedToken.exp < dateNow.getTime()){
        // console.log("valid",refresh_token)
        try {
            let accessdata = await axios({
              method: 'post',
              url: BaseURL+'api/token/refresh/',
              data:{"refresh" : refresh_token },
            })
        //   console.log("data",accessdata)    
            if(accessdata.status===200){
              window.localStorage.setItem('access_token', accessdata.data.access)   
            } else{
              return navigate('/adminlogin')
            }
            
        }catch (error) {
          console.log("error",error)
          // console.log("erro/rmessga",error.response.status)
          if (error.response.status===401){
              return navigate('/adminlogin');
          }
        }
      }else{
        console.log("notvalid")
        return navigate('/adminlogin');
      }
    }else{
      console.log("notrefresh token")
          return navigate('/adminlogin');
    }
  }
  const getmodel = async()=>{
    try {
        let data = await Callaxios("get","product/modelname/")
        // console.log("dataresponsenwxt",data)
        if (data.status===200){ 
        setmodeldata(data.data) 
    
        }else{
        // notifyerror(' Something went wrong',)
        }
    } catch (error) {
        
    }
    
  }
  const getcategory = async()=>{
    try {
      let data = await Callaxios("get","product/category")
      if (data.status===200){
        setcategorydata(data.data)
      }
    } catch (error) {
      
    }
  }
  return (
    <Simplecontext.Provider value={{
        accesscheck,products,setproducts,getproduct,modeldata,getmodel,categorydata,getcategory
    }}>{children}</Simplecontext.Provider>
  )
}
