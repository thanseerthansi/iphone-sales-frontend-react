
// import axios from 'axios';
import React, { useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import {useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Callaxios from './Callaxios';
// import { BaseURL } from './urlcall';
export default function Passwordchage() {
    const [password,setpassword]=useState()
    const [password1,setpassword1]=useState()
    let navigate = useNavigate();
    const  urlparam  = useParams()
    const notifyerror = (msg) => toast.error(msg, {
        position: "top-center",
        });
    let urlid = urlparam.id
    const changepasswordfnctn = async(e)=>{
        e.preventDefault();
        if(password === password1){
            try {
                let data = await Callaxios("post",'user/passwordchange/',{id:urlid,password:password})
                // console.log("data",data)
                if(data.data.Status===200){
                    return navigate("/adminlogin")
                }else{
                    notifyerror(data.data.Message)
                }
            } catch (error) {
                
            }
        }else{
            notifyerror("Password not same")
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
      <a href="index.html"><img src="/assets/images/logo/logo.png" className="mx-auto w-[200px]" alt={''} /></a>
      <h5 className="my-6 text-xl font-semibold">Reset Your Password</h5>
      <div className="grid grid-cols-1">
        <form onSubmit={(e)=>changepasswordfnctn(e)} className="text-left">
          <div className="grid grid-cols-1">
            <div className="mb-4">
              <label className="font-semibold" htmlFor="LoginEmail">Password:</label>
              <input required onChange={(e)=>setpassword(e.target.value)} type="Password" className="form-input mt-3" placeholder="Password" />
            </div>
            <div className="mb-4">
              <label className="font-semibold" htmlFor="LoginEmail"> Reenter Password :</label>
              <input required onChange={(e)=>setpassword1(e.target.value)} type="Password" className="form-input mt-3" placeholder="password" />
            </div>
            <div className="mb-4">
              <button type="submit" className="btn bg-[#13b5e1] hover:bg-[#108fb3] border-[#13b5e1]  text-white rounded-md w-full" >Reset</button>
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
