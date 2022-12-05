import React, { useContext, useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import { Link, useParams} from 'react-router-dom';
import {GiReturnArrow} from 'react-icons/gi';
import {FaUnlock,FaThumbsUp} from 'react-icons/fa';
import {AiOutlineSafetyCertificate} from 'react-icons/ai';
import Whatsappbutton from './Whatsappbutton';
import Callaxios from './Callaxios';
import { Simplecontext } from './Simplecontext';
// import {TbPlayerTrackNext} from 'react-icons/tb';
export default function Phonedetail() {
  // const {products} =useContext(Simplecontext)
  const [storagelist,setstoragelist] = useState([])
  const [productdetail,setproductdetail]=useState('')
  const [iquantity,setiquantity]=useState(1)
  const [icolor,seticolor]=useState() //store as array index :value
  const [istorage,setistorage]=useState()//store as array index :value
  const [icondition,seticondition]=useState()//store as array index :value
  const  urlparam  = useParams()
  let urlid = urlparam.id
  // console.log("produ",istorage)
  
  useEffect(() => {
    getdetailproduct()
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
    data[0].sellprice.split(',').map((itm,k)=>{
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
  const decrementhandler =()=>{
    if (iquantity!==1){
      let lessone = iquantity-1
      setiquantity(lessone)
    }
  }
  const incrementhandler =()=>{
    if (iquantity!==10){
      let lessone = iquantity+1
      setiquantity(lessone)
    }
  }
  return (
    <div>
      <Header/>
      <section className="relative table w-full py-32 lg:py-40   bg-no-repeat    bg-center">
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
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
          {productdetail[0]?<>
          {productdetail[0].images.map((itm,k)=>(
            // <div>dsfsdgfsd</div>
            <img key={k} src={itm.image} className="rounded-lg" alt={''} />
          ))}
          </>:null}
          {/* <img src="https://www.apple.com/v/iphone-14-pro/c/images/overview/hero/hero_iphone_14_pro__e0act2165xqq_large.jpg" className="rounded-lg" alt={''} />
          <img src="https://media.wired.com/photos/632119a7f1e5c40d2b1bc647/master/pass/iPhone-14-Pro-Review-Gear.jpg" className="rounded-lg" alt={''} />
          <img src="https://www.digitaltrends.com/wp-content/uploads/2022/09/iPhone-14-Pro-Back-Purple-Hand.jpg?p=1" className="rounded-lg" alt={''} />
          <img src="https://imageio.forbes.com/specials-images/imageserve/62ec001d64a2e8ce307b70bd/Apple-iphone13-design-09142021/960x0.jpg?height=399&width=711&fit=bounds" className="rounded-lg" alt={''} /> */}
        </div>{/*end grid*/}
      </div>{/*end col*/}
      <div className="lg:col-span-7 md:col-span-6">
        <div className="sticky top-20">
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-[30px]">
            <div className="lg:col-span-12">
              <div className="work-details">
                <h4 className="text-xl font-semibold mb-3 border-b border-gray-100 dark:border-gray-700 text-black dark:text-white pb-3">iPhone 14</h4>
                <div><h5 className='font-semibold text-md text-dark dark:text-white' >Color :</h5>
                <div className='flex '>
                  {productdetail[0]?<>
                  {productdetail[0].colors ?<>
                    {productdetail[0].colors.split(',').map((itm,k)=>
                    <div key={k} className='p-2'>
                      <button className='rounded-full w-7 h-7  border-gray-900 hover:border-2 ' style={{backgroundColor:"itm"}}></button>
                    </div>
                    )} 
                    </> :null}
                  </>:null}
                  {/* <div className='p-2'><button className='rounded-full bg-[#ff0000] w-7 h-7  border-gray-900 hover:border-2 '></button></div>
                  <div className='p-2'><button className='rounded-full bg-[grey] w-7 h-7  border-gray-900 hover:border-2'></button></div>
                  <div className='p-2'><button className='rounded-full bg-[purple] w-7 h-7 border-black hover:border-2'></button></div>
                  <div className='p-2'><button className='rounded-full bg-[pink] w-7 h-7   border-gray-900    hover:border-2'></button></div> */}
                </div></div>
                <div><h5 className='font-semibold text-md text-dark dark:text-white' >Storage :</h5>
                <div className='flex '>
        
                  {storagelist?<>
                    {storagelist.map((itm,k)=>(
                      <>
                      <div key={k} className='p-2'><button onClick={()=>setistorage(itm)} className={istorage === itm ? `bg-gray-700 font-semibold  py-2 px-4 border  text-white border-gray-400  hover:bg-gray-700  rounded`:`bg-gray font-semibold  py-2 px-4 border text-gray-400 hover:text-white border-gray-400  hover:bg-gray-700  rounded`} >{itm} GB</button></div>
                      </>
                    ))}
                  </>:null}
                  {/* <div className='p-2'><button className=" font-semibold  py-2 px-4 border text-gray-400 hover:text-white border-gray-400  bg-gray  hover:bg-gray-700  rounded"> 128 GB</button></div>
                  <div className='p-2'><button className=" font-semibold  py-2 px-4 border text-gray-400 hover:text-white border-gray-400  bg-gray  hover:bg-gray-700  rounded"> 256 GB</button></div>
                  <div className='p-2'><button className=" font-semibold  py-2 px-4 border text-gray-400 hover:text-white border-gray-400  bg-gray  hover:bg-gray-700  rounded"> 512 GB</button></div> */}
                  
                </div></div>
                <div><h5 className='font-semibold text-md text-dark dark:text-white' >Condition :</h5>
                <div className='flex '>
                  {productdetail[0] ?<>
                    {(productdetail[0].sellprice.split(',')).filter(name => name.includes(istorage)).map((itm,k1) =>(
                      <div key={k1} className='p-2'><button className=" font-semibold  px-4 border text-gray-400 hover:text-white border-gray-400  bg-gray  hover:bg-gray-700  rounded"> {itm.split("-")[1]}<br/>AED {itm.split('-')[2]}</button></div>
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
                <div><button className='w-64 p-2 bg-gray-800 rounded-md text-white hover:brightness-[.5]'>Add to Cart</button></div>
                <div className='lg:px-1 md:pt-0 pt-3'><button className='w-64 p-2 bg-green-600 rounded-md text-white hover:brightness-[.7]'>buy now</button></div>
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
    {/* start review */}
    <div className="tiny-slide ">
  <div className="">
    <div className="content  rounded shadow dark:shadow-gray-800 m-2 p-6 bg-white dark:bg-slate-900">
      <i className=" text-indigo-600" />
      <div className=" mt-1">
      
      <h6 className="mt-2 font-semibold">Calvin Carlo</h6>
      <ul className="list-none mb-0 text-amber-400 mt-3">
        <li className="inline"><i className="mdi mdi-star" /></li>
        <li className="inline"><i className="mdi mdi-star" /></li>
        <li className="inline"><i className="mdi mdi-star" /></li>
        <li className="inline"><i className="mdi mdi-star" /></li>
        <li className="inline"><i className="mdi mdi-star" /></li>
      </ul>      
    </div>
    <div className='grid grid-cols-2 gap-4'>
      <div className=''><p className="text-slate-400">" It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. "</p></div>
      <div className='flex justify-end '>
        <img src="https://www.apple.com/v/iphone-14-pro/c/images/overview/hero/hero_iphone_14_pro__e0act2165xqq_large.jpg" className="rounded  w-20 h-24 " alt={''} /><br/>
        </div>
    </div>
    </div>
    
  </div>
  <div className="">
    <div className="content  rounded shadow dark:shadow-gray-800 m-2 p-6 bg-white dark:bg-slate-900">
      <i className=" text-indigo-600" />
      <div className=" mt-1">
      
      <h6 className="mt-2 font-semibold">Calvin Carlo</h6>
      <ul className="list-none mb-0 text-amber-400 mt-3">
        <li className="inline"><i className="mdi mdi-star" /></li>
        <li className="inline"><i className="mdi mdi-star" /></li>
        <li className="inline"><i className="mdi mdi-star" /></li>
        <li className="inline"><i className="mdi mdi-star" /></li>
        <li className="inline"><i className="mdi mdi-star" /></li>
      </ul>      
    </div>
    <div className='grid grid-cols-2 gap-4'>
      <div className=''><p className="text-slate-400">" It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. "</p></div>
      <div className='flex justify-end'><img src="https://www.apple.com/v/iphone-14-pro/c/images/overview/hero/hero_iphone_14_pro__e0act2165xqq_large.jpg" className="rounded-lg w-20 h-24" alt={''} /></div>
    </div>
    </div>
    
  </div>
</div>

<div className="flex justify-center pt-2">
<div>
  {/* <button type="button" className="bg-gray-800 text-white  rounded-l-md border-r hover:brightness-[.3] border-gray-100 py-2 px-3">
    <div className="flex flex-row align-middle">    
      <p className="ml-2">Prev</p>
    </div>
  </button> */}
  <button type="button" className="bg-blue-700 text-white rounded-r-lg border-r hover:brightness-[.5] border-gray-100 py-2  px-3">
    <div className="flex flex-row align-middle">    
      <p className="ml-2 flex">Load More>> </p>
    </div>
  </button>
 


</div>

</div>


    {/* end review */}
    {/*end grid*/}
  </div>
  {/*end container*/}
</section>
{/*end section*/}


       
    <Footer/>
    <Whatsappbutton/>
    </div>
  )
}
