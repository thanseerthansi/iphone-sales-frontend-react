import React, { useContext, useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import { Link} from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';
import Whatsappbutton from './Whatsappbutton';
// import { BsCart4 } from 'react-icons/fa';
import { Simplecontext } from './Simplecontext';
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const {accesscheck,next,setnext,products,setproducts,getproduct} =useContext(Simplecontext)
  const [search,setsearch]= useState('')
  useEffect(() => {
    const getData = setTimeout(() => {    
      searchproduct()
    }, 1500)

    return () => clearTimeout(getData)
  }, [search])
  const notifyproductadded = () => toast.success('✅ Product added Successfully!', {
    position: "top-center",
    });
const notifyerror = () => toast.error(' Something went wrong', {
    position: "top-center",
    });
  const searchproduct = async()=>{
    console.log("search product",search)
    let data = await Callaxios("get","/product/product",{model_name:search})
    // console.log("data",data)
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
  return (
    <div className='transition-all'>
        <Header/>
        <section className="relative table w-full py-32 lg:py-40   bg-no-repeat    bg-center">
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
  <div className="container">
    <div className="grid grid-cols-1 pb-8 text-center mt-10">
      <h3 className="mb-3 text-3xl leading-normal font-medium text-white">iPhone Store</h3>
      <p className="text-slate-300 text-lg max-w-xl mx-auto">Buy &amp; Sell your iPhone here.</p>
    </div>{/*end grid*/}
  </div>{/*end container*/}
  <div className="absolute text-center z-10 bottom-5 right-0 left-0 mx-3">
    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
      <li className="inline breadcrumb-item uppercase text-[13px] font-bold duration-500 ease-in-out text-white"><Link to='/'>Home</Link></li>
      
    </ul>
  </div>

</section>
       <section className="relative md:py-24 py-16 bg-white dark:bg-slate-900  ">
  <div className="container ">
    <div className="grid grid-cols-1 items-center gap-[30px]">
      <div className="filters-group-wrap text-center">
      {/* search start */}
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
          <div className="form-icon relative mt-2 flex">
                    <i className="w-4 h-4 absolute top-3 left-4"><FaSearch size={18} /></i>
                      <input name="email" id="email" type="search" onChange={(e)=>setsearch(e.target.value)} className="form-input pl-11 border-gray-500 " placeholder="Search your iPhone here" />
                      {/* <button onClick={()=>searchproduct()} className='bg-gray-700 hover:bg-gray-600 px-3 rounded-r-md'><FaSearch size={20} color='white' /></button> */}
                    </div>
            {/* <div className="input-group relative flex border border-gray-400 rounded items-stretch w-full mb-4">
              <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search Your iPhone" aria-label="Search" aria-describedby="button-addon2" />
              <button className="btn flex px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-r-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  items-center" type="button" id="button-addon2">
                <FaSearch size={18}/>
              </button>
            </div> */}
          </div>
        </div>

      {/* search end */}
      </div>
    </div>{/*grid*/}
    
    <div className=' flex justify-center test-center'>

    <div id="" className="grid md:grid-cols-4 grid-cols-2 lg:pl-28 pl-auto mt-4 ">
      {products.map((itm,k)=>(
    
      <div key={k} className=" p-3 lg:w-3/5 md:w-3/5 flex  items-center " data-groups="[&quot;branding&quot;]">
        <div className="group relative block  justify-center overflow-hidden rounded-md transition-all duration-500">
          {/* <Link to='/details'><img src="https://i.ebayimg.com/images/g/FjcAAOSwINJhQhsZ/s-l600.jpg" className="rounded-md" alt={''} /></Link> */}
          <Link to={`/details/${itm.id}`}><img src={itm.images[0].image} className="rounded-md" alt={''} /></Link>
          <div className="content pt-3">
          <h5 className="mb-1 flex justify-center"><Link to="/details" className="hover:text-indigo-600 transition-all duration-500 font-semibold text-slate-900 dark:text-white">{itm.model_name}</Link></h5>
            <div className='flex justify-center '>
            <h6 className=" flex justify-center text-amber-700">From <span className=''>&nbsp; ${itm.sellfromprice}</span></h6>
            {/* <h6 className="text-slate-400 flex justify-center"> ${itm.sellfromprice}</h6> */}
            </div>
          </div>
        </div>
      </div>
      ))}
      
     {next ? 
      <div className="lg:w-1/2 md:w-1/3 p-3 picture-item  " data-groups="[&quot;branding&quot;]">
        <div className="group relative block overflow-hidden rounded-md transition-all duration-500">
          
          <div  className="content pt-14 flex  items-center">
            <h5 onClick={()=>getnextproduct()} className="mb-1 flex justify-center text-blue-600 font-semibold cursor-pointer hover:text-blue-900">{`Load More>>`}</h5>
            {/* <h6 className="text-slate-400 flex justify-center">Branding</h6> */}
          </div>
        </div>
      </div>
      :null}
    
     
      
     
     
      
    </div></div>
    

    {/* <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
      <div className="md:col-span-12 text-center">
       
          <span className='text-blue-500'>Load More</span><br/>
          <span className='text-blue-500'>vv</span>
          
     
      </div>
    </div> */}
  </div>{/*end container*/}
 
</section>



    <Footer/>
    <Whatsappbutton/>

    </div>
  )
}
