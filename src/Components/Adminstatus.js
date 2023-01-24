import React, { useContext, useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar';
import { GrAddCircle,GrStatusCritical } from 'react-icons/gr';
import { MdPhoneIphone,MdOutlineFormatColorFill } from 'react-icons/md';
import { ImPriceTags } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiMenuAltLeft,BiText } from 'react-icons/bi';
import { FaSearch,FaRegImage,FaRegImages,FaEdit } from 'react-icons/fa';
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Simplecontext } from './Simplecontext';
export default function Adminstatus() {
    const {accesscheck} =useContext(Simplecontext)
    let isMobileDevice = window.matchMedia("only screen and (max-width: 768px)").matches;
    const [showsidebar,setshowsidebar]=useState(false)
    const [search,setsearch]=useState()
    const [statusdata,setstatusdata]=useState([])
    const [cartmodal,setcartmodal]=useState(false)
    const [editstatus,seteditstatus]=useState('')
    const [status,setstatus]=useState('')
    const [description,setdescription]=useState('')
    const [colorcode,setcolorcode]=useState('')
    console.log("status",status)
    useEffect(() => {
        accesscheck()
        getstatus()
    }, [])
    
    const notifyadded = () => toast.success(' Added Successfully!', {
        position: "top-center",
        });
    const notifyupdated = () => toast.success(' Updated Successfully!', {
        position: "top-center",
        });
    const notifyerror = () => toast.error(' Something went wrong', {
        position: "top-center",
        });
    const notifydelete = () => toast.success('deleted Successfully ', {
        position: "top-center",
        });

    const getstatus = async()=>{
        let data = await Callaxios("get","product/status/")
        if (data.status===200){
            // console.log("statusdata",data)
            setstatusdata(data.data)
        }else{
            notifyerror()
        }
    }
    const addstatus=async(e)=>{
        e.preventDefault(); 
        accesscheck()
        let datalist={"status":status,"code":colorcode,"description":description}
        if(editstatus){
            // console.log("dfsdffs",editstatus)
            datalist.id=editstatus.id
        }
        // console.log("dataaaaaaaaaaalist",datalist)
        let data = await Callaxios("post","product/status/",datalist)
        // console.log("dataresponse",data)
        if (data.data.Status===200){
            if(editstatus){
                notifyupdated()
            }else{notifyadded()}
            setallnull()
            setcartmodal(!cartmodal)
            getstatus()
            
            
        }else{
            notifyerror()
        }
    }
    const functioneditstatus=(itm)=>{
        seteditstatus(itm)
        setcolorcode(itm.code)
        setdescription(itm.description)
        setstatus(itm.status)
        setcartmodal(!cartmodal)
    }
    const deletefunction = async(itmid,k)=>{
        accesscheck()
        let data = await Callaxios("delete","product/status/",{"id":itmid})
        if(data.data.Status===200){
           let splc = statusdata
           splc.splice(k,1)
           setstatusdata(() => [ ...splc]);
           notifydelete()

        }else{
            notifyerror()
        }
    }
    const setallnull=()=>{
        setstatus('')
        setdescription('')
        setcolorcode('')
        seteditstatus('')
    }
    const submitdeleteproduct = (itemid,k) => {
        confirmAlert({
            title: "Confirmation",
            message: `Are you sure to delete this ?`,
            buttons: [
            {
                label: "Yes",           
                onClick:()=>deletefunction(itemid,k),
            },
            {
                label: "No"
                // onClick: () => alert("Click No")
            } 
            ],
            
        });
        };
  return (
    <div>
    <div className='bg-[#f2f2f2] fixed h-screen w-screen'>
        <div className='grid md:grid-cols-8 '>
        <div className='md:col-span-1'>
            <div className={isMobileDevice? `${showsidebar ? 'translate-x-0':'-translate-x-full'}  modal eas duration-300  z-40 top-0 fixed  overflow-y-auto `:' modal eas top-0 fixed overflow-y-auto -translate-x-0 z-40 '}>
            <AdminSidebar show={showsidebar} setshow={setshowsidebar}/>
            </div></div>
            <div className='md:col-span-7 md:pl-12 md:pt-4 container'>
            <div className='flex justify-start'> 
            {isMobileDevice? 
            <button onClick={()=>setshowsidebar(!showsidebar) & setallnull()} className='text-black pl-2  pt-4 '><BiMenuAltLeft size={26} />
            </button>
            :null} 
            </div>
                
                <div className='md:p-8  pt-4'>
                <ToastContainer />
                    <div className='p-4 rounded-lg md:h-[90vh] h-[85vh] md:w-[78%]  w-[94%] fixed overflow-auto shadow-md bg-[#f9f8f6]'>
                    <b className='text-red-600 '>Status</b>
                    {/* search start */}
                    <div className='grid grid-cols-2'>
                        <div className='col-span-1'>
                            {/* <div className="mb-3 xl:w-96 ">
                                <div className="form-icon relative mt-2 flex border border-gray-500 rounded-lg ">
                                    <i className="w-4 h-4 absolute top-3 left-4"><FaSearch size={18} color='grey'  /></i>
                                    <input name="text" id="search" type="search" onChange={(e)=>setsearch(e.target.value)} className="form-input pl-11 border-none" placeholder="Search here" />
                                    <button  className='bg-blue-600 hover:bg-blue-400 px-3 rounded-r-md'><FaSearch size={20} color='white' /></button>
                                </div>                      
                            </div> */}
                        </div>
                        
                    <div className='col-span-1 flex items-center justify-end  '>
                        <div className=' '>
                            <button onClick={()=>setcartmodal(!cartmodal)} className=' p-2 rounded-md flex text- bg-green-500 hover:bg-green-400'><GrAddCircle size={25} color='white'/><b>New</b> </button>
                        </div>
                    </div>
                    </div>
                    
                    {/* Dashboard home start */}
                    <div className=" mx-auto  overflow-auto ">

                    <div className="mt-6  rounded-md">
                    <table className="w-full border border-collapse table-auto ">
                        <thead className='' >
                        <tr className="text-base text-left font-bold  bg-gray-50">
                            <th className="px-4 py-3 border-b-2 border border-gray-300">#</th>
                            <th className="px-4 py-3 border-b-2 border border-gray-300">Status</th>
                            <th className="px-4 py-3 border-b-2 border border-gray-300">Color</th>
                            {/* <th className="px-4 py-3 border-b-2 border-red-500"> Description</th> */}
                            <th className="px-4 py-3 border-b-2 border border-gray-300">Action</th>
                           
                        </tr>
                        </thead>
                        <tbody className="text-sm font-normal text-gray-700">
                        {statusdata.map((itm,k)=>(
                            <tr key={k} className="py-10 border-b border-gray-200 hover:bg-gray-100">
                                
                                <td className="px-4 py-4 border border-gray-300">{k+1}</td>
                                    <td className="px-4 py-4 border border-gray-300">{itm.status}</td>
                                    <td className="px-4 py-4 border border-gray-300 "><span  className = 'rounded p-1 text-white ' style={{backgroundColor: `${itm.code}` }}>{itm.code}</span></td>
                                    {/* <td className="px-4 py-4">{itm.description}</td> */}
                                    <td className="px-4 py-4 border border-gray-300">
                                    <ul className='' >
                                            <li><button onClick={()=>functioneditstatus(itm) }  className='bg-yellow-500 rounded-lg flex text-white p-1 hover:bg-yellow-400' ><FaEdit size={18}/>edit</button></li>
                                            <li  className='pt-1'><button onClick={()=>submitdeleteproduct(itm.id,k)} className='bg-red-700 rounded-lg flex text-white p-1 hover:bg-red-600'><RiDeleteBin6Line size={18}/>delete</button></li>
                                        </ul>
                                    </td>
                                
                            </tr>
                        ))} 
                            

                        </tbody>
                    </table>
                    </div>
                    <div className="flex flex-col items-center w-full px-4 py-2 space-y-2 text-sm text-gray-500 sm:justify-between sm:space-y-0 sm:flex-row">
                    <div className="flex items-center justify-between space-x-2">
                        {/* <a href="#" className="hover:text-gray-600">Load More</a> */}
                        {/* <div className="flex flex-row space-x-1">
                        <button className="flex px-2 py-px text-white rounded-md  border bg-blue-600 hover:bg-blue-400 border-blue-400">Load More...</button>
                        
                        </div> */}
                        
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
                                    
                                    <form onSubmit={(e)=>addstatus(e)}   className='pt-5' >
                                        <p className="mb-0" id="error-msg" />
                                        <div id="" />
                                        
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="name" className="font-semibold">Status Name: <b className='text-red-600'>*</b></label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><GrStatusCritical size={18} /></i>
                                                {/* <input onChange={(e)=> setproductdata({...productdata,model_name:e.target.value}) } className="form-input pl-11"  type='text' placeholder='search'/> */}
                                                <input type='text' onChange={(e)=>setstatus(e.target.value)} value={status} className='form-input pl-11' placeholder='status'/>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="email" className="font-semibold">Description</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><BiText  size={18} /></i>
                                                <textarea  onChange={(e)=>setdescription(e.target.value)} value={description}  className='form-input pl-11' placeholder='description'/>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="contact" className="font-semibold">Add Color <b className='text-red-600'>*</b></label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><MdOutlineFormatColorFill size={18} /></i>
                                                <input onChange={(e)=>setcolorcode(e.target.value)} value={colorcode} name="color" id="color" type="color" className="form-input pl-11" placeholder="color" />
                                                </div>
                                            </div>
                                            </div>
                                            
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
                                    <button type="button" onClick={()=>setcartmodal(!cartmodal) & setallnull() } className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
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
