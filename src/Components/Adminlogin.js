import React from 'react'
import { Link } from 'react-router-dom'

export default function Adminlogin() {
  return (
    <div>
        <section className="md:h-screen py-36 flex items-center  bg-no-repeat bg-center">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
  <div className="container">
    <div className="flex justify-center">
      <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
        <a href="/"><img src="assets/images/logo-icon-64.png" className="mx-auto" alt={''} /></a>
        <h5 className="my-6 text-xl font-semibold">Login</h5>
        <form className="text-left" >
          <div className="grid grid-cols-1">
            <div className="mb-4">
              <label className="font-semibold" htmlFor="LoginEmail">User Name</label>
              <input id="LoginEmail" type="email" className="form-input mt-3" placeholder="Username:  " />
            </div>
            <div className="mb-4">
              <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
              <input  type="password" id="password"  className="form-input mt-3" placeholder="Password:" />
            </div>
            {/* <div className="flex justify-between mb-4">
              <div className="form-checkbox flex items-center mb-0">
                <input className="mr-2 border border-inherit w-[14px] h-[14px]" type="checkbox" defaultValue id="RememberMe" />
                <label className="text-slate-400" htmlFor="RememberMe">Remember me</label>
              </div>
              <p className="text-slate-400 mb-0"><a href="auth-re-password.html" className="text-slate-400">Forgot password ?</a></p>
            </div> */}
            <div className="mb-4"><Link to="/adminhome">
              <input type="Submit" className="btn bg-indigo-600 cursor-pointer hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full" defaultValue="Login" />
              </Link>            
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
