import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar';
import { BiMenuAltLeft } from 'react-icons/bi';

export default function Adminselledphone() {
    let isMobileDevice = window.matchMedia("only screen and (max-width: 768px)").matches;
    const [showsidebar,setshowsidebar]=useState(false)
  return (
    <div>
    <div className='bg-[#2e2e2e] fixed h-screen w-screen'>
        <div className='grid md:grid-cols-5 '>
        <div className='md:col-span-1'>
            <div className={isMobileDevice? `${showsidebar ? 'translate-x-0':'-translate-x-full'}  modal eas duration-300  z-40 top-0 fixed  overflow-y-auto `:' modal eas top-0 fixed overflow-y-auto -translate-x-0 z-40 '}>
            <AdminSidebar show={showsidebar} setshow={setshowsidebar}/>
            </div></div>
            <div className='md:col-span-4 md:pl-12 md:pt-4 container'>
            <div className='flex justify-start'> 
            {isMobileDevice? 
            <button onClick={()=>setshowsidebar(!showsidebar)} className='text-white pl-2  pt-4 '><BiMenuAltLeft size={26} />
            </button>
            :null} 
            </div>
                
                <div className='md:p-8  pt-4'>
                
                    <div className='p-4 rounded-lg md:h-[90vh] h-[85vh] md:w-[70%]  w-[94%] fixed overflow-auto  bg-[#f9f8f6]'>
                    <b className='text-red-600 '>Sells</b>
                    {/* Dashboard home start */}
                    <div className=" mx-auto">

                    <div className="mt-6 overflow-x-auto rounded-md">
                    <table className="w-full border border-collapse table-auto">
                        <thead >
                        <tr className="text-base font-bold text-left bg-gray-50">
                            <th className="px-4 py-3 border-b-2 border-cyan-500">#</th>
                            <th className="px-4 py-3 border-b-2 border-blue-500">Customer</th>
                            <th className="px-4 py-3 border-b-2 border-green-500">Contact</th>
                            <th className="px-4 py-3 border-b-2 border-red-500">Order No</th>
                            <th className="px-4 py-3  border-b-2 border-yellow-500 ">Purchased On</th>
                        </tr>
                        </thead>
                        <tbody className="text-sm font-normal text-gray-700">
                            
                        <tr className="py-10 border-b border-gray-200 hover:bg-gray-100">
                            
                        <td className="px-4 py-4">
                            1
                            </td>
                            <td className="flex flex-row items-center px-4 py-4">
                            
                            <div className="flex-1 ">
                                <div className="font-medium dark:text-gray-500">Barbara Curtis</div>
                                {/* <div className="text-sm text-blue-600 dark:text-gray-200">
                                Account Deactivated
                                </div> */}
                            </div>
                            </td>
                            <td className="px-4 py-4">
                            480-570-3413
                            </td>
                            <td className="px-4 py-4">
                            MX-8523537435
                            </td>
                            <td className="px-4 py-4">
                            Just Now
                            </td>
                        </tr>
                        

                        </tbody>
                    </table>
                    </div>
                    <div className="flex flex-col items-center w-full px-4 py-2 space-y-2 text-sm text-gray-500 sm:justify-between sm:space-y-0 sm:flex-row">
                    <div className="flex items-center justify-between space-x-2">
                        {/* <a href="#" className="hover:text-gray-600">Load More</a> */}
                        <div className="flex flex-row space-x-1">
                        <button className="flex px-2 py-px text-white rounded-md  border bg-blue-600 hover:bg-blue-400 border-blue-400">Load More...</button>
                        
                        </div>
                        
                    </div>
                    </div>
                    </div>


                    {/* Dashboard home end */}

                    </div>
                </div>
            </div>

        </div>

    </div>


</div>
  )
}
