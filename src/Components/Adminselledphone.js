import React, { useContext, useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar';
import { GrAddCircle } from 'react-icons/gr';
import { MdPhoneIphone } from 'react-icons/md';
import { ImPriceTags } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiMenuAltLeft,BiText } from 'react-icons/bi';
import { FaSearch,FaRegImage,FaRegImages,FaEdit } from 'react-icons/fa';
import { Simplecontext } from './Simplecontext';
export default function Adminselledphone() {
    const {accesscheck} =useContext(Simplecontext)
    let isMobileDevice = window.matchMedia("only screen and (max-width: 768px)").matches;
    const [showsidebar,setshowsidebar]=useState(false)
    const [search,setsearch]=useState()
    const [cartmodal,setcartmodal]=useState(false)
    const [status,setstatus]=useState('')
    useEffect(() => {
        accesscheck()
    }, [])
    
    
    const setallnull=()=>{
        setstatus('')
    }
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
                    <b className='text-red-600 '>SellOrder</b>
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
                    <div className='col-span-1 flex items-center justify-end  '>
                        <div className=' '>
                            <button onClick={()=>setcartmodal(!cartmodal)} className=' p-2 rounded-md flex text- bg-green-500 hover:bg-green-400'><GrAddCircle size={25} color='white'/><b>New</b> </button>
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
                     {/* add modal  start */}
                     <div className={`modal eas duration-300 fixed z-40 top-0  ${cartmodal ? "-translate-x-0" : "translate-x-full"} left-0  transition-all w-full  h-screen outline-none overflow-x-hidden overflow-y-auto`} id="exampleModalScrollable" tabIndex={-1} aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable h-full relative w-auto pointer-events-none">
                    <div className="modal-content border-none h-full shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                            Add New Product
                        </h5>
                        <button type="button" onClick={()=>setcartmodal(!cartmodal) & setallnull()} className="btn-close box-content w-4 h-4 p-1 text-gray-500    hover:text-red-600 "><b>X</b></button>
                        </div>
                        {/* <input onChange={(e)=>setsearchcheck(e.target.value)} value={searchcheck} type='text' placeholder='search'/> */}
                        {/* data start */}
                        <section className="relative md:py-10 py-16  bg-white dark:bg-slate-900">
                            <div className="container">
                           
                                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                                <div className="lg:col-span-12 md:col-span-12">
                                    <div className="grid grid-cols-1 gap-[10px]">
                                    
                                    <form   className='pt-5' >
                                        <p className="mb-0" id="error-msg" />
                                        <div id="" />
                                        
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="name" className="font-semibold">Model Name:</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><MdPhoneIphone size={18} /></i>
                                                {/* <input onChange={(e)=> setproductdata({...productdata,model_name:e.target.value}) } className="form-input pl-11"  type='text' placeholder='search'/> */}
                                                <input type='text' onChange={(e)=>setstatus(e.target.value)} value={status} className='form-input pl-11' placeholder='status'/>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="email" className="font-semibold">Sell Price <span className='text-gray-500'>(storage-condition-price,...)</span></label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><ImPriceTags size={18} /></i>
                                                <input   name="price" id="price" type="price" className="form-input pl-11" placeholder="Storage-condition-price,eg:(128 GB-good-13000,..)" />
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="contact" className="font-semibold">Purchase Price <span className='text-gray-500'>(storage-condition-price,...)</span></label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><ImPriceTags size={18} /></i>
                                                <input  name="buyprice" id="buyprice" type="buyprice" className="form-input pl-11" placeholder="Storage-condition-price,eg:(128 GB-good-13000,..)" />
                                                </div>
                                            </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="email" className="font-semibold">Description</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><BiText  size={18} /></i>
                                                <textarea   className='form-input pl-11' placeholder='description'/>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            {/* <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="contact" className="font-semibold">Add Image</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><FaRegImage size={18} /></i>
                                                <input name="file" id="file" type="file" className="form-input pl-11" placeholder="Storage-condition-price,eg:(128-good-13000,..)" />
                                                </div>
                                            </div>
                                            </div> */}
                                            
                                        </div>
                                       
                                        {/* <button type="submit" id="submit" name="send" className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md justify-center flex items-center">Send Message</button> */}
                                        <div className='flex justify-end' ><button type="submit" className='w-64 p-2 bg-green-700 rounded-md  text-white hover:bg-green-900'>Submit</button></div>
                                        </form>
                                    </div>{/*end grid*/}
                                </div>{/*end col*/}
                                <div className="lg:col-span-6 md:col-span-6 ">
                                    <div className="sticky top-20 w-50">
                                    <div className="grid lg:grid-cols-12 grid-cols-1 gap-[30px]">
                                    
                                    
                                        {/*end col*/}
                                    </div>{/*end grid*/}
                                    </div>
                                </div>{/*end col*/}
                                </div>{/*end grid*/}
                            </div>{/*end container*/}
                            
                            {/*end container*/}
                            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                    <button type="button" onClick={()=>setcartmodal(!cartmodal) } className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    {/* <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                        Save changes
                                    </button> */}
                                    </div>
                            </section>
                                    {/* cart data end */}
                                    
                    </div>
                    </div>
            </div>
                    {/* add modal  end */}
                </div>
            </div>

        </div>

    </div>


</div>
  )
}
