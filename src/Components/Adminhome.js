import React, { useContext, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { BiMenuAltLeft } from 'react-icons/bi';
import { MdToday } from 'react-icons/md';
import { useEffect } from 'react';
import Callaxios from './Callaxios';
import { Simplecontext } from './Simplecontext';
export default function Adminhome() {
    const {accesscheck} =useContext(Simplecontext)
    let isMobileDevice = window.matchMedia("only screen and (max-width: 768px)").matches;
    const [showsidebar,setshowsidebar]=useState(false)
    const [orders,setorders]=useState([])
    const [sellorders,setsellorders]=useState([])
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let newdate = today.toISOString();
    useEffect(()=>{
        getorders()
        getsellorders()
        accesscheck()
        window.scrollTo(0, 0);
    },[])
    const getorders = async()=>{
        accesscheck()
        let data = await Callaxios("get","purchase/orderfull/")
        if (data.status===200){
            // console.log("dta",data.data)
            setorders(data.data)
            
        }   
    }
    const getsellorders = async()=>{
        accesscheck()
        let data = await Callaxios("get","selling/sellfullorder/")
        if (data.status===200){
            // console.log("dta",data.data)
            setsellorders(data.data)
        }
    }
  return (
    <div>
        <div className='bg-[#f2f2f2] fixed h-screen w-screen '>
            <div className='grid md:grid-cols-8 '>
            <div className='md:col-span-1'>
                <div className={isMobileDevice? `${showsidebar ? 'translate-x-0':'-translate-x-full'}  modal eas duration-300  z-40 top-0 fixed  overflow-y-auto `:' modal eas top-0 fixed overflow-y-auto -translate-x-0 z-40 '}>
                <AdminSidebar show={showsidebar} setshow={setshowsidebar}/>
                </div></div>
                <div className='md:col-span-7 md:pl-12 md:pt-4 container'>
                <div className='flex justify-start'> 
                {isMobileDevice? 
                <button onClick={()=>setshowsidebar(!showsidebar)} className='text-black pl-2  pt-4 '><BiMenuAltLeft size={26} />
                </button>
                :null} 
                </div>
                    
                    <div className='md:p-8  pt-4'>
                    
                        <div className=' rounded-lg h-[90vh]   overflow-y-auto shadow-md bg-[#f9f8f6]'>
                        {/* Dashboard home start */}
                        <div className='grid grid-cols-12 mb-8 p-5'>
                            <div className='md:col-span-4 p-5 col-span-12 '>
                            <div className="w-auto shrink-0 rounded-lg bg-gradient-to-br shadow-md from-blue-300 to-blue-900 p-[3px]">
                                <div className="rounded-lg bg-white p-3 dark:bg-navy-700">
                                    <div className="flex items-center justify-between">
                                    <b>New Orders</b>
                                    
                                    </div>
                                    <div className="mt-4 flex items-end justify-between">
                                    <p className="text-xl font-medium text-slate-700 dark:text-navy-100">
                                    <MdToday size={35} color=""/>
                                    </p>
                                    <b className='text-stone-700 text-4xl'>{orders.filter(e => e.status[0].status.toUpperCase() === 'NEW').length}</b>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className='md:col-span-4 p-5 col-span-12'>
                            <div className="w-auto shrink-0 rounded-lg bg-gradient-to-br shadow-md from-blue-300 to-blue-900 p-[3px]">
                                <div className="rounded-lg bg-white p-3 dark:bg-navy-700">
                                    <div className="flex items-center justify-between">
                                    <b>Today Orders</b>
                                    
                                    </div>
                                    <div className="mt-4 flex items-end justify-between">
                                    <p className="text-xl font-medium text-slate-700 dark:text-navy-100">
                                    <MdToday size={35} color=""/>
                                    </p>
                                    <b className='text-stone-700 text-4xl'>{orders.filter(e =>e.created_date.split('T')[0]===newdate.split('T')[0]).length}</b>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className='md:col-span-4 p-5 col-span-12 '>
                            <div className="w-auto shrink-0 rounded-lg bg-gradient-to-br shadow-md from-blue-400 to-blue-900 p-[3px]">
                                <div className="rounded-lg bg-white p-3 dark:bg-navy-700">
                                    <div className="flex items-center justify-between">
                                    <b>Total Orders</b>
                                    
                                    </div>
                                    <div className="mt-4 flex items-end justify-between">
                                    <p className="text-xl font-medium text-slate-700 dark:text-navy-100">
                                    <MdToday size={35} color=""/>
                                    </p>
                                    <b className='text-stone-700 text-4xl'>{orders.length}</b>
                                    </div>
                                </div>
                            </div>
                            </div>
                            
                            
                            <div className='md:col-span-4 p-5 col-span-12 '>
                            <div className="w-auto shrink-0 rounded-lg bg-gradient-to-br shadow-md from-amber-400 to-orange-600 p-[3px]">
                                <div className="rounded-lg bg-white p-3 dark:bg-navy-700">
                                    <div className="flex items-center justify-between">
                                    <b>New Sell Orders</b>
                                    
                                    </div>
                                    <div className="mt-4 flex items-end justify-between">
                                    <p className="text-xl font-medium text-slate-700 dark:text-navy-100">
                                    <MdToday size={35} color=""/>
                                    </p>
                                    <b className='text-stone-700 text-4xl'>{sellorders.filter(e => e.status[0].status.toUpperCase() === 'NEW').length}</b>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className='md:col-span-4 p-5 col-span-12 '>
                            <div className="w-auto shrink-0 rounded-lg bg-gradient-to-br shadow-md from-amber-400 to-orange-600 p-[3px]">
                                <div className="rounded-lg bg-white p-3 dark:bg-navy-700">
                                    <div className="flex items-center justify-between">
                                    <b>Today Sell Orders</b>
                                    
                                    </div>
                                    <div className="mt-4 flex items-end justify-between">
                                    <p className="text-xl font-medium text-slate-700 dark:text-navy-100">
                                    <MdToday size={35} color=""/>
                                    </p>
                                    <b className='text-stone-700 text-4xl'>{sellorders.filter(e =>e.created_date.split('T')[0]===newdate.split('T')[0]).length}</b>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className='md:col-span-4    p-5 col-span-12'>
                            <div className="w-auto shrink-0 rounded-lg bg-gradient-to-br shadow-md from-amber-400 to-orange-600 p-[3px]">
                                <div className="rounded-lg bg-white p-3 dark:bg-navy-700">
                                    <div className="flex items-center justify-between">
                                    <b>Total Sell Orders</b>
                                    
                                    </div>
                                    <div className="mt-4 flex items-end justify-between">
                                    <p className="text-xl font-medium text-slate-700 dark:text-navy-100">
                                    <MdToday size={35} color=""/>
                                    </p>
                                    <b className='text-stone-700 text-4xl'>{sellorders.length}</b>
                                    </div>
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
