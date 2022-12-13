import React, { useContext, useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import { Link, useParams} from 'react-router-dom';
import {GiReturnArrow} from 'react-icons/gi';
import {FaUnlock,FaThumbsUp} from 'react-icons/fa';
import {AiOutlineSafetyCertificate} from 'react-icons/ai';
import { MdPersonOutline,MdPhone,MdOutlineEmail,MdLocationCity,MdOutlineHome} from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Whatsappbutton from './Whatsappbutton';
import Callaxios from './Callaxios';
import {useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactStars from "react-rating-stars-component";
// import { Simplecontext } from './Simplecontext';
// import {TbPlayerTrackNext} from 'react-icons/tb';
export default function Phonedetail() {
  // const {products} =useContext(Simplecontext)
  const [mybuymodal,setmybuymodal]=useState(false)
  const [reviewview,setreviewview]=useState(false)
  const [storagelist,setstoragelist] = useState([])
  const [productdetail,setproductdetail]=useState('')
  const [viewcart,setviewcart]=useState([])
  const [bag,setbag]=useState([])
  const [iquantity,setiquantity]=useState(1)
  const [icolor,seticolor]=useState() //store as array index :value
  const [istorage,setistorage]=useState()//store as array index :value
  const [icondition,seticondition]=useState()//store as array index :value
  const [iprice,setiprice]=useState()//store as array index :value
  const [ogprice,setogprice]=useState()
  const [customerdetails,setcustomerdetails]=useState()
  const [images,setimages]=useState([])
  const [review,setreview]=useState()
  const [reviename,setreviename]=useState()
  const [starrating,setstarrating]=useState()
  const [reviewdata,setreviewdata]=useState()
  const [reviewnext,setreviewnext]=useState()
  // console.log("reviewdata",reviewdata)
  // const [address,setaddress]=useState()
  // const [address,setaddress]=useState()
  const  urlparam  = useParams()
  let urlid = urlparam.id
  let navigate = useNavigate();
  // console.log("produ",productdetail)
  const notifyproductadded = () => toast.success('Product added to cart !', {
    position: "top-center",
    });
  const reviewaddnotify = () => toast.success('Review added Successfully !', {
    position: "top-center",
    });
  const successfull = () => toast.success('Successfully Purchased. data will be in your bag!', {
    position: "top-center",
    });
  const notifyupdated = () => toast.success('Product updated Successfully!', {
      position: "top-center",
      });
  const notifyerror = () => toast.error(' Something went wrong', {
      position: "top-center",
      });
  const notifyerrorfill = () => toast.error('Select All Fields', {
      position: "top-center",
      });
  const notifydelete = () => toast.success('deleted Successfully ', {
      position: "top-center",
      });

  useEffect(() => {
    getdetailproduct()
    cartproduct()
    bagproduct()
    getreview()
  }, [])
  
  const getdetailproduct=async()=>{
    let data =await Callaxios("get","product/product/",{"id":urlid})
    // console.log("prodetsila",data)
    if (data.status===200){
      setproductdetail(data.data.results)
      storagecheck(data.data.results)
    }
  }
  // to add the strage in  storagelist state
  const storagecheck = (data)=>{
    let list =[];
    (data[0].sellprice.split(',')).map((itm)=>{
      
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
      setistorage(list[0])
  }   
  const cartproduct=()=>{
    let orderlist = window.localStorage.getItem('cart')
    // checkoutorder
    // console.log("orderlis3",JSON.parse(orderlist))
    try {
      if (orderlist.length){
        // console.log("listpresent")
        setviewcart(JSON.parse(orderlist))  
      }else{}      
    } catch (error) {} 
       
  }
  const bagproduct=()=>{
    let baglist = window.localStorage.getItem('bag')
    // checkoutorder
    // console.log("orderlis3",JSON.parse(orderlist))
    try {
      if (baglist.length){
        // console.log("listpresent")
        setbag(JSON.parse(baglist))  
      }else{}      
    } catch (error) {} 
       
  }
  const decrementhandler =()=>{
    if (iquantity!==1){
      // console.log("quanty",iquantity)
      let lessone = iquantity-1
      setiquantity(lessone)
      setiprice(parseFloat(ogprice)*parseFloat(lessone))
      // console.log("price",singleprice)
      
    }
  }

  const incrementhandler =()=>{
    if (iquantity!==10){
      let lessone = iquantity+1
      setiquantity(lessone)
      setiprice(parseFloat(lessone)*parseFloat(ogprice))
    }
  }

  const addtocartfunction = ()=>{
    let cartproduct = {
      "product":productdetail,
      "price":iprice,
      "condition":icondition,
      "storage":istorage,
      "quantity":iquantity,
      "color":icolor
    }
    let cart = viewcart.concat(cartproduct)
    setviewcart(cart)
    window.localStorage.setItem('cart',JSON.stringify(cart))
    notifyproductadded()
    // return navigate('/')
    
  }
  const checkout=async(e)=>{
    e.preventDefault();
    // console.log("product",productdetail)
    let data = {
      "product":productdetail[0].id,
      "price":iprice,
      "condition":icondition,
      "storage":istorage,
      "quantity":iquantity,
      "color":icolor,
      "subtotal_price":iprice,
      "total_price":parseFloat(iprice)+(parseFloat(iprice)/10),
      "status":"new",
      "vat":(parseFloat(iprice)/10)

    }
    if (customerdetails){
      for (const [key, value] of Object.entries(customerdetails)) {
        // console.log("key",key)
        // console.log("value",value)
        data[key]= value
      }
    }
    // console.log("data",data)
    let postdata = await Callaxios('post',"purchase/order/",[data])
    // console.log("data",postdata)
    if (postdata.data.Status===200){
      successfull()
      let mybag = {
        "product":productdetail,
        "price":parseFloat(iprice)+(parseFloat(iprice)/10),
        "condition":icondition,
        "storage":istorage,
        "quantity":iquantity,
        "color":icolor,
        "orderno":(`SN${postdata.data.date.split('T')[1].split('.')[1]}${postdata.data.id}`)
      }
      // console.log("bag",mybag)
      let addtobag = bag.concat(mybag)
      setbag(addtobag)
      window.localStorage.setItem('bag',JSON.stringify(addtobag))
      setmybuymodal(!mybuymodal)
      setallnull()

    }else{
      notifyerror()
    }
    
  }
  const setallnull=()=>{
    setiquantity(1)
    seticolor('')
    // setistorage('')
    seticondition('')
    setiprice('')
    setogprice('')
    setcustomerdetails('')
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
  const reviewadd =async(e)=>{
    e.preventDefault()
    // console.log("productdetail",productdetail[0].id)
    const form_data = new FormData();      
    if (images){
        images.map((itm)=>{
            form_data.append("imagelist",itm)
            
        })  
    }
    form_data.append("description",review)
    form_data.append("customer",reviename)
    form_data.append("product",productdetail[0].id)
    form_data.append("review_star",starrating)
   
    let postreview = await Callaxios("post","purchase/review/",form_data)
    // console.log("postdata",postreview.data.Status)
    if (postreview.data.Status===200){
      setreviewview(!reviewview)
      reviewaddnotify()
      getreview()
      setimages('')
      setreview('')
      setreviename('')
      setstarrating('')
    }else{
      notifyerror()
    }
  }
  const ratingChanged = (newRating) => {
    // console.log(newRating);
    setstarrating(newRating)
  };
  const getreview=async()=>{
    let data = await Callaxios("get","purchase/review/",{"product":urlid})
    // console.log("data",data.data.results)
    if(data.status===200){
      // console.log("daatojk")
      setreviewdata(data.data.results)
      setreviewnext(data.data.next)
    }
  }
  const reviewgetnext=async()=>{
    let data = await Callaxios("next",reviewnext)
    // console.log("nextinnextcall",next)
    if (data.status===200){
        // console.log("daatanext",data.data.next)
        setreviewnext(data.data.next)
        setreviewdata(reviewdata=>[...reviewdata,...data.data.results])
    }else{
        notifyerror()
    }
  }
  return (
    <div>
      <Header/>
      <ToastContainer />
      <section className="relative table w-full py-32 lg:py-40   bg-no-repeat    bg-center">
      <div className="absolute inset-0 bg-[url('https://cdn.thewirecutter.com/wp-content/media/2022/10/whichiphone-2048px-2681-3x2-1.jpg?auto=webp&quality=60&crop=1.91:1&width=1200')]  from-black/60 via-black/80 to-black" />
  <div class="absolute inset-0 bg-gradient-to-t from-black via-black to-black-50 h-full lg:h-full w-full" />
  <div className="container">
    <div className="grid grid-cols-1 pb-8 text-center mt-10">
      <h3 className="mb-3 text-3xl leading-normal font-medium text-white">iPhone Store</h3>
      <p className="text-slate-300 text-lg max-w-xl mx-auto">Buy your iPhone here.</p>
    </div>{/*end grid*/}
  </div>{/*end container*/}
  <div className="absolute text-center z-10 bottom-5 right-0 left-0 mx-3">
    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
      <li className="inline breadcrumb-item uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"><Link to='/'>Home</Link></li>
      <li className="inline breadcrumb-item uppercase text-[13px] font-bold duration-500 ease-in-out text-white cursor-pointer" aria-current="page">Detail</li>
    </ul>
  </div>
</section>
{/* Start Section*/}
<section className="relative md:py-24 py-16  bg-white dark:bg-slate-900">
  <div className="container">
    <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
      <div className="lg:col-span-5 md:col-span-6">
        <div className="grid grid-cols-1 gap-[30px]">
          {productdetail.length ? productdetail[0].images.map((itm,k)=>(
            
            <div key={k}>
            <img  src={itm.image} className="rounded-lg" alt={''} />
            </div>
          
          ))
          :null}
          {/* <img src="https://www.apple.com/v/iphone-14-pro/c/images/overview/hero/hero_iphone_14_pro__e0act2165xqq_large.jpg" className="rounded-lg" alt={''} />
          <img src="https://media.wired.com/photos/632119a7f1e5c40d2b1bc647/master/pass/iPhone-14-Pro-Review-Gear.jpg" className="rounded-lg" alt={''} />
          <img src="https://www.digitaltrends.com/wp-content/uploads/2022/09/iPhone-14-Pro-Back-Purple-Hand.jpg?p=1" className="rounded-lg" alt={''} />
          <img src="https://imageio.forbes.com/specials-images/imageserve/62ec001d64a2e8ce307b70bd/Apple-iphone13-design-09142021/960x0.jpg?height=399&width=711&fit=bounds" className="rounded-lg" alt={''} /> */}
        </div>
        {/* end grid */}
      </div>{/*end col*/}
      <div className="lg:col-span-7 md:col-span-6">
        <div className="sticky top-20">
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-[30px]">
            <div className="lg:col-span-12">
              <div className="work-details">
                <h4 className="text-xl font-semibold mb-3 border-b border-gray-100 dark:border-gray-700 text-black dark:text-white pb-3">{productdetail.length ? productdetail[0].model_name :null}</h4>
                {/* <div><h5 className='font-semibold text-md text-dark dark:text-white' >Color :</h5>
                <div className='flex '>
                 
                  {productdetail.length ? productdetail[0].colors ? 
                    productdetail[0].colors.split(',').map((itm,k)=>(
                    <div key={k} className='p-2'>
                    
                      <button  onClick={()=>seticolor(itm)} className={icolor === itm ?`rounded-full w-7 h-7  border-gray-900 border-2 brightness-50`:`rounded-full w-7 h-7  border-gray-900 hover:border-2 `} style={{backgroundColor:itm}}></button>
                    </div>
                    ))
                     :null
                  :null}
                 
                </div></div> */}
                <div><h5 className='font-semibold text-md text-dark dark:text-white' >Storage :</h5>
                <div className='flex '>
        
                  {storagelist ?
                    storagelist.map((itm,k)=>(
                      
                      <div key={k} className='p-2'><button onClick={()=>setistorage(itm) &seticondition('') &setiprice('') & setogprice('')} className={istorage === itm ? `bg-gray-700 font-semibold  py-2 px-4 border  text-white border-gray-400  hover:bg-gray-700  rounded`:`bg-gray font-semibold  py-2 px-4 border text-gray-400 hover:text-white border-gray-400  hover:bg-gray-700  rounded`} >{itm} GB</button></div>
                      
                    ))
                  :null}
                  {/* <div className='p-2'><button className=" font-semibold  py-2 px-4 border text-gray-400 hover:text-white border-gray-400  bg-gray  hover:bg-gray-700  rounded"> 128 GB</button></div>
                  <div className='p-2'><button className=" font-semibold  py-2 px-4 border text-gray-400 hover:text-white border-gray-400  bg-gray  hover:bg-gray-700  rounded"> 256 GB</button></div>
                  <div className='p-2'><button className=" font-semibold  py-2 px-4 border text-gray-400 hover:text-white border-gray-400  bg-gray  hover:bg-gray-700  rounded"> 512 GB</button></div> */}
                  
                </div></div>
                <div><h5 className='font-semibold text-md text-dark dark:text-white' >Condition :</h5>
                <div className='flex '>
                  {productdetail.length ? <>
                    {(productdetail[0].sellprice.split(',')).filter(name => name.includes(istorage)).map((itm,k) =>(
                      <div key={k} className='p-2'><button onClick={()=>seticondition(itm.split('-')[1]) & setiprice(itm.split('-')[2]) &setogprice(itm.split('-')[2])} className={`font-semibold ${icondition === itm.split('-')[1]? `text-white bg-gray-700`:`bg-gray text-gray-400`} px-4 border  hover:text-white border-gray-400   hover:bg-gray-700  rounded `}> {itm.split("-")[1]}<br/>AED {itm.split('-')[2]}</button></div>
                    ))}
                  </> :null}
                  {/* <div className='p-2'><button className=" font-semibold  px-4 border text-gray-400 hover:text-white border-gray-400  bg-gray  hover:bg-gray-700  rounded"> Good <br/>AED 3,100</button></div>
                  <div className='p-2'><button className=" font-semibold  px-4 border text-gray-400 hover:text-white border-gray-400  bg-gray  hover:bg-gray-700  rounded"> VeryGood<br/>AED 3,250</button></div>
                  <div className='p-2'><button className=" font-semibold  px-4 border text-gray-400 hover:text-white border-gray-400  bg-gray  hover:bg-gray-700  rounded"> Excellent<br/>AED 3,400</button></div> */}
                  
                </div></div>
                
              </div>
              <div className='flex  pt-3 font-semibold text-md text-dark'>
                <h5 className='font-semibold text-md text-dark dark:text-white' >Quantity :</h5>
                <div className=' pl-2 flex'>
                <button className='border w-5 flex justify-center border-gray-500 cursor-pointer hover:text-white hover:bg-gray-700 ' onClick={()=>decrementhandler()}>-</button>
                <span className='border w-10 flex justify-center border-gray-600 '>{iquantity}</span>
                <button className='border w-5 flex justify-center border-gray-500 cursor-pointer hover:text-white hover:bg-gray-700 ' onClick={()=>incrementhandler()} >+</button>
               </div></div>
              <div className='md:flex pt-5'>
                <div><button onClick={()=>iprice  ? addtocartfunction() :notifyerrorfill()} className='w-64 p-2 bg-gray-800 rounded-md text-white hover:brightness-[.5]'>Add to Cart</button></div>
                <div className='lg:px-1 md:pt-0 pt-3'><button onClick={()=>iprice? setmybuymodal(!mybuymodal) : notifyerrorfill()} className='w-64 p-2 bg-green-600 rounded-md text-white hover:brightness-[.7]'>buy now</button></div>
              </div>
            </div>{/*end col*/}     
            <div className="lg:col-span-3 col-span-3   ">
              <div className="bg-gray-50 dark:bg-slate-800 border border-black h-36 shadow dark:shadow-gray-800 p-2 rounded-md">
                <div className='flex justify-center'><GiReturnArrow size={50}/></div>
                <span className='flex text-center'>10 days to change your mind</span>
              </div>
            </div>{/*end col*/}
            <div className="lg:col-span-3 col-span-3 ">
              <div className="bg-gray-50 dark:bg-slate-800 border border-black h-36 shadow dark:shadow-gray-800 p-2 rounded-md">
                <div className='flex justify-center'><FaUnlock size={50}/></div>
                <span className='flex text-center'>All our phones are unlocked</span>
              </div>
            </div>{/*end col*/}
            <div className="lg:col-span-3 col-span-3 ">
              <div className="bg-gray-50 dark:bg-slate-800 border border-black h-36 shadow dark:shadow-gray-800 p-2 rounded-md">
                <div className='flex justify-center'><AiOutlineSafetyCertificate size={50}/></div>
                <span className='flex text-center'>12 months free warranty</span>
              </div>
            </div>{/*end col*/}
            <div className="lg:col-span-3 col-span-3 ">
              <div className="bg-gray-50 dark:bg-slate-800 border border-black h-36 shadow dark:shadow-gray-800 p-2 rounded-md">
                <div className='flex justify-center'><FaThumbsUp size={50}/></div>
                <span className='flex text-center'>Free 1-2 days delivery</span>
              </div>
            </div>{/*end col*/}
            {/*end col*/}
          </div>{/*end grid*/}
        </div>
      </div>{/*end col*/}
    </div>{/*end grid*/}
  </div>{/*end container*/}
  <div className="container md:mt-24 mt-16">
    <div className="grid grid-cols-1 ">
      <span className="text-slate-500 mb-4">Reviews &amp; Comments :</span>
      
    </div>
    <div className='container  rounded shadow dark:shadow-gray-800 m-2 p-6'>
    <button onClick={()=>setreviewview(!reviewview)} className={reviewview ?`bg-gray-500 rounded text-gray-100 hidden hover:bg-gray-400 p-2`:`bg-gray-500 rounded text-gray-100 hover:bg-gray-400 p-2 `}>Add Review</button>
    <div className={reviewview ? ``:`hidden`}>
    <form onSubmit={(e)=>starrating ? reviewadd(e):notifyerrorfill()}>
    <div className="form-outline">
      <label className='font-bold'>Give star : <b className='text-red-600'>*</b></label>
    <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />
  <label className='font-bold'>  Message : <b className='text-red-600'>*</b></label>
      <textarea onChange={(e)=>setreview(e.target.value)} required placeholder='Message' className="form-control w-full border rounded border-gray-600 p-2" id="textAreaExample1" rows="4"/>
      <div className='grid grid-cols-4'>
      <div className='md:col-span-2 col-span-4'>
          <label className='font-bold'>Customer Name : <b className='text-red-600'>*</b></label><br/>
          <input type='name' htmlFor='name'  onChange={(e)=>setreviename(e.target.value)} placeholder='Name' required className='border border-gray-600 rounded p-1 ' />
        </div>
      <div className='md:col-span-2 col-span-4'>
      {images ?
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
      
          <label className='font-bold'>Add Images :<b className='text-red-600'>*</b></label><br/>
        <input onChange={(e)=>imageaddtolist(e.target.files[0])}  type='file' className='border border-gray-600 rounded '/>
        </div>
        
      </div>
      
    </div>
      <div className='flex justify-end'>
        <button type='submit' className='bg-green-700 hover:bg-green-800 rounded text-white p-2'> Submit</button>
        </div>
      
      </form>
    </div>
    
    </div>
    {/* start review */}
    <div className="tiny-slide ">
    {reviewdata ? reviewdata.map((itm,k)=>(
    <div key={k} className="">
      <div className="content  rounded shadow dark:shadow-gray-800 m-2 p-6 bg-white dark:bg-slate-900">
        <i className=" text-indigo-600" />
        <div className=" mt-1">
        
        <h6 className="mt-2 font-semibold">{itm.customer}</h6>
       
        <ReactStars 
          value={itm.review_star}
          count={5}
          size={25}
          edit={false}
          isHalf={false}
          activeColor="#ffd700"
      />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className=''><p className="text-slate-400">{itm.description}</p></div>
        <div className='flex justify-end '>
          {itm.images.length ? itm.images.map((itmimage,k2)=>(
            <div key={k2} className=''>
          <img  src={itmimage.image} className="rounded  w-20 h-24 object-cover" alt={''} /><br/>
          </div>)):null}
          </div>
      </div>
      </div>
      
    </div>
    )):null}
 

</div>

<div className="flex justify-center pt-2">
<div className={reviewnext ? ``:`hidden`}>
  {/* <button type="button" className="bg-gray-800 text-white  rounded-l-md border-r hover:brightness-[.3] border-gray-100 py-2 px-3">
    <div className="flex flex-row align-middle">    
      <p className="ml-2">Prev</p>
    </div>
  </button> */}
  <button onClick={()=>reviewgetnext()} type="button" className="bg-blue-700 text-white rounded-r-lg border-r hover:brightness-[.5] border-gray-100 py-2  px-3">
    <div  className="flex flex-row align-middle">    
      <p  className="ml-2 flex">Load More.. </p>
    </div>
  </button>
 


</div>

</div>



    {/* end review */}
    {/*end grid*/}
  </div>
    {/* buy modal start */}
    
    <div className={`modal eas duration-300 fixed z-40 top-0  ${mybuymodal ? "-translate-x-0" : "translate-x-full"} left-0  transition-all w-full  h-screen outline-none overflow-x-hidden overflow-y-auto`} id="exampleModalScrollable" tabIndex={-1} aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-scrollable h-full relative w-auto pointer-events-none">
      <div className="modal-content border-none h-full shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
          <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
            checkout
          </h5>
          <button type="button" onClick={()=>setmybuymodal(!mybuymodal)} className="btn-close box-content w-4 h-4 p-1 text-gray-500    hover:text-red-600 "><b>X</b></button>
        </div>
        {/* cart data start */}
        <section className="relative md:py-10 py-16  bg-white dark:bg-slate-900">
          <div className="container">
            <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
              <div className="lg:col-span-6 md:col-span-6">
                <div className="grid grid-cols-1 gap-[10px]">


                <div className='grid grid-cols-3 bg-[#f2f2f2] p-5' >
                    <div className='col-span-2 flex '>
                      <div className='flex col-span-1'>
                    <img src={productdetail.length ? productdetail[0].images[0].image :null} className="rounded-lg w-28" alt={''} />&nbsp;&nbsp;
                      </div>
                      <div className='col-span-1 '>
                 <div>
                   <span ><b>{productdetail.length? productdetail[0].model_name:null}</b></span><br/>
                   <span className='capitalize' >{istorage} GB-{icondition}</span><br/>
                 </div>
                 <div className='pt-2'>
                   <span ><b>Quantity :</b></span>
                   <div className=' pt-2 flex'>
                     <button className='border w-5 flex justify-center border-gray-500 cursor-pointer hover:text-white hover:bg-gray-700 ' onClick={()=>decrementhandler(iprice)}>-</button>
                     <span className='border w-10 flex justify-center border-gray-600 '>{iquantity}</span>
                     <button className='border w-5 flex justify-center border-gray-500 cursor-pointer hover:text-white hover:bg-gray-700 ' onClick={()=>incrementhandler(iprice)} >+</button>
                   </div>
                 </div> 
                 </div>
                 </div>            
                 <div className='col-span-1 '>
                   <div className='flex justify-end'>
                   <span ><b>Price :</b> {iprice}</span>
                   </div>
                   
                 </div>
                  </div>
                  
                  </div>{/*end grid*/}
                  </div>{/*end col*/}
                  <div className="lg:col-span-6 md:col-span-6 ">
                    <div className="sticky top-20 w-50">
                      <div className="grid lg:grid-cols-12 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-12">
                          
                          <div className="">
                          <div className="bg-gray-50 dark:bg-slate-800 shadow border border-black md:w-[80%] dark:shadow-gray-800 p-2 rounded-md">
                            {/* <h5 className="text-lg font-semibold border-b border-gray-100 dark:border-gray-700 pb-3 mb-3">Project Info :</h5> */}
                            <dl className="grid grid-cols-12 mb-0 pb-2">
                              <dt className="md:col-span-5 col-span-5 mt-2">Price :</dt>
                              <dd className="md:col-span-7 col-span-7 mt-2 text-slate-400">AED {iprice}</dd>
                              <dt className="md:col-span-5 col-span-5 mt-2">VAT :</dt>
                              <dd className="md:col-span-7 col-span-7 mt-2 text-slate-400">AED {(iprice)/(10)}</dd>
                              <dt className="md:col-span-5 col-span-5 mt-2">Delivery Charge :</dt>
                              <dd className="md:col-span-7 col-span-7 mt-2 text-slate-400">0 AED</dd>
                            </dl>
                            <hr className=''/>
                            <dl className="grid grid-cols-12 mb-0"> 
                              <dt className="md:col-span-5 col-span-5 mt-2">Total :</dt>
                              <dd className="md:col-span-7 col-span-7 mt-2 text-slate-400">AED {(parseFloat(iprice)/parseFloat(10))+parseFloat(iprice)}</dd>
                            </dl>  
                          </div>
                        </div> 
                        {/* form start */}
                  <form  onSubmit={(e)=>checkout(e)} className='pt-5' >
                    <p className="mb-0" id="error-msg" />
                    <div id="simple-msg" />
                    <div className="grid lg:grid-cols-12 lg:gap-6">
                      <div className="lg:col-span-6 mb-5">
                        <div className="text-left">
                          <label htmlFor="name" className="font-semibold">Your Full Name: <b className='text-red-600'>*</b></label>
                          <div className="form-icon relative mt-2">
                            <i className="w-4 h-4 absolute top-3 left-4"><MdPersonOutline size={18} /></i>
                            <input required onChange={(e)=> setcustomerdetails({...customerdetails,customer_name:e.target.value})} name="name" id="name" type="text" className="form-input pl-11" placeholder="Name :" />
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-6 mb-5">
                        <div className="text-left">
                          <label htmlFor="email" className="font-semibold">Your Email: <b className='text-red-600'>*</b></label>
                          <div className="form-icon relative mt-2">
                          <i className="w-4 h-4 absolute top-3 left-4"><MdOutlineEmail size={18} /></i>
                            <input onChange={(e)=> setcustomerdetails({...customerdetails,email:e.target.value})} name="email" id="email" type="email" className="form-input pl-11" placeholder="Email :" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-12 lg:gap-6">
                      <div className="lg:col-span-6 mb-5">
                        <div className="text-left">
                          <label htmlFor="contact" className="font-semibold">Contact: <b className='text-red-600'>*</b></label>
                          <div className="form-icon relative mt-2">
                            <i className="w-4 h-4 absolute top-3 left-4"><MdPhone size={18} /></i>
                            <input required onChange={(e)=> setcustomerdetails({...customerdetails,contact:e.target.value})} name="conact"  type="number" className="form-input pl-11" placeholder="Contact :" />
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-6 mb-5">
                        <div className="text-left">
                          <label htmlFor="email" className="font-semibold">City: <b className='text-red-600'>*</b></label>
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
                          <label htmlFor="address" className="font-semibold">Delivery Address: <b className='text-red-600'>*</b></label>
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
                  {/* form end */}  
                        </div>{/*end col*/}     
                      
                        {/*end col*/}
                      </div>{/*end grid*/}
                    </div>
                  </div>{/*end col*/}
                </div>{/*end grid*/}
              </div>{/*end container*/}               
              {/*end container*/}
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                      <button type="button" onClick={()=>setmybuymodal(!mybuymodal)} className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
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
    {/* buy modal end */}
  {/*end container*/}
</section>
{/*end section*/}  
    <Footer/>
    <Whatsappbutton/>
    </div>
  )
}
