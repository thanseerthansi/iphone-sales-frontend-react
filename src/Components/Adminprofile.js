import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar';
// import { GrAddCircle } from 'react-icons/gr';
import { MdPhone ,MdPersonOutline,MdOutlineEmail} from 'react-icons/md';
// import { ImPriceTags } from 'react-icons/im';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BiMenuAltLeft,BiText } from 'react-icons/bi';
import { FaUserAlt} from 'react-icons/fa';
import { Simplecontext } from './Simplecontext';
import { useContext } from 'react';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Adminprofile() {
    const {accesscheck} =useContext(Simplecontext)
    let isMobileDevice = window.matchMedia("only screen and (max-width: 768px)").matches;
    const [showsidebar,setshowsidebar]=useState(false)
    const [username,setusername]=useState()
    const [contact,setcontact]=useState()
    const [cartmodal,setcartmodal]=useState(false)
    const [changepassword,setchangepassword]=useState(false)
    const [newpassword,setnewpassword]=useState('')
    const [oldpassword,setoldpassword]=useState('')
    const [email,setemail]=useState('')
    const [profiledata,setprofiledata]=useState([])
    var token = window.localStorage.getItem('access_token')
    // var refresh_token = window.localStorage.getItem('refresh_token')
    //   console.log("data",profiledata[0].username)
    var decoded = jwt_decode(token);
    let userid = decoded.user_id
    let navigate = useNavigate();
    const notifyerror = (msg) => toast.error(msg, {
        position: "top-center",
        });
    const notifyadded = (msg) => toast.success(msg, {
        position: "top-center",
        });
    useEffect(() => {
            accesscheck()
            getuser()
        }, [])
    // const setallnull=()=>{
    //     // setstatus('')
    // }
    
    const logout =()=>{
      window.localStorage.removeItem("access_token")
      window.localStorage.removeItem("refresh_token")
      // console.log("okdelete")
      return navigate('/adminlogin');
      
  }
    const getuser=async()=>{
        let data = await Callaxios("get","user/user/",{user:userid})
        if (data.status===200){
            // console.log("data",data.data)
            setprofiledata(data.data)
            

        }
    }
    const setvaluefunction = ()=>{
        setusername(profiledata[0].username)
        setcontact(profiledata[0].contact)
        setemail(profiledata[0].email)
    }
    const notifyerrorfunction = (e,msg)=>{
        e.preventDefault();
        notifyerror(msg)
    }
    const editfunction =async(e)=>{
        e.preventDefault();
        // console.log("edit")
        let datalist = {
            "id":profiledata[0].id,
            "username":username,
            "oldpassword":oldpassword
        }
        if (contact){datalist.contact = contact}
        if (email){datalist.email = email}
        if (newpassword){datalist.password = newpassword}
        // console.log("datalisr",datalist)
        try {
            let data = await Callaxios("post","user/user/",datalist)
            console.log("data",data)
            if(data.data.Status===200){
                console.log("true",data.data)
                notifyadded(data.data.Message)
                getuser()
                setcartmodal(!cartmodal)
                if(username && newpassword ){
                    logout()
                }
                

            }else{notifyerror(data.data.Message)}
            
        } catch (error) {
            
        }
        
    }
    const setnull=()=>{
        // console.log("ok")
        setoldpassword('')
        setnewpassword('')
        setusername('')
        setcontact('')
        setemail('')

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
                <ToastContainer/>
                    <div className='p-4 rounded-lg md:h-[90vh] h-[85vh] md:w-[78%]  w-[94%] fixed overflow-auto shadow-md  bg-[#f9f8f6]'>
                    <b className='text-red-600 '>Profile</b>
                    
                    {/* search end */}
                    {/* Dashboard home start */}
                    <div className=" mx-auto">

                    <div className='container'>
                        <div className='pt-10'>
                            <div className='grid grid-cols-6'>
                                <div className='md:col-span-2'>
                                <FaUserAlt size={100} /><br/>
                                <div className='flex p-3'>
                                        <div className=''>
                                            <button onClick={()=>setcartmodal(!cartmodal) & setvaluefunction()} className='rounded p-2 bg-green-700 hover:bg-green-600 text-white'>Edit User</button>
                                        </div>
                                    </div>

                                </div>
                                <div className='md:col-span-4 pt-5'>
                                    <div className='grid grid-cols-7 pt-1'>
                                        <div className='col-span-3'>
                                            <b>User Name</b>
                                        </div>
                                        <div className='col-span-1'>
                                            <b>:</b>
                                        </div>
                                        <div className='col-span-3 '>
                                            <b>{profiledata.length ?  profiledata[0].username :null}</b>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-7 pt-5'>
                                        <div className='col-span-3'>
                                            <b>Email</b>
                                        </div>
                                        <div className='col-span-1'>
                                            <b>:</b>
                                        </div>
                                        <div className='col-span-3'>
                                            <b>{profiledata.length ?  profiledata[0].email :null}</b>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-7 pt-5'>
                                        <div className='col-span-3'>
                                            <b>Contact</b>
                                        </div>
                                        <div className='col-span-1'>
                                            <b>:</b>
                                        </div>
                                        <div className='col-span-3'>
                                            <b>{profiledata.length ?  profiledata[0].contact :null}</b>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            

                        </div>
                    </div>
                
                    </div>


                    {/* Dashboard home end */}

                    </div>
                   
                </div>
            </div>
                 {/* add modal  start */}
                 <div className={`modal eas duration-300 fixed z-40 top-0  ${cartmodal ? "-translate-x-0" : "translate-x-full"} right-0 transition-all w-[40%] shadow-md h-screen outline-none overflow-x-hidden overflow-y-auto`} id="exampleModalScrollable" tabIndex={-1} aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable h-full relative w-auto pointer-events-none">
                    <div className="modal-content border-none h-full shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                        Edit Profile 
                        </h5>
                        <button type="button" onClick={()=>setcartmodal(!cartmodal) & setnull() } className="btn-close box-content w-4 h-4 p-1 text-gray-500    hover:text-red-600 "><b>X</b></button>
                        </div>
                        {/* <input onChange={(e)=>setsearchcheck(e.target.value)} value={searchcheck} type='text' placeholder='search'/> */}
                        {/* data start */}
                        <section className="relative md:py-10 py-16  bg-white dark:bg-slate-900">
                            <div className="container">
                           
                                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                                <div className="lg:col-span-12 md:col-span-12">
                                    <div className="grid grid-cols-1 gap-[10px]">
                                    
                                    <form onSubmit={(e)=>editfunction(e)}  className='pt-5' >
                                        <p className="mb-0" id="error-msg" />
                                        <div className="lg:col-span-6 mb-5 ">
                                        <div className="text-left">
                                        <label htmlFor="contact" className="font-semibold">Username: </label>
                                        <div className="form-icon relative mt-2">
                                            <i className="w-4 h-4 absolute top-3 left-4"><MdPersonOutline size={18} /></i>
                                            <input  onChange={(e)=>setusername(e.target.value)} value={username} name="name"  type="name" className="form-input pl-11" placeholder="username :" />
                                        </div>
                                        </div>
                                    </div>
                                        <div className="lg:col-span-6 mb-5 ">
                                        <div className="text-left">
                                        <label htmlFor="contact" className="font-semibold">Contact: </label>
                                        <div className="form-icon relative mt-2">
                                            <i className="w-4 h-4 absolute top-3 left-4"><MdPhone size={18} /></i>
                                            <input onChange={(e)=>setcontact(e.target.value)} value={contact} name="conact"  type="number" className="form-input pl-11" placeholder="Contact :" />
                                        </div>
                                        </div>
                                        </div>
                                        <div className="lg:col-span-6 mb-5 ">
                                        <div className="text-left">
                                        <label htmlFor="email" className="font-semibold">Email: </label>
                                        <div className="form-icon relative mt-2">
                                            <i className="w-4 h-4 absolute top-3 left-4"><MdOutlineEmail size={18} /></i>
                                            <input onChange={(e)=>setemail(e.target.value)} value={email}  name="email"  type="email" className="form-input pl-11" placeholder="Email :" />
                                        </div>
                                        </div>
                                        </div>
                                        <div className={changepassword ? 'lg:col-span-6 mb-5 hidden':'lg:col-span-6 mb-5 '}>
                                        <button type='button' onClick={()=>setchangepassword(!changepassword) & setchangepassword(!changepassword)} className='border border-gray-500 rounded bg-blue-600 text-white p-1'>Change Password</button>
                                        </div>
                                    
                                        <div className={changepassword ? `lg:col-span-6 mb-5`:`lg:col-span-6 mb-5 hidden`}>
                                        <div className="text-left">
                                        <label htmlFor="password" className="font-semibold">New Password </label>
                                        <div className="form-icon relative mt-2">
                                            <i className="w-4 h-4 absolute top-3 left-4"><RiLockPasswordLine size={18} /></i>
                                            <input  name="password" onChange={(e)=>setnewpassword(e.target.value)} value={newpassword} type="password" className="form-input pl-11" placeholder="Password :" />
                                        </div>
                                        </div>
                                    </div>
                                        <div className={(username || contact || newpassword) ? `lg:col-span-6 mb-5`:`lg:col-span-6 mb-5 hidden`}>
                                        <div className="text-left">
                                        <label htmlFor="password" className="font-semibold">{ changepassword ? <p> Old Password :</p>: <p> Password :</p>} </label>
                                        <div className="form-icon relative mt-2">
                                            <i className="w-4 h-4 absolute top-3 left-4"><RiLockPasswordLine size={18} /></i>
                                            <input required name="password" onChange={(e)=>setoldpassword(e.target.value)} value={oldpassword} type="password" className="form-input pl-11" placeholder="Password :" />
                                        </div>
                                        </div>
                                    </div>

                                       
                                        {/* <button type="submit" id="submit" name="send" className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md justify-center flex items-center">Send Message</button> */}
                                        <div className='flex justify-end' ><button type="submit" className='w-40 p-2 bg-green-700 rounded-md  text-white hover:bg-green-900'>Submit</button></div>
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
                                    <button type="button" onClick={()=>setcartmodal(!cartmodal) & setchangepassword(!changepassword) & setnull() } className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
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
  )
}
