import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Callaxios from './Callaxios';
import { BaseURL } from './urlcall';
export default function Repassword() {
    // console.log("sdfsdf",window.location.origin)
    const [email,setemail]=useState();
    // console.log("access",window.localStorage.getItem('access_token'))
    let navigate = useNavigate();
    const notifyerror = () => toast.error('! Invalid Password or Username', {
        position: "top-center",
        });
    const notifysuccess = (msg) => toast.success(msg, {
        position: "top-center",
        });
    const sendmail=async(e)=>{
        e.preventDefault();
        // console.log("emil",email)
        try {
            let data = await Callaxios("post","user/sentmail/",{"email":email,"url":window.location.origin+'/passwordchange/'})
            // console.log("message sent",data)
            if (data.data.Status===200){
                
                notifysuccess("Mail Sented")
                setemail('')
                // return navigate("/adminlogin")
            }else{
                // console.log("data")
                notifyerror(data.data.Message)
            }
        } catch (error) {
            console.log(error)
        }
        
        
    }
  return (
    <div>
        <section className="md:h-screen py-36 flex items-center  bg-no-repeat bg-center">
        <ToastContainer />
        <div className="absolute inset-0 bg-[url('https://cdn.thewirecutter.com/wp-content/media/2022/10/whichiphone-2048px-2681-3x2-1.jpg?auto=webp&quality=60&crop=1.91:1&width=1200')]  from-black/60 via-black/80 to-black" />
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-black-50 h-full lg:h-full w-full" />
  {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" /> */}
  <div className="container">
  <div className="flex justify-center">
    <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
      <a href="index.html"><img src="/assets/images/logo/logo.png" className=" ml-[30%] w-[200px]" alt={''} /></a>
      <h5 className="my-6 text-xl font-semibold">Reset Your Password</h5>
      <div className="grid grid-cols-1">
        <p className="text-slate-400 mb-6">Please enter your email address. You will receive a link to create a new password via email.</p>
        <form onSubmit={(e)=>sendmail(e)} className="text-left">
          <div className="grid grid-cols-1">
            <div className="mb-4">
              <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
              <input required onChange={(e)=>setemail(e.target.value)} value={email} type="email" className="form-input mt-3" placeholder="name@example.com" />
            </div>
            <div className="mb-4">
              <button type="submit" className="btn bg-[#143f66] hover:bg-[#195aa5] border-[#143f66]  text-white rounded-md w-full" > Send</button>
            </div>
            <div className="text-center">
              <span className="text-slate-400 me-2">Remember your password ? </span><Link to="/adminlogin" className="text-black dark:text-white font-bold">Sign in</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

</section>

    </div>
  )
}
