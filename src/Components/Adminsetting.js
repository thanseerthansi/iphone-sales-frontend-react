import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar';
import { GrAddCircle } from 'react-icons/gr';
import { MdPhoneIphone } from 'react-icons/md';
import { BiMenuAltLeft,BiText } from 'react-icons/bi';
import { FaEdit} from 'react-icons/fa';
import { Simplecontext } from './Simplecontext';
import { useContext } from 'react';
import { useEffect } from 'react';
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Adminsetting() {
    const {accesscheck,modeldata,getmodel,categorydata,getcategory} =useContext(Simplecontext)
    let isMobileDevice = window.matchMedia("only screen and (max-width: 768px)").matches;
    const [showsidebar,setshowsidebar]=useState(false)
    const [search,setsearch]=useState()
    const [cartmodal,setcartmodal]=useState(false)
    const [categorymodal,setcategorymodal]=useState(false)
    const [modelnames,setmodelnames]=useState('')
    const [model,setmodel]=useState('')
    const [categorynames,setcategorynames]=useState('')
    const [category,setcategory]=useState('')
    // console.log("pkdfso",modelnames)
    useEffect(() => {
        accesscheck()
            
    }, [])
    const notify = (msg) => toast.success(msg, {
        position: "top-center",
        });
    const notifyerror = (msg) => toast.error(msg, {
        position: "top-center",
        });
    const postmodelfn=async(e)=>{
        e.preventDefault(); 
        try {
            let datalist = {
                model_name:model
            }
            if(modelnames){
                // console.log("dfsdffs",modelnames)
                datalist.id=modelnames.id
            }
            let data =  await Callaxios("post","product/modelname/",datalist)
            console.log("data",data)
            if (data.data.Status===200){
                notify("Successfully Added")
                setmodel('')
                setmodelnames('')
                getmodel()
                setcartmodal(!cartmodal)
            }else{
                notifyerror("Something went wrong")
            }
        } catch (error) {
            
        }
    }
    
    const postcategoryfn=async(e)=>{
        e.preventDefault(); 
        try {
            let datalist = {
                category:category
            }
            if(categorynames){
                // console.log("dfsdffs",modelnames)
                datalist.id=categorynames.id
            }
            let data =  await Callaxios("post","product/category/",datalist)
            // console.log("data",data)
            if (data.data.Status===200){
                notify("Successfully Added")
                setcategory('')
                setcategorynames('')
                getcategory()
                setcategorymodal(!categorymodal)
            }else{
                notifyerror("Something went wrong")
            }
        } catch (error) {
            
        }
    }
    
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
                    <b className='text-red-600 '>Models</b>
                    {/* search start */}
                    {/* <div className='grid grid-cols-2'>
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
                    </div> */}
                    {/* search end */}
                    {/* Dashboard home start */}
                    <div className=" mx-auto">

                    <div className="mt-6 rounded-md">
                    <table className="w-full border border-collapse table-auto">
                        <thead >
                        <tr className="text-base font-bold text-left bg-gray-50">
                            
                            <th className="px-4 py-3 border border-gray-300">Models</th>
                            <th className="px-4 py-3 border border-gray-300 w-32">Action</th>
                            
                        </tr>
                        </thead>
                        <tbody className="text-sm font-normal text-gray-700">
                        {modeldata.length ? modeldata.map((item,key)=>(
                            <tr key={key} className="py-10 border-b border-gray-200 hover:bg-gray-100">                           
                        
                            <td className="px-4 py-4 border border-gray-300 "> {item.model_name} </td>
                            <td className="px-4 py-4 border border-gray-300 "> 
                            <button onClick={()=>setcartmodal(!cartmodal) & setmodelnames(item) & setmodel(item.model_name)}  className='bg-yellow-500 rounded-lg flex text-white p-1 hover:bg-yellow-400' ><FaEdit size={18}/>edit</button>
                             </td>
                                                   
                            </tr>
                        )):
                        <tr className="py-10 border-b border-gray-200 hover:bg-gray-100">                                                  
                        <td className="px-4 py-4 border border-gray-300 ">No models found add new  model</td>
                        <td className="px-4 py-4 border border-gray-300 "> 
                        <button onClick={()=>setcartmodal(!cartmodal)} className='bg-green-600 rounded-lg flex text-white p-2 hover:bg-green-500' ><GrAddCircle size={18}/>Add new</button>                            
                        </td>                                        
                        </tr>}    
                        
                        

                        </tbody>
                    </table>
                    </div><br/>
                    <b className='text-red-600 '>Category</b>
                    <div className="mt-6 rounded-md">
                    <table className="w-full border border-collapse table-auto">
                        <thead >
                       
                        <tr  className="text-base font-bold text-left bg-gray-50">
                            <th className="px-4 py-3 border border-gray-300">Categories</th>
                            <th className="px-4 py-3 border border-gray-300 w-32">Action</th>
                        </tr>
                        </thead>
                        <tbody className="text-sm font-normal text-gray-700">
                        {categorydata.length ? categorydata.map((item,key)=>(
                            <tr key={key} className="py-10 border-b border-gray-200 hover:bg-gray-100">                                                  
                            <td className="px-4 py-4 border border-gray-300 "> {item.category} </td>
                            <td className="px-4 py-4 border border-gray-300 "> 
                            <button onClick={()=>setcategorymodal(!categorymodal) & setcategorynames(item) & setcategory(item.category)} className='bg-yellow-500 rounded-lg flex text-white p-1 hover:bg-yellow-400' ><FaEdit size={18}/>edit</button>                            
                            </td>                                        
                            </tr>
                        )):<tr className="py-10 border-b border-gray-200 hover:bg-gray-100">                                                  
                        <td className="px-4 py-4 border border-gray-300 ">No category found add new category </td>
                        <td className="px-4 py-4 border border-gray-300 "> 
                        <button onClick={()=>setcategorymodal(!categorymodal)} className='bg-green-600 rounded-lg flex text-white p-2 hover:bg-green-500' ><GrAddCircle size={18}/>Add new</button>                            
                        </td>                                        
                        </tr>}  

                        </tbody>
                    </table>
                    </div>
                    <div className="flex flex-col items-center w-full px-4 py-2 space-y-2 text-sm text-gray-500 sm:justify-between sm:space-y-0 sm:flex-row">
                    
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
                            Models
                        </h5>
                        <button type="button" onClick={()=>setcartmodal(!cartmodal) & setmodelnames('') & setmodel('')} className="btn-close box-content w-4 h-4 p-1 text-gray-500    hover:text-red-600 "><b>X</b></button>
                        </div>
                        {/* <input onChange={(e)=>setsearchcheck(e.target.value)} value={searchcheck} type='text' placeholder='search'/> */}
                        {/* data start */}
                        <section className="relative md:py-10 py-16  bg-white dark:bg-slate-900">
                            <div className="container">
                           
                                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                                <div className="lg:col-span-12 md:col-span-12">
                                    <div className="grid grid-cols-1 gap-[10px]">
                                    
                                    <form   className='pt-5' onSubmit={(e)=>postmodelfn(e)} >
                                        <p className="mb-0" id="error-msg" />
                                        <div id="" />
                                        
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                            
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            
                                            </div>
                                        </div>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                           
                                            <div className="lg:col-span-12 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="email" className="font-semibold">Models</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><MdPhoneIphone  size={18} /></i>
                                                <textarea required onChange={(e)=>setmodel(e.target.value)} value={model}  className='form-input pl-11' placeholder='enter phone models'/>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        
                                        <div className='flex justify-end' ><button  type="submit" className='w-64 p-2 bg-green-700 rounded-md  text-white hover:bg-green-900'>Submit</button></div>
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
                                    <button type="button" onClick={()=>setcartmodal(!cartmodal)  & setmodelnames('') & setmodel('')} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
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
                     {/* add categorymodal  start */}
                     <div className={`modal eas duration-300 fixed z-40 top-0  ${categorymodal ? "-translate-x-0" : "translate-x-full"} left-0  transition-all w-full  h-screen outline-none overflow-x-hidden overflow-y-auto`} id="exampleModalScrollable" tabIndex={-1} aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable h-full relative w-auto pointer-events-none">
                    <div className="modal-content border-none h-full shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                            Categories
                        </h5>
                        <button type="button" onClick={()=>setcategorymodal(!categorymodal) & setcategorynames('') & setcategory('')} className="btn-close box-content w-4 h-4 p-1 text-gray-500    hover:text-red-600 "><b>X</b></button>
                        </div>
                        {/* <input onChange={(e)=>setsearchcheck(e.target.value)} value={searchcheck} type='text' placeholder='search'/> */}
                        {/* data start */}
                        <section className="relative md:py-10 py-16  bg-white dark:bg-slate-900">
                            <div className="container">
                           
                                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                                <div className="lg:col-span-12 md:col-span-12">
                                    <div className="grid grid-cols-1 gap-[10px]">
                                    
                                    <form   className='pt-5' onSubmit={(e)=>postcategoryfn(e)} >
                                        <p className="mb-0" id="error-msg" />
                                        <div id="" />
                                        
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                            
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            
                                            </div>
                                        </div>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                           
                                            <div className="lg:col-span-12 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="email" className="font-semibold">Categories</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><MdPhoneIphone  size={18} /></i>
                                                <textarea required onChange={(e)=>setcategory(e.target.value)} value={category}  className='form-input pl-11' placeholder='enter categories'/>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        
                                        <div className='flex justify-end' ><button  type="submit" className='w-64 p-2 bg-green-700 rounded-md  text-white hover:bg-green-900'>Submit</button></div>
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
                                    <button type="button" onClick={()=>setcategorymodal(!categorymodal)  & setcategorynames('') & setcategory('')} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
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
