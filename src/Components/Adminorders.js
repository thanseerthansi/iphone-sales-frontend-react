import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
// import { MdToday } from 'react-icons/md';
import { GrAddCircle } from 'react-icons/gr';
import { MdPhoneIphone } from 'react-icons/md';
import { ImPriceTags } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiMenuAltLeft,BiText } from 'react-icons/bi';
import { FaSearch,FaRegImage,FaRegImages,FaEdit } from 'react-icons/fa';
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Adminorders() {
    let isMobileDevice = window.matchMedia("only screen and (max-width: 768px)").matches;
    const [showsidebar,setshowsidebar]=useState(false)
    const [search,setsearch]=useState('')
    const [orders,setorders]= useState('')
    const [orderproduct,setorderproduct]= useState('')
    // const [cartmodal,setcartmodal]=useState(false)
    const [status,setstatus]=useState('')

    useEffect(() => {
        getorders()
        getorderproduct()
   
    }, [])
    const notifyerror = () => toast.error(' Something went wrong', {
        position: "top-center",
        });
    const notifydelete = () => toast.success('✅ deleted Successfully ', {
        position: "top-center",
        });

    const getorders=async()=>{
        let data = await Callaxios("get","/purchase/order/")
        if (data.status===200){
            // console.log("statusdata",data)
            setorders(data.data)
        }else{
            notifyerror()
        }
    }
    const getorderproduct=async()=>{
        let data = await Callaxios("get","/purchase/orderedproduct/")
        if (data.status===200){
            // console.log("statusdata",data)
            setorderproduct(data.data)
        }else{
            notifyerror()
        }
    }
    const setallnull=()=>{
        setstatus('')
    }
    // const submitdeleteproduct = (itemid,k) => {
    //     confirmAlert({
    //         title: "Confirmation",
    //         message: `Are you sure to delete this ?`,
    //         buttons: [
    //         {
    //             label: "Yes",           
    //             onClick:()=>deletefunction(itemid,k),
    //         },
    //         {
    //             label: "No"
    //             // onClick: () => alert("Click No")
    //         } 
    //         ],
            
    //     });
    //     };
  return (
    <div>
    <div className='bg-[#2e2e2e] fixed h-screen w-screen'>
        <div className='grid md:grid-cols-8 '>
        <div className='md:col-span-1'>
            <div className={isMobileDevice? `${showsidebar ? 'translate-x-0':'-translate-x-full'}  modal eas duration-300  z-40 top-0 fixed  overflow-y-auto `:' modal eas top-0 fixed overflow-y-auto -translate-x-0 z-40 '}>
            <AdminSidebar show={showsidebar} setshow={setshowsidebar}/>
            </div></div>
            <div className='md:col-span-7 md:pl-12 md:pt-4 container'>
            <div className='flex justify-start'> 
            {isMobileDevice? 
            <button onClick={()=>setshowsidebar(!showsidebar)} className='text-white pl-2  pt-4 '><BiMenuAltLeft size={26} />
            </button>
            :null} 
            </div>
                
                <div className='md:p-8  pt-4'>
                
                    <div className='p-4 rounded-lg md:h-[90vh] h-[85vh] md:w-[78%]  w-[94%] fixed overflow-auto  bg-[#f9f8f6]'>
                    <b className='text-red-600 '>Orders</b>
                    {/* search start */}
                    <div className='grid grid-cols-2'>
                        <div className='col-span-1'>
                            <div className="mb-3 xl:w-96 ">
                                <div className="form-icon relative mt-2 flex border border-gray-500 rounded-lg ">
                                    <i className="w-4 h-4 absolute top-3 left-4"><FaSearch size={18} color='grey'  /></i>
                                    <input name="text" id="search" type="search" onChange={(e)=>setsearch(e.target.value)} className="form-input pl-11 border-none" placeholder="Search here" />
                                    <button  className='bg-blue-600 hover:bg-blue-400 px-3 rounded-r-md'><FaSearch size={20} color='white' /></button>
                                </div>                      
                            </div>
                        </div>
                    
                    </div>
                    {/* search end */}
                    {/* Dashboard home start */}
                    <div className=" mx-auto">

                    <div className="mt-6  rounded-md">
                    <table className="w-full border border-collapse table-auto">
                        <thead >
                        <tr className="text-base font-bold text-left bg-gray-50">
                            <th className="px-4 py-3 border-b-2 border-cyan-500">#</th>
                            <th className="px-4 py-3 border-b-2 border-blue-500">Customer</th>
                            <th className="px-4 py-3 border-b-2 border-green-500">Contact</th>
                            <th className="px-4 py-3 border-b-2 border-red-500">Delivery Address</th>
                            <th className="px-4 py-3  border-b-2 border-yellow-500 ">Status</th>
                            <th className="px-4 py-3  border-b-2 border-blue-500 ">Purchased On</th>
                            <th className="px-4 py-3  border-b-2 border-cyan-500 ">Products</th>
                            <th className="px-4 py-3  border-b-2 border-green-500 ">Delete</th>
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
