import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BaseURL } from './urlcall';
export default function Adminlogin() {
  const [username,setusername]=useState();
  const [password,setpassword]=useState();
  // console.log("access",window.localStorage.getItem('access_token'))
  let navigate = useNavigate();
  const notifyerror = () => toast.error('! Invalid Password or Username', {
    position: "top-center",
    });
  const login=(e)=>{
    e.preventDefault();
    const data={
        "username":username,
        "password":password,
      }   
    axios({
        method: 'post',
        url: BaseURL+'/api/token/',
        data:data,
    }).then(response => {
        // console.log("response",response);
        if (response.status === 200){
            // console.log("pk")
            window.localStorage.setItem('access_token', response.data.access)
            window.localStorage.setItem('refresh_token', response.data.refresh) 
            return navigate('/adminhome');
        }
        else{
          notifyerror()
          alert(response.data.Message) }
        })
    .catch((error) => {
    console.log(error)
    notifyerror()
    })
    }
  return (
    <div>
        <section className="md:h-screen py-36 flex items-center  bg-no-repeat bg-center">
        <ToastContainer />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
  <div className="container">
    <div className="flex justify-center">
      <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
        <a href="/"><img src="assets/images/logo-icon-64.png" className="mx-auto" alt={''} /></a>
        <h5 className="my-6 text-xl font-semibold">Login</h5>
        <form className="text-left" onSubmit={(e)=>login(e)} >
          <div className="grid grid-cols-1">
            <div className="mb-4">
              <label className="font-semibold" htmlFor="LoginEmail">User Name</label>
              <input id="username" onChange={(e)=>setusername(e.target.value)} type="text" className="form-input mt-3" placeholder="Username:  " />
            </div>
            <div className="mb-4">
              <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
              <input  type="password" id="password" onChange={(e)=>setpassword(e.target.value)}  className="form-input mt-3" placeholder="Password:" />
            </div>
            {/* <div className="flex justify-between mb-4">
              <div className="form-checkbox flex items-center mb-0">
                <input className="mr-2 border border-inherit w-[14px] h-[14px]" type="checkbox" defaultValue id="RememberMe" />
                <label className="text-slate-400" htmlFor="RememberMe">Remember me</label>
              </div>
              <p className="text-slate-400 mb-0"><a href="auth-re-password.html" className="text-slate-400">Forgot password ?</a></p>
            </div> */}
            <div className="mb-4">
              <button type="Submit" className="btn bg-indigo-600 cursor-pointer hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full" defaultValue="Login" >Login</button>
                         
            </div>
            {/* <div className="text-center">
              <span className="text-slate-400 me-2">Don't have an account ?</span> <a href="auth-signup.html" className="text-black dark:text-white font-bold">Sign Up</a>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}
