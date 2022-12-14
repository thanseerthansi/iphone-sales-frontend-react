import React, {useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import { json, Link} from 'react-router-dom';
// import { BiShoppingBag  } from 'react-icons/bi';
// import { FiShoppingCart ,FiSettings } from 'react-icons/fi';
// import { RiDeleteBin6Line,RiShoppingBag3Fill } from 'react-icons/ri';
import { MdPersonOutline,MdPhone,MdOutlineEmail,MdLocationCity,MdOutlineHome} from 'react-icons/md';
import Whatsappbutton from './Whatsappbutton';
// import { Simplecontext } from './Simplecontext';
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Selliphone() {
  // const {next,setnext,products,setproducts} =useContext(Simplecontext)
  const [products,setproducts]=useState([])
  const [storagelist,setstoragelist]=useState([])
  const [selectedproduct,setselectedproduct]=useState()
  const [imodel,setimodel]=useState(null);
  const [istorage,setistorage]=useState(null);
  const [icondition,seticondition]=useState();
  const [iprice,setiprice]=useState();
  const [conditiondata,setconditiondata]=useState()
  const [customerdetails,setcustomerdetails]=useState([])

  // console.log("storag",conditiondata)
  useEffect(() => {
    getproductfull()
  }, [])
  
  const successfullnotify = (sellid) => toast.success(`sell id : ${sellid} . Our Dealers will contact you shortly !`, {
      position: "top-center",
      });
  const notifyerror = () => toast.error(' Something went wrong', {
      position: "top-center",
      });
//   const getnextproduct = async()=>{
//     let data = await Callaxios("next",next)
//     // console.log("nextinnextcall",next)
//     if (data.status===200){
//         // console.log("daatanext",data.data.next)
//         setnext(data.data.next)
//         setproducts(products=>[...products,...data.data.results])
//     }else{
//         notifyerror()
//     }
// }
  const getproductfull =async()=>{
    let data = await Callaxios("get","product/productfull/",{"buystatus":"True"})
      // console.log("dataresponsenwxt",data)
      if (data.status===200){
          setproducts(data.data) 

      }else{
          notifyerror()
      }
  }
  const callstorage=(k)=>{
    // console.log("data",k)
    let data = products[k]
    setselectedproduct(data)
    // console.log("data1",data)
    let list =[];
    (data.buyprice.split(',')).map((itm)=>{
      
      let spl = itm.split('-')[0]
      if (list[0]){
        if (list.indexOf(spl) !== -1){
          }else{
            list.push(itm.split('-')[0])
          }
      }else{
        list.push(itm.split('-')[0])
      }
      })
      // console.log("list",list)
      setstoragelist(()=>[...list])
     
  } 
  const callconditionfn=async(value)=>{
    // console.log("data",value.split('-')[1])
    seticondition(value.split('-')[1]) 
    setiprice(value.split('-')[2])
    let data = await Callaxios("get","product/condition/",{"condition":value.split('-')[1]})
    console.log(data)
    if (data.status===200){
      console.log("datasuccess",data.data)
      setconditiondata(()=>[...data.data])
    }
  }  
  const checkout=async(e)=>{
    e.preventDefault();
    // console.log("product",selectedproduct.id)
    let data = {
      "product":selectedproduct.id,
      "price":iprice,
      "condition":icondition,
      "storage":istorage,
      "quantity":1,
      // "color":icolor,
      "total_price":iprice,
      // "total_price":parseFloat(iprice)+(parseFloat(iprice)/10),
      "status":"new",
      // "vat":(parseFloat(iprice)/10)

    }
    if (customerdetails){
      for (const [key, value] of Object.entries(customerdetails)) {
        // console.log("key",key)
        // console.log("value",value)
        data[key]= value
      }
    }
    // console.log("data",data)
    let postdata = await Callaxios('post',"selling/sellorder/",[data])
    // console.log("data",postdata)
    if (postdata.data.Status===200){
      successfullnotify(`SELL${postdata.data.date.split('T')[1].split('.')[1]}${postdata.data.id}`)
      setallnull()
    }else{
      notifyerror()
    }
    
  }
  const setallnull=()=>{
    setstoragelist()
    setselectedproduct()
    setimodel()
    setistorage()
    seticondition()
    setiprice()
    setconditiondata()
    setcustomerdetails()
  }
  return (
    <div className='transition-all'>
        <Header/>
        <ToastContainer />
        <section className="relative table w-full py-32 lg:py-40   bg-no-repeat    bg-center">
        <div className="absolute inset-0 bg-[url('https://cdn.thewirecutter.com/wp-content/media/2022/10/whichiphone-2048px-2681-3x2-1.jpg?auto=webp&quality=60&crop=1.91:1&width=1200')]  from-black/60 via-black/80 to-black" />
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-black-50 h-full lg:h-full w-full" />
  <div className="container">
    <div className="grid grid-cols-1 pb-8 text-center mt-10">
      <h3 className="mb-3 text-3xl leading-normal font-medium text-white">iPhone Store</h3>
      <p className="text-slate-300 text-lg max-w-xl mx-auto">Sell your iPhone here.</p>
    </div>{/*end grid*/}
  </div>{/*end container*/}
  <div className="absolute text-center z-10 bottom-5 right-0 left-0 mx-3">
    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
    <li className="inline breadcrumb-item uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"><Link to='/'>Home</Link></li>
      <li className="inline breadcrumb-item uppercase text-[13px] font-bold duration-500 ease-in-out text-white cursor-pointer" aria-current="page">Sell your iPhone</li>
    </ul>
  </div>
</section>
       <section className="relative md:py-24 py-16 bg-white dark:bg-slate-900  ">
  <div className="container ">
    <div className="grid grid-cols-1 items-center gap-[30px]">
      <div className="filters-group-wrap text-center">
        <div className="filters-group grid grid-cols-12">
        <div className='flex justify-center col-span-12 '>
          {/* <span><b> Search Your Phone :</b></span> */}

          <select onChange={(e)=>setimodel(e.target.value) & callstorage(e.target.value)} className="form-control  flex w-[90%] px-3 py-1.5  text-gray-700 bg-white border border-solid border-gray-300 rounded  focus:text-gray-700 focus:bg-white focus:border-blue-900 ">
          {products ? <>
            <option value={''} hidden>Select Your iPhone</option>
            
            {products.map((itm,k)=>(
              <option key={k}  value={k}>{itm.model_name}</option>
            ))}
            </>:null}
          </select> 
        </div>
        </div>
        
        <div className='grid grid-cols-12 '>
        {imodel? 
        <div className='md:col-span-6 col-span-12 pl-5 md:pl-14 pt-3'>
          
          <select onChange={(e)=>setistorage(e.target.value)} className="form-control  flex w-[95%] px-3 py-1.5  text-gray-700 bg-white border border-solid border-gray-300 rounded  focus:text-gray-700 focus:bg-white focus:border-blue-900 ">
            <option value={''} hidden>Select Storage</option>
            {storagelist.map((itm,k)=>(
              <option key={k} value={itm} >{itm} GB</option>
            ))}
            {/* <option>128 GB</option>
            <option>256 GB</option>
            <option>512 GB</option> */}
          </select>
        </div>
        
       :null}
       {istorage ? 
       <div className='md:col-span-6 col-span-12 pl-5  pt-3'>
          <select onChange={(e)=>callconditionfn(e.target.value)} className="form-control  flex w-[95%] md:w-[90%] px-3 py-1.5  text-gray-700 bg-white border border-solid border-gray-300 rounded  focus:text-gray-700 focus:bg-white focus:border-blue-900 ">
            <option   hidden value={''}>Select Condition</option>
            {(selectedproduct.buyprice.split(',')).filter(name => name.includes(istorage)).map((itm,k) =>(
              <option key={k} value={itm}>{itm.split('-')[1]} </option>
            ))}
            {/* <option>Excellent </option>
            <option>Good </option>
            <option>Bad</option> */}
          
          </select>
        </div>
        :null}
        </div>
        
      </div>
    </div>{/*grid*/}
    {icondition ? <>
    <div className=" pt-5 flex  container justify-center">
              <div className="bg-gray-50 overflow-auto dark:bg-slate-800 shadow border border-black md:w-[50%] w-[90%] dark:shadow-gray-800 p-2 rounded-md">
                <h5 className="text-lg font-semibold border-b border-gray-100 flex justify-center dark:border-gray-700 pb-3 mb-3">{icondition}</h5>
                <p className='flex justify-center'><b className='text-gray-600'>Price upto: {iprice}</b></p>
                <p className='text-amber-500'>Our Expert will evaluate its correct condition at the time of handover</p>
              <ul className=' '>
                {conditiondata ? conditiondata[0] ? conditiondata[0].description.split(',').map((itm,k)=>(
                   <ul key={k} className='list-outside list-disc flex pl-5'>
                   <li className='capitalize'>{itm}</li></ul>
                )):null :null}
                {/* {conditiondata? conditiondata[0].condition:null} */}
                
                {/* <li className=''><b>&#183; </b> Screen : No scratches</li>
                <li><b>&#183; </b>body : No dent</li>
                <li><b>&#183; </b>Battery health > 90</li> */}
                
              </ul>
                
              </div>
            </div>
            <div className='container'>
            <form  onSubmit={(e)=>checkout(e)} className='pt-5' >
                    <p className="mb-0" id="error-msg" />
                    <div id="simple-msg" />
                    <div className="grid lg:grid-cols-12 lg:gap-6">
                      <div className="lg:col-span-6 mb-5">
                        <div className="text-left">
                          <label htmlFor="name" className="font-semibold">Your Full Name:</label>
                          <div className="form-icon relative mt-2">
                            <i className="w-4 h-4 absolute top-3 left-4"><MdPersonOutline size={18} /></i>
                            <input required onChange={(e)=> setcustomerdetails({...customerdetails,customer_name:e.target.value})} name="name" id="name" type="text" className="form-input pl-11" placeholder="Name :" />
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-6 mb-5">
                        <div className="text-left">
                          <label htmlFor="email" className="font-semibold">Your Email:</label>
                          <div className="form-icon relative mt-2">
                          <i className="w-4 h-4 absolute top-3 left-4"><MdOutlineEmail size={18} /></i>
                            <input  onChange={(e)=> setcustomerdetails({...customerdetails,email:e.target.value})} name="email" id="email" type="email" className="form-input pl-11" placeholder="Email :" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-12 lg:gap-6">
                      <div className="lg:col-span-6 mb-5">
                        <div className="text-left">
                          <label htmlFor="contact" className="font-semibold">Contact:</label>
                          <div className="form-icon relative mt-2">
                            <i className="w-4 h-4 absolute top-3 left-4"><MdPhone size={18} /></i>
                            <input required onChange={(e)=> setcustomerdetails({...customerdetails,contact:e.target.value})} name="conact"  type="number" className="form-input pl-11" placeholder="Contact :" />
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-6 mb-5">
                        <div className="text-left">
                          <label htmlFor="email" className="font-semibold">City:</label>
                          <div className="form-icon relative mt-2">
                          <i className="w-4 h-4 absolute top-3 left-4"><MdLocationCity  size={18} /></i>
                            <input required onChange={(e)=> setcustomerdetails({...customerdetails,city:e.target.value})} name="city" id="city" type="city" className="form-input pl-11" placeholder="City :" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1">
                      <div className="mb-5">
                        <div className="text-left">
                          <label htmlFor="address" className="font-semibold">Delivery Address:</label>
                          <div className="form-icon relative mt-2">
                          <i className="w-4 h-4 absolute top-3 left-4">< MdOutlineHome size={18} /></i>
                            <input required onChange={(e)=> setcustomerdetails({...customerdetails,address:e.target.value})} name="address" id="address" className="form-input pl-11" placeholder="Address :" />
                          </div>
                        </div>
                      </div>
                      <div className="mb-5">
                        
                      </div>
                    </div>
                    {/* <button type="submit" id="submit" name="send" className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md justify-center flex items-center">Send Message</button> */}
                    <div><button type="submit" htmlFor="submit" className='w-64 p-2 bg-gray-800 rounded-md text-white hover:brightness-[.5]'>Buy now</button></div>
                  </form>
            </div>
            {/* <div className='flex justify-center pt-5'><button type="submit" className='w-64 p-2 bg-gray-800 rounded-md text-white hover:brightness-[.5]'>Sell now</button></div> */}
            </>
            :null}
    

    
  </div>{/*end container*/}
  
</section>



    <Footer/>
    <Whatsappbutton/>

    </div>
  )
}
