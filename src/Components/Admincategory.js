import React, { useContext, useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar';
import { GrAddCircle,GrStatusCritical } from 'react-icons/gr';
// import { MdPhoneIphone,MdOutlineFormatColorFill } from 'react-icons/md';
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

export default function Admincategory() {
    let isMobileDevice = window.matchMedia("only screen and (max-width: 768px)").matches;
    const {accesscheck} =useContext(Simplecontext)
    const [showsidebar,setshowsidebar]=useState(false)
    // const [search,setsearch]=useState()
    const [conditiondata,setconditiondata]=useState([])
    const [addmodal,setaddmodal]=useState(false)
    const [editcondition,seteditcondition]=useState('')
    const [condition,setcondition]=useState('')
    const [description,setdescription]=useState('')
    const [descriptionstring,setdescriptionstring]=useState('')
    // console.log("gsadugv",description)
    // const [colorcode,setcolorcode]=useState('')
    useEffect(() => {
        window.scrollTo(0, 0);
        accesscheck()
        getcondition()
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
    const notifyaddfield = (msg) => toast.error(msg, {
        position: "top-center",
        });
    const notifydelete = () => toast.success(' deleted Successfully ', {
        position: "top-center",
        });

    const getcondition = async()=>{
        accesscheck()
        let data = await Callaxios("get","product/condition/")
        if (data.status===200){
            // console.log("conditiondata",data)
            setconditiondata(data.data)
        }else{
            notifyerror()
        }
    }
    const addcondition=async(e)=>{
        accesscheck()
        e.preventDefault(); 
        if (descriptionstring){
            // console.log("datacondition",condition.toUpperCase())
            let datalist={"condition":condition.toUpperCase(),"description":descriptionstring}
            if(editcondition){
                // console.log("dfsdffs",editcondition)
                datalist.id=editcondition.id
            }
            // console.log("dataaaaaaaaaaalist",datalist)
            let data = await Callaxios("post","product/condition/",datalist)
            // console.log("dataresponse",data)
            if (data.data.Status===200){
                if(editcondition){
                    notifyupdated()
                }else{notifyadded()}
                setallnull()
                setaddmodal(!addmodal)
                getcondition()
                
                
            }else{
                notifyerror()
            }
        }else{
            notifyaddfield("Add Description")
        }
        }
    const functioneditcondition=(itm)=>{
        accesscheck()
        seteditcondition(itm)
        // setcolorcode(itm.code)
        setdescriptionstring(itm.description)
        // setdescription(itm.description)
        setcondition(itm.condition)
        setaddmodal(!addmodal)
    }
    const deletefunction = async(itmid,k)=>{
        accesscheck()
        // console.log("idddddd",itmid)
        let data = await Callaxios("delete","product/condition/",{"id":JSON.stringify([itmid])})
        if(data.data.Status===200){
           let splc = conditiondata
           splc.splice(k,1)
           setconditiondata(() => [ ...splc]);
           notifydelete()

        }else{
            notifyerror()
        }
    }
    const setallnull=()=>{
        setcondition('')
        setdescription('')
        // setcolorcode('')
        seteditcondition('')
        setdescriptionstring('')
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
    const adddescriptiofctn=()=>{
        // console.log("data",description)
        if ( description ){
            let string = descriptionstring
            // console.log("string",string)
            let result =''
            if (string){
                // console.log("stryn")
                result = string.concat(",",description)
            }else{
                // console.log("not")
                result = description 
            }
            // console.log("string",result)
            setdescriptionstring(result)
            setdescription('')
        }else{
            notifyaddfield("Add Description ")
        }
        
    }
    const deletestringfunction =(k)=>{
        let array =[]
        let string = descriptionstring
        // let slice = string.slice(k,1)
        string.split(',').forEach(element=>
            array.push(element)
        )
        array.splice(k,1)
        setdescriptionstring(array.toString())
        // console.log("arrya",array.toString())
    }
  return (
    <div>
    <div className='bg-[#f2f2f2]  fixed h-screen w-screen'>
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
                    <div className='p-4 rounded-lg md:h-[90vh] h-[85vh] md:w-[78%]  w-[94%] fixed overflow-auto  shadow-md bg-[#f9f8f6]'>
                    <b className='text-red-600 '>Phone Conditions</b>
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
                        
                    <div className='col-span-1 flex items-center justify-end'>
                        <div className=' '>
                            <button onClick={()=>setaddmodal(!addmodal)} className=' p-2 rounded-md flex text- bg-green-500 hover:bg-green-400'><GrAddCircle size={25} color='white'/><b>New</b> </button>
                        </div>
                    </div>
                    </div>
                    
                    {/* Dashboard home start */}
                    <div className=" mx-auto overflow-auto">

                    <div className="mt-6  rounded-md">
                    <table className="w-full border border-collapse table-auto">
                        <thead >
                        <tr className="text-base font-bold text-left bg-gray-50">
                            <th className="px-4 py-3 border border-gray-300">#</th>
                            <th className="px-4 py-3 border border-gray-300">Condition</th>
                            {/* <th className="px-4 py-3 border-b-2 border-green-500">Color</th> */}
                            <th className="px-4 py-3 border border-gray-300"> Description</th>
                            <th className="px-4 py-3 border border-gray-300">Action</th>
                           
                        </tr>
                        </thead>
                        <tbody className="text-sm font-normal text-gray-700">
                        {conditiondata.length?conditiondata.map((itm,k)=>(
                            <tr key={k} className="py-10 border-b border-gray-200 hover:bg-gray-100">
                                
                                <td className="px-4 py-4 border border-gray-300">{k+1}</td>
                                    <td className="px-4 py-4 border border-gray-300 capitalize">{itm.condition}
                                    </td>
                                    {/* <td className="px-4 py-4 "><span  className = {`rounded p-1 text-white`} style={{backgroundColor: `${itm.code}` }}>{itm.code}</span></td> */}
                                    <td className="px-4 py-4 border border-gray-300 ">
                                    {itm.description.split(',').map((citem,k1)=>(
                                        <ul key={k1} className='list-outside list-disc flex pl-3'>
                                        <li className='capitalize'>{citem}</li></ul>
                                    ))}
                                    </td>
                                    <td className="px-4 py-4 border border-gray-300">
                                    <ul >
                                            <li><button onClick={()=>functioneditcondition(itm) }  className='bg-yellow-500 rounded-lg flex text-white p-1 hover:bg-yellow-400' ><FaEdit size={18}/>edit</button></li>
                                            <li onClick={()=>submitdeleteproduct(itm.id,k)} className='pt-1'><button className='bg-red-700 rounded-lg flex text-white p-1 hover:bg-red-600'><RiDeleteBin6Line size={18}/>delete</button></li>
                                        </ul>
                                    </td>
                                
                            </tr>
                        )):<tr className='text-center' ><td colSpan={4} rowSpan={2}>No data found</td></tr>} 
                            

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
                     <div className={`modal eas duration-300 fixed z-40 top-0  ${addmodal ? "-translate-x-0" : "translate-x-full"} left-0  transition-all w-full  h-screen outline-none overflow-x-hidden overflow-y-auto`} id="exampleModalScrollable" tabIndex={-1} aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable h-full relative w-auto pointer-events-none">
                    <div className="modal-content border-none h-full shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                            Add New Condition
                        </h5>
                        <button type="button" onClick={()=>setaddmodal(!addmodal) & setallnull()} className="btn-close box-content w-4 h-4 p-1 text-gray-500    hover:text-red-600 "><b>X</b></button>
                        </div>
                        {/* <input onChange={(e)=>setsearchcheck(e.target.value)} value={searchcheck} type='text' placeholder='search'/> */}
                        {/* data start */}
                        <section className="relative md:py-10 py-16  bg-white dark:bg-slate-900">
                            <div className="container">
                           
                                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                                <div className="lg:col-span-12 md:col-span-12">
                                    <div className="grid grid-cols-1 gap-[10px]">
                                    
                                    <form onSubmit={(e)=>addcondition(e)}   className='pt-5' >
                                        <p className="mb-0" id="error-msg" />
                                        <div id="" />
                                        
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="name" className="font-semibold">Condition</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><GrStatusCritical size={18} /></i>
                                                {/* <input onChange={(e)=> setproductdata({...productdata,model_name:e.target.value}) } className="form-input pl-11"  type='text' placeholder='search'/> */}
                                                <input type='text' required onChange={(e)=>setcondition(e.target.value)} value={condition} className='form-input pl-11' placeholder='Good/bad/....'/>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                               
                                                <label htmlFor="contact" className="font-semibold">Description</label>
                                                {descriptionstring ? <>
                                                {descriptionstring.split(',').map((itm,k)=>(
                                                    
                                                    <ul key={k} className='list-outside list-disc flex pl-5'>
                                                    <li className='capitalize'>{itm}</li>
                                                    <button type='button' onClick={()=>deletestringfunction(k)} className='pl-4 hover:text-red-600'><RiDeleteBin6Line size={15}/></button>
                                                    </ul> 
                                                
                                                ))}
                                                </>:null}
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><BiText  size={18} /></i>
                                                <textarea onChange={(e)=>setdescription(e.target.value)}  value={description} name="text" id="text" type="text" className="form-input pl-11" placeholder="description (Add one by one)" />
                                                <div className='flex justify-end'>
                                                <button type='button'  onClick={()=>adddescriptiofctn()} className='bg-blue-600 text-white p-2 rounded '>Add Another</button>
                                                </div></div>
                                                
                                            </div>
                                            </div>
                                        </div>
                                        {/* <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="contact" className="font-semibold">Add Color</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><MdOutlineFormatColorFill size={18} /></i>
                                                <input onChange={(e)=>setcolorcode(e.target.value)} value={colorcode} name="color" id="color" type="color" className="form-input pl-11" placeholder="color" />
                                                </div>
                                            </div>
                                            </div>
                                            
                                        </div> */}
                                       
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
                                    <button type="button" onClick={()=>setaddmodal(!addmodal) & setallnull() } className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
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