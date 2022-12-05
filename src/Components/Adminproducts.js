import React, { useContext, useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { BiMenuAltLeft,BiText } from 'react-icons/bi';
import { FaSearch,FaRegImage,FaRegImages,FaEdit,FaSortDown } from 'react-icons/fa';
import { GrAddCircle } from 'react-icons/gr';
import { MdPhoneIphone,MdOutlineFormatColorFill } from 'react-icons/md';
import { ImPriceTags } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Callaxios from './Callaxios';
import { json, useNavigate } from 'react-router-dom';
import { Simplecontext } from './Simplecontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Adminproducts() {
    let isMobileDevice = window.matchMedia("only screen and (max-width: 768px)").matches;
    const [showsidebar,setshowsidebar]=useState(false)
    const [showreview,setshowreview]=useState(false)
    const [cartmodal,setcartmodal]=useState(false)
    const [editmodal,seteditmodal]=useState(false)
    // const [productvalue,setproductvalue]=useState([''])
    const [model_name,setmodel_name]=useState()
    const [buyprice,setbuyprice]=useState([''])
    const [sellprice,setsellprice]=useState([''])
    const [fromprice,setfromprice]=useState('')
    const [oldprice,setoldprice]=useState('')
    const [description,setdescription]=useState([''])
    const [colors,setcolors]=useState('')
    const [editproduct,seteditproduct]=useState('');
    const [editimages,seteditimages]=useState('');
    const [images,setimages]=useState([''])
    const [search,setsearch]=useState('')
    const [searchcheck,setsearchcheck]=useState('')
    
    // console.log("productdata add",productvalue)
    // console.log("editprduct",editproduct)
    // console.log("product",products)
    const {accesscheck,next,setnext,products,setproducts,getproduct} =useContext(Simplecontext)

    let navigate = useNavigate(); 
    // console.log("next",next) 
    useEffect(() => {        
        if (window.localStorage.getItem("refresh_token")===null)
        {
            return navigate('/adminlogin')
        }else{
            accesscheck()
            
        }
    }, [])
    const notifyproductadded = () => toast.success('✅ Product added Successfully!', {
        position: "top-center",
        });
    const notifyupdated = () => toast.success('✅ Product updated Successfully!', {
        position: "top-center",
        });
    const notifyerror = () => toast.error(' Something went wrong', {
        position: "top-center",
        });
    const notifydelete = () => toast.success('✅ deleted Successfully ', {
        position: "top-center",
        });
   

    // const getproduct = async()=>{
    //     let data = await Callaxios("get","product/product/")
    //     // console.log("dataresponsenwxt",data.data.results)
    //     if (data.status===200){
    //         setnext(data.data.next)  
    //         setproducts(data.data.results) 

    //     }else{
    //         notifyerror()
    //     }
    // }
    const searchproduct = async()=>{

        let data = await Callaxios("get","/product/product",{model_name:search})
        if (data.status===200){
            setnext(data.data.next)  
            setproducts(data.data.results) 
        }else{
            notifyerror()
        }
    }
    const getnextproduct = async()=>{
        let data = await Callaxios("next",next)
        console.log("nextinnextcall",next)
        if (data.status===200){
            // console.log("daatanext",data.data.next)
            setnext(data.data.next)
            setproducts(products=>[...products,...data.data.results])
        }else{
            notifyerror()
        }
    }
    const imageaddtolist = (img)=>{
        let imagelist = images.concat(img)
        setimages(imagelist)
    }
    const deletefromlist=(k)=>{
        const splc = images
        splc.splice(k,1)
        setimages(() => [ ...splc]);
      }
    const addproduct = async(e)=>{
        e.preventDefault();      
        const form_data = new FormData();
        if(editproduct){
            let id = editproduct.id
            // console.log("iddddddddddd",id)
            form_data.append("id",id)
        }
        if (images){
            images.map((itm,k)=>{
                form_data.append("images",itm)
               
            })  
        }
        // for (const [key, value] of Object.entries(productvalue)) {
        //     form_data.append(`${key}`, `${value}`)
        //   }
        form_data.append("model_name",model_name)
        form_data.append("buyprice",buyprice)
        form_data.append("sellprice",sellprice)
        form_data.append("description",description)
        form_data.append("oldfromprice",oldprice)
        form_data.append("sellfromprice",fromprice)
        form_data.append("colors",colors)
        let data =  await Callaxios("post","product/product/",form_data)
        // console.log("datainaftrcallaxios",data.data)
        if (data.data.Status===200){
            // setproductdata([])
            
            if(editproduct){
                seteditmodal(!editmodal)
                notifyupdated()
            }else{
                setcartmodal(!cartmodal)
                notifyproductadded('')
            }
            
            getproduct('')
            setallnull('')
            
        }else{
            notifyerror()
        }
    }
    const editfunction = (itm)=>{
        seteditproduct(itm)
        seteditimages(itm.images)
        setmodel_name(itm.model_name)
        setbuyprice(itm.buyprice)
        setsellprice(itm.sellprice)
        setfromprice(itm.oldfromprice)
        setoldprice(itm.sellfromprice)
        setdescription(itm.description)
        seteditmodal(!editmodal)
        setcolors(itm.colors)
    }
    const deleteimage= async(itm,k)=>{
        // console.log("editprduct",editproduct)
        let datalist= {"keyword":"remove","images":JSON.stringify([itm.id]),"id":editproduct.id}
        // console.log("datalist",datalist)
        let data = await Callaxios("patch","product/product/",datalist) 
        if (data.data.Status===200){
            // console.log("itmidpatch",itm)
            // console.log("itmidpatchkkk",k)
            const splc = editimages
            splc.splice(k,1)
            seteditimages(() => [ ...splc]);
            
        }else{
            notifyerror()
        }
       
        
        
    }
    const deleteproduct =async(itmid,k)=>{
        let datalist ={"id":JSON.stringify([itmid])}
        let data = await Callaxios("delete","product/product/",datalist) 
        if (data.data.Status===200){
            getproduct()
            notifydelete()
        }else{
            notifyerror()
        }
    }
    const setstatus= async(keys,status,pid)=>{
        let datalist=''
        if (keys==="buystatus"){
            datalist ={"id":pid,"buystatus":status}
        }else if(keys ==="sellstatus"){
            datalist ={"id":pid,"sellstatus":status}
        }
        
        let data = await Callaxios("post","product/product/",datalist)
        if (data.data.Status===200){
            getproduct()
        
        }else{
            notifyerror()
        }
    }

    
    
    const submitimagedelete = (item,k) => {
        confirmAlert({
          title: "Confirmation",
          message: `Are you sure to delete this image ?`,
          buttons: [
            {
              label: "Yes",           
              onClick:()=>deleteimage(item,k),
            },
            {
              label: "No"
              // onClick: () => alert("Click No")
            } 
          ],
          
        });
      };
    const submitdeleteproduct = (itemid,k) => {
    confirmAlert({
        title: "Confirmation",
        message: `Are you sure to delete this product ?`,
        buttons: [
        {
            label: "Yes",           
            onClick:()=>deleteproduct(itemid,k),
        },
        {
            label: "No"
            // onClick: () => alert("Click No")
        } 
        ],
        
    });
    };
    const setallnull = ()=>{
        // console.log("allnull")
        // setproductvalue([])     
        setimages([])
        seteditimages('')
        seteditproduct('')
        setsearchcheck('')
        setmodel_name('')
        setbuyprice('')
        setsellprice('')
        setfromprice('')
        setoldprice('')
        setdescription('')
        setcolors('')
    }
  return (
    <div>
    <div className='bg-[#2e2e2e] fixed h-screen w-screen'>
        <div className='grid md:grid-cols-8 '>
        <div className='md:col-span-1'>
            <div className={isMobileDevice ? `${showsidebar ? '-translate-x-0':'-translate-x-full'}  modal eas duration-300  z-40 top-0 fixed  overflow-y-auto `:' modal eas top-0 fixed overflow-y-auto -translate-x-0 z-40 '}>
            
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
                <ToastContainer />
                    <div className='p-4 rounded-lg md:h-[90vh] h-[85vh] md:w-[78%]   w-[94%] fixed overflow-auto  bg-[#f9f8f6]'>
                    <b className='text-red-600 '>Products</b>
                    {/* search start */}
                    <div className='grid grid-cols-2'>
                        <div className='col-span-1'>
                            <div className="mb-3 xl:w-96 ">
                                <div className="form-icon relative mt-2 flex border border-gray-500 rounded-lg ">
                                    <i className="w-4 h-4 absolute top-3 left-4"><FaSearch size={18} color='grey'  /></i>
                                    <input name="text" id="search" type="search" onChange={(e)=>setsearch(e.target.value)} className="form-input pl-11 border-none" placeholder="Search here" />
                                    <button onClick={()=>searchproduct()} className='bg-blue-600 hover:bg-blue-400 px-3 rounded-r-md'><FaSearch size={20} color='white' /></button>
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

                    <div className=" mx-auto ">

                    <div className="mt-6     rounded-md">
                    <table className="w-full border  ">
                        <thead >
                        <tr className="text-base font-bold text-left bg-gray-50">
                            <th className="px-4 py-3 border-b-2 border-cyan-500">#</th>
                            <th className="px-4 py-3 border-b-2 border-blue-500">Model</th>
                            <th className="px-4 py-3 border-b-2 border-green-500">Images</th>
                            <th className="px-4 py-3 border-b-2 border-yellow-500 " >Sell Price</th>
                            <th className="px-4 py-3  border-b-2 border-blue-500 ">Sell Status</th>
                            <th className="px-4 py-3  border-b-2 border-red-500  ">Buy Price</th>
                            <th className="px-4 py-3  border-b-2 border-cyan-500 ">Buy Status</th>
                            <th className="px-4 py-3  border-b-2 border-blue-500 ">Colors</th>
                            <th className="px-4 py-3  border-b-2 border-green-500 ">Old Starting price</th>
                            <th className="px-4 py-3  border-b-2 border-yellow-500 ">New Starting price</th>
                            <th className="px-4 py-3  border-b-2 border-red-500">Review</th>
                            <th className="px-4 py-3  border-b-2 border-cyan-500">Date</th>
                            <th className="px-4 py-3  border-b-2 border-blue-500 ">Action</th>
                        </tr>
                        </thead>
                        <tbody className="text-sm font-normal text-gray-700">
                        {products.map((itm,k)=>(  
                        <tr key={k} className="py-10 border-b border-gray-200 hover:bg-gray-100">                            
                            <td className="px-4 py-4">{k+1}</td>
                            <td className=" px-4 py-4  " >                      
                                <div className="flex font-medium dark:text-gray-700">{itm.model_name}</div>
                            </td>
                            <td className="px-4 py-4"> 
                                {itm.images ?  
                                <>
                                    {itm.images.map((imag,k1)=>(
                                    <div key={k1} className='w-10'>
                                    <img  className='rounded '  src={ imag.image} alt='img' />
                                    </div>
                                    ))}
                                </>:null}
                            </td>
                            <td className="px-2 py-4">{itm.sellprice.split(',').map((sellp,k2)=>(
                              <ul key={k2} className='list-outside list-disc'>
                                <li className=''>{sellp}</li></ul>  
                            ))} </td>
                            <td className="px-4 py-4">
                                {itm.sellstatus ?
                                <button onClick={()=>setstatus("sellstatus",false,itm.id)} className='bg-green-700 rounded p-1 text-white hover:bg-green-600'>enabled</button> :
                                <button onClick={()=>setstatus("sellstatus",true,itm.id)} className='bg-red-700 rounded p-1 text-white hover:bg-red-600'>disabled</button> }
                            </td>
                            <td className="px-2 py-4">{itm.buyprice.split(',').map((sellp,k2)=>(
                              <ul key={k2} className='list-outside list-disc'>
                                <li className=''>{sellp}</li></ul>  
                            ))} </td>
                            <td className="px-4 py-4">
                                {itm.buystatus ?
                                <button onClick={()=>setstatus("buystatus",false,itm.id)} className='bg-green-700 rounded p-1 text-white hover:bg-green-600'>enabled</button> :
                                <button onClick={()=>setstatus("buystatus",true,itm.id)} className='bg-red-700 rounded p-1 text-white hover:bg-red-600'>disabled</button> }
                            </td>
                            <td className="px-4 py-4">${itm.colors}</td>
                            <td className="px-4 py-4">${itm.oldfromprice}</td>
                            <td className="px-4 py-4">${itm.sellfromprice}</td>
                            <td className='px-4 py-4 '> <button className='rounded p-1 bg-gray-600 flex text-white hover:bg-slate-400' onClick={()=>setshowreview(!showreview)}>Review<FaSortDown/></button></td>
                            <td className='px-4 py-4'> {itm.created_date.split('T')[0]}</td>
                            <td className='px-4 py-4'>
                                <ul >
                                    <li><button onClick={()=>editfunction(itm)} className='bg-yellow-500 rounded-lg flex text-white p-1 hover:bg-yellow-400' ><FaEdit size={18}/>edit</button></li>
                                    <li className='pt-1'><button onClick={()=>submitdeleteproduct(itm.id,k)} className='bg-red-700 rounded-lg flex text-white p-1 hover:bg-red-600'><RiDeleteBin6Line size={18}/>delete</button></li>
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
                    
                        <div className="flex flex-row space-x-1">
                        {next ===null ? null:
                        <button onClick={()=>getnextproduct()} className="flex px-2 py-px text-white rounded-md  border bg-blue-600 hover:bg-blue-400 border-blue-400">Load More...</button>      
                         }
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
                                        
                                    <form  onSubmit={(e)=>addproduct(e)}  className='pt-5' >
                                        <p className="mb-0" id="error-msg" />
                                        <div id="" />
                                        
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="name" className="font-semibold">Model Name:</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><MdPhoneIphone size={18} /></i>
                                                {/* <input onChange={(e)=> setproductdata({...productdata,model_name:e.target.value}) } className="form-input pl-11"  type='text' placeholder='search'/> */}
                                                <input onChange={(e)=> setmodel_name(e.target.value) } value={model_name} required  name="phone"  type="text"  className="form-input pl-11" placeholder="phone model :" />
                                                </div>
                                            </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="email" className="font-semibold">Sell Price <span className='text-gray-500'>(storage-condition-price,...)</span></label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><ImPriceTags size={18} /></i>
                                                <input onChange={(e)=> setsellprice(e.target.value) } value={sellprice} required  name="price" id="price" type="price" className="form-input pl-11" placeholder="Storage-condition-price,eg:(128 GB-good-13000,..)" />
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
                                                <input onChange={(e)=>setbuyprice(e.target.value)} value={buyprice} required  name="buyprice" id="buyprice" type="buyprice" className="form-input pl-11" placeholder="Storage-condition-price,eg:(128 GB-good-13000,..)" />
                                                </div>
                                            </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="contact" className="font-semibold">Old Starting Price</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><ImPriceTags size={18} /></i>
                                                <input onChange={(e)=>setoldprice(e.target.value)} value={oldprice} required  name="oldprice" id="oldprice" type="oldprice" className="form-input pl-11" placeholder="old price eg:(13000)" />
                                                </div>
                                            </div>
                                            </div>
                                           
                                        </div>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                           
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="email" className="font-semibold">New Starting Price</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><ImPriceTags size={18} /></i>
                                                <input onChange={(e)=>setfromprice(e.target.value)} value={fromprice}   className='form-input pl-11' placeholder='new price eg:(1200)'/>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="email" className="font-semibold">Description</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><BiText  size={18} /></i>
                                                <textarea onChange={(e)=>setdescription(e.target.value)} value={description}   className='form-input pl-11' placeholder='description'/>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="contact" className="font-semibold">Colors</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><MdOutlineFormatColorFill size={18} /></i>
                                                <input name="text" id="text" type="text" onChange={(e)=>setcolors(e.target.value)} value={colors} className="form-input pl-11" placeholder="colors,eg:(red,blue,...)" />
                                                </div>
                                            </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                            <div className='grid grid-cols-4'>
                                            {/* {editimages ? 
                                                <>
                                                
                                                {editimages.map((itm,k)=>(
                                                    <div key={k} className="col-span-2 pt-1"> 
                                                    <div className='col-span-1 flex w-20'>
                                                    <img  className='rounded '  src={itm.image} alt='img' />
                                                    <button onClick={()=>submitimagedelete(itm,k)} type='button' className='pl-2 hover:text-red-600 ' >< RiDeleteBin6Line /></button>
                                                    </div>
                                                </div> 
                                                ))}
                                                </>:null} */}
                                                
                                               
                                            {images[0]?
                                                <>
                                                
                                                {images.map((itm,k)=>(
                                                    <div key={k} className="col-span-2 pt-1"> 
                                                    <div className='col-span-1 flex w-20'>
                                                    <img  className='rounded '  src={ URL.createObjectURL(itm)} alt='img' />
                                                    <button type='button' className='pl-2 hover:text-red-600 ' onClick={()=>deletefromlist(k)}>< RiDeleteBin6Line /></button>
                                                    </div>
                                                </div> 
                                                ))}
                                                
                                                </>: null}
                                                </div>
                                                <label htmlFor="email" className="font-semibold">Add  Images</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><FaRegImages  size={18} /></i>
                                                <input onChange={(e)=>imageaddtolist(e.target.files[0])} name="file" id="file" type="file" className="form-input pl-11" placeholder="Storage-condition-price,eg:(128-good-13000,..)" />
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
                                    <button type="button" onClick={()=>setcartmodal(!cartmodal) & setallnull()} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
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
                    {/* edit modal  start */}
                    <div className={`modal eas duration-300 fixed z-40 top-0  ${editmodal ? "-translate-x-0" : "translate-x-full"} left-0  transition-all w-full  h-screen outline-none overflow-x-hidden overflow-y-auto`} id="exampleModalScrollable" tabIndex={-1} aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable h-full relative w-auto pointer-events-none">
                    <div className="modal-content border-none h-full shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                            Add New Product
                        </h5>
                        <button type="button" onClick={()=>seteditmodal(!editmodal) & setallnull()} className="btn-close box-content w-4 h-4 p-1 text-gray-500    hover:text-red-600 "><b>X</b></button>
                        </div>
                        {/* <input onChange={(e)=>setsearchcheck(e.target.value)} value={searchcheck} type='text' placeholder='search'/> */}
                        {/* data start */}
                        <section className="relative md:py-10 py-16  bg-white dark:bg-slate-900">
                            <div className="container">
                           
                                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                                <div className="lg:col-span-12 md:col-span-12">
                                    <div className="grid grid-cols-1 gap-[10px]">
                                        
                                    <form  onSubmit={(e)=>addproduct(e)}  className='pt-5' >
                                        <p className="mb-0" id="error-msg" />
                                        <div id="" />
                                        
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="name" className="font-semibold">Model Name:</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><MdPhoneIphone size={18} /></i>
                                                {/* <input onChange={(e)=> setproductdata({...productdata,model_name:e.target.value}) } className="form-input pl-11"  type='text' placeholder='search'/> */}
                                                <input onChange={(e)=> setmodel_name(e.target.value) } required value={model_name} name="phone"  type="text"  className="form-input pl-11" placeholder="phone model :" />
                                                </div>
                                            </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="email" className="font-semibold">Sell Price <span className='text-gray-500'>(storage-condition-price,...)</span></label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><ImPriceTags size={18} /></i>
                                                <input onChange={(e)=> setsellprice(e.target.value) } required value={sellprice}  name="price" id="price" type="price" className="form-input pl-11" placeholder="Storage-condition-price,eg:(128 GB-good-13000,..)" />
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
                                                <input onChange={(e)=>setbuyprice(e.target.value)} required value={buyprice}  name="buyprice" id="buyprice" type="buyprice" className="form-input pl-11" placeholder="Storage-condition-price,eg:(128 GB-good-13000,..)" />
                                                </div>
                                            </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="contact" className="font-semibold">Old Starting Price</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><ImPriceTags size={18} /></i>
                                                <input onChange={(e)=>setoldprice(e.target.value)} value={oldprice}  required  name="oldprice" id="oldprice" type="oldprice" className="form-input pl-11" placeholder="old price eg:(13000)" />
                                                </div>
                                            </div>
                                            </div>
                                            {/* <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="email" className="font-semibold">Description</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><BiText  size={18} /></i>
                                                <textarea onChange={(e)=>setdescription(e.target.value)} defaultValue={editproduct ? editproduct.description :null}  className='form-input pl-11' placeholder='description'/>
                                                </div>
                                            </div>
                                            </div> */}
                                        </div>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                           
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="email" className="font-semibold">New Starting Price</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><ImPriceTags size={18} /></i>
                                                <input onChange={(e)=>setfromprice(e.target.value)} value={fromprice}  className='form-input pl-11' placeholder='new price eg:(1200)'/>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="email" className="font-semibold">Description</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><BiText  size={18} /></i>
                                                <textarea onChange={(e)=>setdescription(e.target.value)} value={description}  className='form-input pl-11' placeholder='description'/>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                        <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="contact" className="font-semibold">Colors</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><MdOutlineFormatColorFill size={18} /></i>
                                                <input name="text" id="text" type="text" onChange={(e)=>setcolors(e.target.value)} value={colors} className="form-input pl-11" placeholder="colors,eg:(red,blue,...)" />
                                                </div>
                                            </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                            <div className='grid grid-cols-4'>
                                            {editimages ? 
                                                <>
                                                {/* {editimages.images ? <> */}
                                                {editimages.map((itm,k)=>(
                                                    <div key={k} className="col-span-2 pt-1"> 
                                                    <div className='col-span-1 flex w-20'>
                                                    <img  className='rounded '  src={itm.image} alt='img' />
                                                    <button onClick={()=>submitimagedelete(itm,k)} type='button' className='pl-2 hover:text-red-600 ' >< RiDeleteBin6Line /></button>
                                                    </div>
                                                </div> 
                                                ))}
                                                </>:null}
                                               {/* </>  */}
                                            {/* :null } */}
                                            {images[0]?
                                                <>
                                                
                                                {images.map((itm,k)=>(
                                                    <div key={k} className="col-span-2 pt-1"> 
                                                    <div className='col-span-1 flex w-20'>
                                                    <img  className='rounded '  src={ URL.createObjectURL(itm)} alt='img' />
                                                    <button type='button' className='pl-2 hover:text-red-600 ' onClick={()=>deletefromlist(k)}>< RiDeleteBin6Line /></button>
                                                    </div>
                                                </div> 
                                                ))}
                                                
                                                </>: null}
                                                </div>
                                                <label htmlFor="email" className="font-semibold">Add  Images</label>
                                                <div className="form-icon relative mt-2">
                                                <i className="w-4 h-4 absolute top-3 left-4"><FaRegImages  size={18} /></i>
                                                <input onChange={(e)=>imageaddtolist(e.target.files[0])} name="file" id="file" type="file" className="form-input pl-11" placeholder="Storage-condition-price,eg:(128-good-13000,..)" />
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
                                    <button type="button" onClick={()=>seteditmodal(!editmodal) & setallnull()} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
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
                    {/* edit modal  end */}
                    {/* review modal  start */}
                    <div className={`modal eas duration-300 fixed z-40 top-0  ${showreview ? "-translate-y-0" : "-translate-y-full"} left-0  transition-all w-full  h-screen outline-none overflow-x-hidden overflow-y-auto`} id="exampleModalScrollable" tabIndex={-1} aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable h-full relative w-auto pointer-events-none">
                    <div className="modal-content border-none h-full shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                            Reviews
                        </h5>
                        <button type="button" onClick={()=>setshowreview(!showreview) & setallnull()} className="btn-close box-content w-4 h-4 p-1 text-gray-500    hover:text-red-600 "><b>X</b></button>
                        </div>
                        {/* <input onChange={(e)=>setsearchcheck(e.target.value)} value={searchcheck} type='text' placeholder='search'/> */}
                        {/* data start */}
                        <section className="relative md:py-10 py-16  bg-white dark:bg-slate-900">
                            <div className="container">
                           
                                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                                <div className="lg:col-span-12 md:col-span-12">
                                    <div className="grid grid-cols-1 gap-[10px]">
                                        
                                   {/* content here*/}
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
                                    <button type="button" onClick={()=>setshowreview(!showreview) & setallnull()} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
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
                    {/* review modal  end */}
                </div>
            </div>

        </div>

    </div>


</div>
  )
}
