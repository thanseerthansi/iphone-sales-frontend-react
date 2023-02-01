import React from 'react'
import { Link } from 'react-router-dom';
import {FaProductHunt,FaMobileAlt} from 'react-icons/fa';
import {MdOutlineRateReview} from 'react-icons/md';
import {GrStatusInfo} from 'react-icons/gr';
import {useNavigate } from 'react-router-dom';

export default function AdminSidebar(show) {
  let isMobileDevice = window.matchMedia("only screen and (max-width: 768px)").matches;
  let navigate = useNavigate();
    const logout =()=>{
      window.localStorage.removeItem("access_token")
      window.localStorage.removeItem("refresh_token")
      // console.log("okdelete")
      return navigate('/adminlogin');
      
  }
  return (
    <div>
        <div className="min-h-screen flex items-center justify-center   bg-gray-100 py-1">            
  <div className="flex w-full max-w-xs p-2  h-screen  overflow-y-auto  bg-white"> 
    <ul className="flex flex-col w-full">
        {isMobileDevice ? 
        <div className='flex justify-end  '><button onClick={()=>show.setshow(!show.show)} className='  hover:text-red-600 rounded-full h-8 w-8 text-white bg-red-500 hover:bg-red-800 cursor-pointer'>X</button></div>
          :null}
      <li className="my-px pt-4">
        <Link  to="/adminhome" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-700 hover:text-white">
          <span className="flex items-center justify-center text-lg text-gray-500">
            <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </span>
          <span className="ml-3">Dashboard</span>
          
        </Link>
      </li>
      <li className="my-px">
        <Link to="/adminproducts" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700  hover:text-white">
          <span className="flex items-center justify-center text-lg text-gray-500">
            <FaProductHunt size={20}/>
          </span>
          <span className="ml-3 "> Products</span>
        </Link>
      </li>
      <li className="my-px">
        <Link to="/adminorder" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700 hover:text-white">
          <span className="flex items-center justify-center text-lg text-gray-500">
            <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </span>
          <span className="ml-3">Orders</span>
        </Link>
      </li>
      <li className="my-px">
        <Link to="/adminsell" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700  hover:text-white">
          <span className="flex items-center justify-center text-lg text-gray-500">
            <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </span>
          <span className="ml-3">Selled Orders</span>
        </Link>
      </li>
      <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Settings</span>
      <li className="my-px">
        <Link to="/adminstatus" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700  hover:text-white">
          <span className="flex items-center justify-center text-lg text-gray-500">
            <GrStatusInfo size={20}/>
          </span>
          <span className="ml-3 ">Status</span>
        </Link>
      </li>
      
      <li className="my-px">
        <Link to="/admincategory" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700  hover:text-white">
          <span className="flex items-center justify-center text-lg text-gray-500">
            <FaMobileAlt size={20}/>
          </span>
          <span className="ml-3 ">Conditions</span>
        </Link>
      </li>
      <li className="my-px">
        <Link to="/testimonials" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700  hover:text-white">
          <span className="flex items-center justify-center text-lg text-gray-500">
            <MdOutlineRateReview size={20}/>
          </span>
          <span className="ml-3 ">Testimonials</span>
        </Link>
      </li>
      <li className="my-px">
        <Link to="/adminsetting" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700 hover:text-white">
          <span className="flex items-center justify-center text-lg text-gray-500">
            <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          <span className="ml-3">Settings</span>
        </Link>
      </li>
      <li className="my-px">
        <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Account</span>
      </li>
      <li className="my-px">
        <Link to="/adminprofile" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700 hover:text-white">
          <span className="flex items-center justify-center text-lg text-gray-500">
            <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          <span className="ml-3 ">Profile</span>
        </Link>
      </li>
      
      {/* <li className="my-px">
        <a href="#" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700">
          <span className="flex items-center justify-center text-lg text-gray-500">
            <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </span>
          <span className="ml-3">Notifications</span>
          <span className="flex items-center justify-center text-sm text-red-500 font-semibold bg-red-300 h-6 px-2 rounded-full ml-auto">10</span>
        </a>
      </li> */}
      
      <li className="my-px">
        <p onClick={()=>logout()} className="flex cursor-pointer flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700 hover:text-white">
          <span className="flex items-center justify-center text-lg text-red-400">
            <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          </span>
          <span className="ml-3 ">Logout</span>
        </p>
      </li>
    </ul>
  </div>
</div>

    </div>
  )
}
