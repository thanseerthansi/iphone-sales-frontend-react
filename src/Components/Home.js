import React, { useContext, useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import { Link} from 'react-router-dom';
import {FaSearch,FaFilter} from 'react-icons/fa';
import Whatsappbutton from './Whatsappbutton';
// import { BsCart4 } from 'react-icons/fa';
import { Simplecontext } from './Simplecontext';
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import RangeSlider from 'react-dual-rangeslider'


export default function Home() {
  const {accesscheck,next,setnext,products,setproducts} =useContext(Simplecontext)
  const [search,setsearch]= useState('')
  const [filtermodal,setfiltermodal]=useState(false)
  const [fromprice,setfromprice] = useState(0)
  const [toprice,settoprice] = useState(100000)
  const [condition,setcondition] = useState([])
  const [conditiondata,setconditiondata] = useState([])
  const [storage,setstorage] = useState('')
  
  useEffect(() => {
    getproduct()
    getcondition()
    const getData = setTimeout(() => {    
      
      searchproduct()
    }, 1000)

    return () => clearTimeout(getData)
  }, [search])
  const notifyproductadded = () => toast.success('✅ Product added Successfully!', {
    position: "top-center",
    });
  const notifyerror = () => toast.error(' Something went wrong', {
    position: "top-center",
    });
    const getproduct = async()=>{
      let data = await Callaxios("get","product/product/",{sellstatus:"True"})
      // console.log("dataresponsenwxt",data.data.results)
      if (data.status===200){
          setnext(data.data.next)  
          setproducts(data.data.results) 

      }else{
          notifyerror()
      }
  }
  const getcondition = async()=>{
    let data = await Callaxios("get","/product/condition/")
    if (data.status===200){
        // console.log("conditiondata",data)
        setconditiondata(data.data)
    }else{
        notifyerror()
    }
}
  const searchproduct = async()=>{
    // console.log("search product",search)
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
    // console.log("nextinnextcall",next)
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
  <div className="absolute inset-0 bg-[url('https://cdn.thewirecutter.com/wp-content/media/2022/10/whichiphone-2048px-2681-3x2-1.jpg?auto=webp&quality=60&crop=1.91:1&width=1200')]  from-black/60 via-black/80 to-black" />
  <div class="absolute inset-0 bg-gradient-to-t from-black via-black to-black-50 h-full lg:h-full w-full" />
  
  {/* <div class="relative">
  <img src="http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back05.jpg" alt="BannerImage" class="absolute h-[70vh] lg:h-[80vh] w-full object-cover object-right opacity-30 " />
  <div class="absolute -z-10 bg-gradient-to-t from-white via-black to-black h-[70vh] lg:h-[80vh] w-full" />
</div> */}
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
      <div className=''>
        <button onClick={()=>setfiltermodal(!filtermodal)} className='border border-gray-600 p-1 pl-3 rounded font-medium   hover:text-blue-800 flex items-center'><span>filter </span><FaFilter/></button>  </div>
    </div>{/*grid*/}
    
    {/* <div className=' flex justify-center test-center'>

    <div id="" className="grid md:grid-cols-4 grid-cols-2 lg:pl-28 pl-auto mt-4 ">
      {products.length ? products.map((itm,k)=>(
    
      <div key={k} className=" p-3 lg:w-3/5 md:w-3/5 flex  items-center " data-groups="[&quot;branding&quot;]">
        <div className="group relative block  justify-center overflow-hidden rounded-md transition-all duration-500">
          <Link to={`/details/${itm.id}`}><img src={itm.images.length?  itm.images[0].image:null} className="rounded-md" alt={''} /></Link>
          <div className="content pt-3">
          <h5 className="mb-1 flex justify-center"><Link to={`/details/${itm.id}`} className="hover:text-indigo-600 transition-all duration-500 font-semibold text-slate-900 dark:text-white">{itm.model_name}</Link></h5>
            <div className='flex justify-center '>
            <h6 className=" flex justify-center text-amber-700">From <span className=''>&nbsp; ${itm.sellfromprice}</span></h6>
            </div>
          </div>
        </div>
      </div>
      )):null}
      
     {next ? 
      <div className="lg:w-1/2 md:w-1/3 p-3 picture-item  " data-groups="[&quot;branding&quot;]">
        <div className="group relative block overflow-hidden rounded-md transition-all duration-500">
          
          <div  className="content pt-14 flex  items-center">
            <h5 onClick={()=>getnextproduct()} className="mb-1 flex justify-center text-blue-600 font-semibold cursor-pointer hover:text-blue-900">{`Load More>>`}</h5>
          </div>
        </div>
      </div>
      :null}
    
     
      
     
     
      
    </div></div> */}
    
        <div id="grid" className="md:flex w-full justify-center mx-auto mt-4 ">
          <div className='grid md:grid-cols-4 grid-cols-2'>
          {products.length ? products.map((itm,k)=>(
            <div className='col-span-1 pt-5 flex justify-center'>  
          <div className="lg:w-5/6 md:w-5/6 p-4 picture-item border border-gray-200 rounded hover:text-blue-600 shadow-md cursor-pointer  " >
            <div className=''>
              <Link to={`/details/${itm.id}`}>
              <div className="relative bg-indigo-600 overflow-hidden rounded-md transform    transition duration-500 hover:scale-110">
                <p  className="lightbox transition-all duration-700 ease-in-out group-hover:p-[10px] bg-indigo-300" title>
                  <img src={itm.images.length?  itm.images[0].image:null} className="rounded-md h-48 w-96 object-cover" alt />
                </p>
              </div>
              <div>
              <div className='grid justify-center p-2'>
                <h2 className='font-bold pt-2 capitalize'>{itm.model_name}</h2>
              </div>
              <div className='grid grid-cols-2'>
                <div className='col-span-1 flex justify-center'>
                  <span className=' text-gray-400 '><del> AED {itm.oldfromprice}</del></span>
                </div>
                <div className='col-span-1 flex justify-center'>
                  <span className='  text-gray-900 '> AED {itm.sellfromprice}</span>
                </div>
                
                </div>
                </div>
                </Link>
            </div>
          </div>

          </div>
          )):null}
          {next ? 
           <div className='col-span-1 pt-5 flex justify-center'>  
          <div onClick={()=>getnextproduct()} className="lg:w-5/6 md:w-5/6 p-4 picture-item border border-gray-200 rounded text-blue-700 hover:text-red-500 hover:bg-blue-600 hover:font-bold shadow-md cursor-pointer  " >
            <div className='flex items-center justify-center'>
              
            
              <div className="relative flex items-center justify-center overflow-hidden rounded-md transform    transition  hover:scale-110">
                <p  className="lightbox transition-all  duration-700 ease-in-out group-hover:p-[10px] pt-24 " title>
                 <h2>Load More..</h2>
                </p>
              </div>
              
         
            </div>
          </div>

          </div>
          :null}
          </div>
    </div>

          {/* filtermodal start */}
          <div className={`modal eas duration-300 fixed z-40 top-0  ${filtermodal ? "-translate-x-0" : "-translate-x-full"} left-0 shadow-md transition-all sm:w-full md:w-60 h-screen outline-none overflow-x-hidden overflow-y-auto`} id="exampleModalScrollable" tabIndex={-1} aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable h-full relative w-auto pointer-events-none">
                    <div className="modal-content border-none h-full shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                            Filter
                        </h5>
                        <button type="button" onClick={()=>setfiltermodal(!filtermodal) } className="btn-close box-content w-4 h-4 p-1 text-gray-500    hover:text-red-600 "><b>X</b></button>
                        </div>
                        {/* <input onChange={(e)=>setsearchcheck(e.target.value)} value={searchcheck} type='text' placeholder='search'/> */}
                        {/* data start */}
                        <section className="relative md:py-10 py-16  bg-white dark:bg-slate-900">
                            <div className=" p-2 grid ">
                            <label><b>From Price : </b>{fromprice}</label>
                            <input type="range" min="0" onChange={(e)=>setfromprice(e.target.value)} value={fromprice} max="10000"  className="range" /><br/>
                            <label><b>To Price : </b>{toprice}</label> 
                            <input type="range" min="10000" onChange={(e)=>settoprice(e.target.value)} value={toprice} max="100000"  className="range" /><br/>
                            <label><b>Select condition :</b></label>
                            <select onChange={(e)=>setcondition(e.target.value)} className='rounded border bordre-gray-500 p-2'>
                              <option hidden>Select Condition</option>
                              <option value={''}>ALL</option>
                              {conditiondata.map((itm,k)=>(
                                <option value={itm.condition}>{itm.condition}</option>
                              ))}
                            </select><br/>
                            <select onChange={(e)=>setstorage(e.target.value)} className='rounded border bordre-gray-500 p-2'>
                              <option hidden>Select Storage</option>
                              <option value={''}>ALL</option>
                              <option value ={'128'}>128 GB</option>
                              <option value ={'256'}>256 GB</option>
                              <option value ={'512'}>512 GB</option>
                              {/* <option value ={'1'}>1 TB</option> */}
                            </select><br/>
                              <div className='flex justify-end'>
                                <button className='bg-amber-500 text-white rounded p-2'>Apply</button>
                              </div>
                                    <div className="flex justify-center pt-2">
                                    
                                    </div>
                                        {/* end review */}
                            </div>{/*end container*/}
                            
                            {/*end container*/}
                            {/* <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                    <button type="button" onClick={()=>setfiltermodal(!filtermodal)} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                   
                                    </div> */}
                            </section>
                                    {/* cart data end */}                                 
                    </div>
                    </div>
            </div>
          {/* filtermodal end */}
  </div>{/*end container*/}
 
</section>



    <Footer/>
    <Whatsappbutton/>

    </div>
  )
}
