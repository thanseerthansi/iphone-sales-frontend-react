import React, { useContext, useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiMenuAltLeft,} from 'react-icons/bi';
import { FaSearch,FaSortDown } from 'react-icons/fa';
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Simplecontext } from './Simplecontext';
export default function Adminselledphone() {
    const {accesscheck} =useContext(Simplecontext)
    let isMobileDevice = window.matchMedia("only screen and (max-width: 768px)").matches;
    const [showsidebar,setshowsidebar]=useState(false)
    const [search,setsearch]=useState('')
    const [orders,setorders]= useState('')
    const [nextorder,setnextorder]=useState('')
    const [orderproduct,setorderproduct]= useState('')
    const [productmodal,setproductmodal]=useState(false)
    const [statusdata,setstatusdata]=useState([])

    useEffect(() => {
        getorders()
        getstatus()
        accesscheck()
        const getData = setTimeout(() => {    
            searchproduct()
            }, 1000)
        return () => clearTimeout(getData)
    }, [search]) 
    const notifyerror = () => toast.error(' Something went wrong', {
        position: "top-center",
        });
    const notifydelete = (msg) => toast.success(msg, {
        position: "top-center",
        });

    const getorders=async()=>{
        let data = await Callaxios("get","/selling/sellorder/")
        if (data.status===200){
            // console.log("statusdata",data)
            setorders(data.data.results)
            setnextorder(data.data.next)
        }else{
            notifyerror()
        }
    }
    const changestatus=async(itmid,value)=>{
        let data = await Callaxios("post","/selling/sellorder/",[{"id":itmid,"status":value}])
        if (data.data.Status===200){
            // console.log("updatestatus",data)
            // notifydelete("Updated Successfully")
            getorders()
            // setorders(data.data.results)
            // setnextorder(data.data.next)
        }else{
            notifyerror()
        }
    }
    const getnextorders=async()=>{
        let data = await Callaxios("next",nextorder)
        if (data.status===200){
            // console.log("statusdata",data)
            setnextorder(data.data.next)
            setorders(orders=>[...orders,...data.data.results])
        }else{
            notifyerror()
        }
    }

    const getorderproduct=async(order_id)=>{
        let data = await Callaxios("get","/selling/sellproduct/",{"order_id":order_id})
        if (data.status===200){
            // console.log("orderproduct",data)
            setorderproduct(data.data)
            setproductmodal(!productmodal)
        }else{
            notifyerror()
        }
    }
    const searchproduct = async()=>{
        if(search.includes('Z')===true){
            let searchdata = search.split('Z')[1]
            let data = await Callaxios("get","/selling/sellorder/",{"id":searchdata})
            if (data.status===200){
                setorders(data.data.results)
                setnextorder(data.data.next)
            }else{
                notifyerror()
            }
       }
    //    else{console.log("nosearcg")}
    }
    const searchorderbystatus = async(status)=>{
            let data = await Callaxios("get","/selling/sellorder/",{"status":status})
            if (data.status===200){
                setorders(data.data.results)
                setnextorder(data.data.next)
            }else{
                notifyerror()
            }
    }
    const deletefunction = async(itmid,k)=>{
        let datalist ={"id":JSON.stringify([itmid])}
        let data = await Callaxios("delete","/selling/sellorder/",datalist)
        // console.log("datdelete",data)
        if(data.data.Status===200){
           let splc = orders
           splc.splice(k,1)
           setorders(() => [ ...splc]);
           notifydelete("Deleted Successfully")

        }else{
            notifyerror()
        }
    }
    const setallnull=()=>{
       
    }
    const getstatus = async()=>{
        let data = await Callaxios("get","/product/status/")
        if (data.status===200){
            // console.log("statusdata",data)
            setstatusdata(data.data)
        }else{
            notifyerror()
        }
    }
    const submitdeleteorder = (itemid,k) => {
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
            <button onClick={()=>setshowsidebar(!showsidebar)} className='text-black pl-2  pt-4 '><BiMenuAltLeft size={26} />
            </button>
            :null} 
            </div>
                
                <div className='md:p-8  pt-4'>
                <ToastContainer />
                    <div className='p-4 rounded-lg md:h-[90vh] h-[85vh] md:w-[78%]  w-[94%] fixed overflow-auto shadow-md bg-[#f9f8f6]'>
                    <b className='text-red-600 '>Selled Orders</b>
                    {/* search start */}
                    <div className='grid grid-cols-2'>
                        <div className='col-span-1'>
                            <div className="mb-3 xl:w-96 ">
                                <div className="form-icon relative mt-2 flex border border-gray-500 rounded-lg ">
                                    <i className="w-4 h-4 absolute top-3 left-4"><FaSearch size={18} color='grey'  /></i>
                                    <input name="text" id="search" type="search" onChange={(e)=>setsearch(e.target.value)} className="form-input pl-11 border-none" placeholder="Search by Sn.No" />
                                    {/* <button  className='bg-blue-600 hover:bg-blue-400 px-3 rounded-r-md'><FaSearch size={20} color='white' /></button> */}
                                </div>                      
                            </div>           
                        </div>
                        
                        <div className='col-span-1 flex items-center'>
                            <div className=''>
                                <b>Sort by : </b>
                                <select onChange={(e)=>searchorderbystatus(e.target.value)} className='border  border-gray-600 p-2 rounded'>
                                    <option value={''} className=''>ALL</option>
                                    {statusdata.map((itm,k)=>(
                                        <option key={k} className='uppercase'  value={itm.id} >{itm.status}</option>
                                    ))}
                                </select>
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
                            <th className="px-4 py-3 border border-gray-300">#</th>
                            <th className="px-4 py-3 border border-gray-300">Sn.No</th>
                            <th className="px-4 py-3 border border-gray-300">Customer</th>
                            <th className="px-4 py-3 border border-gray-300">Contact</th>
                            <th className="px-4 py-3 border border-gray-300">Delivery Address</th>
                            <th className="px-4 py-3  border border-gray-300 ">Status</th>
                            <th className="px-4 py-3  border border-gray-300 ">Purchased On</th>
                            <th className="px-4 py-3  border border-gray-300 ">Products</th>
                            <th className="px-4 py-3  border border-gray-300 ">Delete</th>
                        </tr>
                        </thead>
                        <tbody className="text-sm font-normal text-gray-700 ">
                        {orders ? orders.map((itm,k)=>(
                            <tr key={k} className="py-10 border-b border-gray-200 hover:bg-gray-100 ">                               
                                <td className="px-4 py-4 border border-gray-300">{k+1}</td>
                                <td className="px-4 py-4 border border-gray-300 ">SN{itm.created_date.split('T')[1].split('.')[1]}{itm.id}</td>
                                <td className="  px-4 py-4 border border-gray-300">{itm.customer_name}</td>
                                <td className="px-4 py-4 border border-gray-300">{itm.contact} </td>
                                <td className="px-4 py-4 border border-gray-300">{itm.address}</td>
                                <td className="px-4 py-4 border border-gray-300">
                                    <div>
                                    <span className='rounded p-1 uppercase' style={{backgroundColor:itm.status[0].code}}><b className='text-white'>{itm.status[0].status}</b></span>
                                    </div>
                                    <div className='pt-2'>
                                        <select onChange={(e)=>changestatus(itm.id,e.target.value)} className='border border-gray-500 rounded '>
                                            <option value={''} hidden>Change Status</option>
                                            {statusdata.length ? statusdata.map((statusitm,k1)=>(
                                            <option key={k1} className='uppercase'   value={statusitm.status} >{statusitm.status}</option>
                                            )) :null}
                                        </select>
                                    </div>    
                                </td>
                                <td className="px-4 py-4 border border-gray-300">{itm.created_date.split('T')[0]}</td>
                                <td className="px-4 py-4 border border-gray-300"><button onClick={()=>getorderproduct(itm.id) } className='rounded p-1 bg-gray-600 flex text-white hover:bg-slate-400' >Products<FaSortDown/></button></td>
                                <td className="px-4 py-4 border border-gray-300">
                                <ul >
                                    <li onClick={()=>submitdeleteorder(itm.id,k)} className='pt-1'><button className='bg-red-700 rounded-lg flex text-white p-1 hover:bg-red-600'><RiDeleteBin6Line size={18}/>delete</button></li>
                                </ul>
                                </td>
                            </tr>
                                                    
                         )) :null} 

                        </tbody>
                    </table>
                    </div>
                    <div className="flex flex-col items-center w-full px-4 py-2 space-y-2 text-sm text-gray-500 sm:justify-between sm:space-y-0 sm:flex-row">
                    <div className="flex items-center justify-between space-x-2">
                        {/* <a href="#" className="hover:text-gray-600">Load More</a> */}
                        <div className="flex flex-row space-x-1">
                        <button onClick={()=>getnextorders()} className={nextorder ? `flex px-2 py-px text-white rounded-md  border bg-blue-600 hover:bg-blue-400 border-blue-400`:` px-2 py-px text-white rounded-md hidden border bg-blue-600 hover:bg-blue-400 border-blue-400`}>Load More...</button>
                        
                        </div>
                        
                    </div>
                    </div>
                    </div>


                    {/* Dashboard home end */}

                    </div>
                   
                </div>
                {/* product modal start */}
                <div className={`modal eas duration-300 fixed z-40 top-0  ${productmodal ? "-translate-y-0" : "-translate-y-full"} left-0  transition-all w-full  h-screen outline-none overflow-x-hidden overflow-y-auto`} id="exampleModalScrollable" tabIndex={-1} aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable h-full relative w-auto pointer-events-none">
                    <div className="modal-content border-none h-full shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                            Reviews
                        </h5>
                        <button type="button" onClick={()=>setproductmodal(!productmodal) & setallnull()} className="btn-close box-content w-4 h-4 p-1 text-gray-500    hover:text-red-600 "><b>X</b></button>
                        </div>
                        {/* <input onChange={(e)=>setsearchcheck(e.target.value)} value={searchcheck} type='text' placeholder='search'/> */}
                        {/* data start */}
                        <section className="relative md:py-10 py-16  bg-white dark:bg-slate-900">
                            <div className="container">
                           
                            <div className="mt-6  rounded-md">
                    <table className="w-full border border-collapse table-auto">
                        <thead >
                        <tr className="text-base font-bold text-left bg-gray-50">
                            <th className="px-4 py-3 border-b-2 border-cyan-500">#</th>
                            <th className="px-4 py-3 border-b-2 border-blue-500">Product</th>
                            <th className="px-4 py-3 border-b-2 border-green-500">Price</th>
                            <th className="px-4 py-3 border-b-2 border-red-500">Condition</th>
                            <th className="px-4 py-3  border-b-2 border-yellow-500 ">Storage</th>
                            {/* <th className="px-4 py-3 border-b-2 border-cyan-500">Color</th> */}
                            <th className="px-4 py-3 border-b-2 border-blue-500">Quantity</th>
                        </tr>
                        </thead>
                        <tbody className="text-sm font-normal text-gray-700">
                        {orderproduct ? orderproduct.map((itm,k)=>(

                        
                        <tr key={k} className="py-10 border-b border-gray-200 hover:bg-gray-100 ">
                            
                        <td className="px-4 py-4 ">{k+1}</td>
                            <td className="flex flex-row items-center px-4 py-4">{itm.product[0].model_name}</td>
                            <td className="px-4 py-4">AED {itm.price}</td>
                            <td className="px-4 py-4">{itm.condition}</td>
                            <td className="px-4 py-4">{itm.storage} GB</td>
                            {/* <td className="px-4 py-4"><p className='rounded-full w-7 h-7 'style={{backgroundColor:itm.color}}></p   ></td> */}
                            <td className="px-4 py-4">{itm.quantity}</td>
                        </tr>
                        )) :null}

                        </tbody>
                    </table>
                    </div>
                            </div>{/*end container*/}
                            
                            {/*end container*/}
                            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                    <button type="button" onClick={()=>setproductmodal(!productmodal) & setallnull()} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
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
                {/* product modal end */}
            </div>

        </div>

    </div>


</div>
  )
}
