import React, { useState } from 'react'
import { BiShoppingBag  } from 'react-icons/bi';
import { FiShoppingCart  } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdPersonOutline,MdPhone,MdOutlineEmail,MdLocationCity,MdOutlineHome} from 'react-icons/md';
import { Link } from 'react-router-dom';
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import bg-inner from '../../public/assets/images/'
export default function Header() {
  const [cartmodal,setcartmodal]=useState(false);
  const [mybagmodal,setmybagmodal]=useState(false);
  // const [iquantity,setiquantity]=useState(1);
  const [viewcart,setviewcart]=useState([]);
  const [mybag,setmybag]=useState([]);
  const [customerdetails,setcustomerdetails]=useState();
  // console.log("bag",mybag)
  // console.log("cart",viewcart)
  const successfull = () => toast.success('Successfully Purchased. data will be in your bag!', {
    position: "top-center",
    });
  // const notifyupdated = () => toast.success('Product updated Successfully!', {
  //     position: "top-center",
  //     });
  const notifyerror = () => toast.error(' Something went wrong', {
      position: "top-center",
      });
    const toggleMenu=()=> {
        document.getElementById('isToggle').classList.toggle('open');
        var isOpen = document.getElementById('navigation')
        if (isOpen.style.display === "block") {
            isOpen.style.display = "none";
        } else {
            isOpen.style.display = "block";
        }
    };
    const decrementhandler =(k,itm)=>{
      if (itm.quantity!==1){
        // console.log("kkquantity",itm.quantity)
        // console.log("itmprice",itm.price)
        let value = parseFloat(itm.price)/parseFloat(itm.quantity)
        // console.log("don",value)
        let cart = viewcart
        cart[k].quantity = parseFloat(itm.quantity)-1
        cart[k].price = parseFloat(itm.price) - parseFloat(value)
        setviewcart(()=>[...cart]);
        // console.log("vviewcart",viewcart)
        window.localStorage.setItem('cart',JSON.stringify(viewcart))
        
      }
    }
    const incrementhandler =(k,itm)=>{
      if (itm.quantity!==10){
        let value = parseFloat(itm.price)/parseFloat(itm.quantity)
        let cart = viewcart
        cart[k].quantity = parseFloat(itm.quantity)+1
        cart[k].price = parseFloat(itm.price) + parseFloat(value)
        setviewcart(()=>[...cart]);
        // console.log("vviewcart",viewcart)
        window.localStorage.setItem('cart',JSON.stringify(viewcart))
      }
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
    console.log("bfr",JSON.parse(baglist))
    try {
      if (baglist.length){
        // console.log("listpresent",baglist)
        setmybag(JSON.parse(baglist))  
      }else{}      
    } catch (error) {} 
       
  }
  
  const deletefromcartfunction =(k)=>{
    // console.log("kk",k)
    // console.log("kk",k.k)
    const splc = viewcart
    // console.log("splc",splc) 
    splc.splice(k,1)
    setviewcart(() => [ ...splc]);
    // setviewcart(splc);
    window.localStorage.setItem('cart', viewcart)
    
     
  }
  const checkout=async(e,price)=>{
    e.preventDefault();
    // console.log("product",productdetail)
    let checdata = []
    viewcart.map((itm)=>{
      // let price=viewcart.reduce((n, {price}) => n + parseInt(price), 0)
      console.log("price",price)
      let data = {
        "product":itm.product[0].id,
        "price":itm.price,
        "condition":itm.condition,
        "storage":itm.storage,
        "quantity":itm.quantity,
        "color":itm.color,
        "subtotal_price":price,
        "total_price":parseFloat(price)+(parseFloat(price)/10),
        "status":"new",
        "vat":(parseFloat(price)/10)
      }
      if (customerdetails){
        for (const [key, value] of Object.entries(customerdetails)) {
          // console.log("key",key)
          // console.log("value",value)
          data[key]= value
        }
      }
      checdata.push(data)
      
    })
    // console.log("chkdta",checdata)
    
    // console.log("data",data)
    let postdata = await Callaxios('post',"purchase/order/",checdata)
    // console.log("data",postdata)
    if (postdata.data.Status===200){
      successfull()
      let baglist = [];
      {viewcart.map((itm)=>{
        // let price=viewcart.reduce((n, {price}) => n + parseInt(price), 0)
        let mybagdata = {
          "product":itm.product,
          "price":parseFloat(price)+(parseFloat(price)/10),
          "condition":itm.condition,
          "storage":itm.storage,
          "quantity":itm.quantity,
          "color":itm.color,
          "orderno":(`SN${postdata.data.date.split('T')[1].split('.')[1]}${postdata.data.id}`)
        }
        baglist.push(mybagdata)
      })}
      
      // console.log("bag",baglist)
      let addtobag = mybag.concat(baglist)
      // console.log("baglist",addtobag)
      setmybag(addtobag)
      window.localStorage.setItem('bag',JSON.stringify(addtobag))
      // setmybuymodal(!mybuymodal)
      setallnull()
      
    }else{
      notifyerror()
    }
    
  }
  const setallnull=()=>{
    setviewcart([''])
    window.localStorage.setItem('cart','')
    setcustomerdetails()
  }
  return (
    <div>
     <nav id="topnav" className="defaultscroll is-sticky z-20">
  <div className="container">
    {/* Logo container*/}
    <a className="logo pl-0" href="/">
      <span className="inline-block dark:hidden">
        <img src="assets/images/logo-dark.png" className="l-dark" height={24} alt={''} />
        <img src="assets/images/logo-light.png" className="l-light" height={24} alt ={''}/>
      </span>
      <img src="assets/images/logo-light.png" height={24} className="hidden dark:inline-block" alt={''} />
    </a>
    {/* End Logo container*/}
    <div className="menu-extras">
      <div className="menu-item">
        {/* Mobile menu toggle*/}
        <div className="navbar-toggle"  id="isToggle" onClick={toggleMenu} >
          <div className="lines">
            <span />
            <span />
            <span />
          </div>
        </div>
        {/* End mobile menu toggle*/}
      </div>
    </div>
    {/*Login cart button Start*/}
    <ul className="buy-button  list-none mb-0">
      <li className="inline mb-0">
        
          <span onClick={()=>setmybagmodal(!mybagmodal) & bagproduct()} className="login-btn-primary"><span className="btn btn-icon rounded-full bg-indigo-600/5 hover:bg-indigo-600 border-indigo-600/10 hover:border-indigo-600 text-indigo-600 hover:text-white "><BiShoppingBag className="h-5 w-5 " /></span></span>
          <span onClick={()=>setmybagmodal(!mybagmodal) & bagproduct()} className="login-btn-light"><span className="btn btn-icon rounded-full bg-gray-50 hover:bg-gray-200 dark:bg-slate-900 dark:hover:bg-gray-700 hover:border-gray-100 dark:border-gray-700 dark:hover:border-gray-700 dark:text-white text-black" ><BiShoppingBag className="h-5 w-5 " /></span></span>
        
      </li>
      <li className="inline pl-1 mb-0">
       
          <div onClick={()=>setcartmodal(!cartmodal) &cartproduct()} className="login-btn-primary"><span className="btn btn-icon cursor-pointer rounded-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white"><FiShoppingCart/></span></div>
          <div onClick={()=>setcartmodal(!cartmodal) &cartproduct()} className="login-btn-light"><span className="btn btn-icon rounded-full cursor-pointer bg-gray-50 hover:bg-gray-200 dark:bg-slate-900 dark:hover:bg-gray-700 hover:border-gray-100 dark:border-gray-700 dark:hover:border-gray-700  dark:text-white text-black"><FiShoppingCart/></span></div>
        
      </li>
    </ul>
    {/*Login cart button End*/}
    <div id="navigation">
      {/* Navigation Menu*/}   
      <ul className="navigation-menu nav-light">
        <li><Link to='/' className="sub-menu-item">Home</Link></li>
        <li><Link to='/selliphone' className="sub-menu-item">Sell Your iPhone</Link></li>
        {/* <li className="has-submenu parent-parent-menu-item">
          <a href="/">Landing</a><span className="menu-arrow" />
          <ul className="submenu megamenu">
            <li>
              <ul>
                <li><a href="index-saas.html" className="sub-menu-item">Saas <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">Animation</span></a></li>
                <li><a href="index-classic-saas.html" className="sub-menu-item">Classic Saas </a></li>
                <li><a href="index-modern-saas.html" className="sub-menu-item">Modern Saas </a></li>
                <li><a href="index-apps.html" className="sub-menu-item">Application</a></li>
                <li><a href="index-classic-app.html" className="sub-menu-item">Classic App <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">New</span></a></li>
                <li><a href="index-smartwatch.html" className="sub-menu-item">Smartwatch</a></li>
                <li><a href="index-marketing.html" className="sub-menu-item">Marketing</a></li>
                <li><a href="index-seo.html" className="sub-menu-item">SEO Agency </a></li>
              </ul>
            </li>
            <li>
              <ul>
                <li><a href="index-it-solution.html" className="sub-menu-item">IT Solution</a></li>
                <li><a href="index-it-solution-two.html" className="sub-menu-item">It Solution Two <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">New</span></a></li>
                <li><a href="index-digital-agency.html" className="sub-menu-item">Digital Agency</a></li>
                <li><a href="index-job.html" className="sub-menu-item">Job</a></li>
                <li><a href="index-restaurent.html" className="sub-menu-item">Restaurent</a></li>
                <li><a href="index-hosting.html" className="sub-menu-item">Hosting</a></li>
                <li><a href="index-gym.html" className="sub-menu-item">Gym <span className="bg-black dark:bg-slate-50 text-white dark:text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">Dark</span></a></li>
                <li><a href="index-nft.html" className="sub-menu-item">NFT Marketplace </a></li>
              </ul>
            </li>
            <li>
              <ul>
                <li><a href="index-startup.html" className="sub-menu-item">Startup</a></li>
                <li><a href="index-business.html" className="sub-menu-item">Business</a></li>
                <li><a href="index-corporate.html" className="sub-menu-item">Corporate</a></li>
                <li><a href="index-corporate-two.html" className="sub-menu-item">Corporate Two </a></li>
                <li><a href="index-real-estate.html" className="sub-menu-item">Real Estate</a></li>
                <li><a href="index-consulting.html" className="sub-menu-item">Consulting </a></li>
                <li><a href="index-insurance.html" className="sub-menu-item">Insurance <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">New</span></a></li>
                <li><a href="index-construction.html" className="sub-menu-item">Construction <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">New</span></a></li>
              </ul>
            </li>
            <li>
              <ul>
                <li><a href="index-personal.html" className="sub-menu-item">Personal</a></li>
                <li><a href="index-portfolio.html" className="sub-menu-item">Portfolio</a></li>
                <li><a href="index-photography.html" className="sub-menu-item">Photography <span className="bg-black dark:bg-slate-50 text-white dark:text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">Dark</span></a></li>
                <li><a href="index-studio.html" className="sub-menu-item">Studio</a></li>
                <li><a href="index-coworking.html" className="sub-menu-item">Co-Woriking</a></li>
                <li><a href="index-course.html" className="sub-menu-item">Online Courses </a></li>
                <li><a href="index-hospital.html" className="sub-menu-item">Hospital</a></li>
                <li><a href="index-event.html" className="sub-menu-item">Event/Conference </a></li>
              </ul>
            </li>
            <li>
              <ul>
                <li><a href="index-crypto.html" className="sub-menu-item">Cryptocurrency </a></li>
                <li><a href="index-landing-one.html" className="sub-menu-item">Landing One</a></li>
                <li><a href="index-landing-two.html" className="sub-menu-item">Landing Two</a></li>
                <li><a href="index-landing-three.html" className="sub-menu-item">Landing Three</a></li>
                <li><a href="index-landing-four.html" className="sub-menu-item">Landing Four</a></li>
                <li><a href="index-service.html" className="sub-menu-item">Service Provider</a></li>
                <li><a href="index-food-blog.html" className="sub-menu-item">Food Blog </a></li>
                <li><a href="index-blog.html" className="sub-menu-item">Blog </a></li>
              </ul>
            </li>
          </ul>
        </li> */}
        {/* <li className="has-submenu parent-parent-menu-item">
          <a href="/">Pages</a><span className="menu-arrow" />
          <ul className="submenu">
            <li className="has-submenu parent-menu-item"><a href="/"> Company </a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="page-aboutus.html" className="sub-menu-item"> About Us</a></li>
                <li><a href="page-services.html" className="sub-menu-item">Services</a></li>
                <li><a href="page-team.html" className="sub-menu-item"> Team</a></li>
                <li><a href="page-pricing.html" className="sub-menu-item">Pricing</a></li>
                <li><a href="page-testimonial.html" className="sub-menu-item">Testimonial <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">New</span></a></li>
              </ul> 
            </li>
            <li className="has-submenu parent-menu-item"><a href="/"> Accounts</a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="user-profile.html" className="sub-menu-item">User Profile</a></li>
                <li><a href="user-billing.html" className="sub-menu-item">Billing</a></li>
                <li><a href="user-payment.html" className="sub-menu-item">Payment</a></li>
                <li><a href="user-invoice.html" className="sub-menu-item">Invoice</a></li>
                <li><a href="user-social.html" className="sub-menu-item">Social</a></li>
                <li><a href="user-notification.html" className="sub-menu-item">Notification</a></li>
                <li><a href="user-setting.html" className="sub-menu-item">Setting</a></li>
              </ul> 
            </li>
            <li className="has-submenu parent-menu-item"><a href="/"> Real Estate</a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="property-listing.html" className="sub-menu-item">Listing</a></li>
                <li><a href="property-detail.html" className="sub-menu-item">Property Detail</a></li>
              </ul> 
            </li>
            <li className="has-submenu parent-menu-item"><a href="/"> Courses </a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="course-listing.html" className="sub-menu-item">Course Listing</a></li>
                <li><a href="course-detail.html" className="sub-menu-item">Course Detail</a></li>
              </ul> 
            </li>
            <li className="has-submenu parent-menu-item"><a href="/"> NFT Market </a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="nft-explore.html" className="sub-menu-item">Explore</a></li>
                <li><a href="nft-auction.html" className="sub-menu-item">Auction</a></li>
                <li><a href="nft-collection.html" className="sub-menu-item">Collections</a></li>
                <li><a href="nft-creators.html" className="sub-menu-item">Creators</a></li>
                <li><a href="nft-wallet.html" className="sub-menu-item">Wallet</a></li>
                <li><a href="nft-create-item.html" className="sub-menu-item">Create NFT</a></li>
                <li><a href="nft-detail.html" className="sub-menu-item">Single NFT</a></li>
              </ul> 
            </li>
            <li><a href="food-recipe.html" className="sub-menu-item">Food Recipe </a></li>
            <li className="has-submenu parent-menu-item"><a href="/"> Photography </a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="photography-about.html" className="sub-menu-item">About Us</a></li>
                <li><a href="photography-portfolio.html" className="sub-menu-item">Portfolio</a></li>
              </ul> 
            </li>
            <li className="has-submenu parent-menu-item"><a href="/"> Job / Careers </a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="page-job-grid.html" className="sub-menu-item">All Jobs</a></li>
                <li><a href="page-job-detail.html" className="sub-menu-item">Job Detail</a></li>
                <li><a href="page-job-apply.html" className="sub-menu-item">Job Apply</a></li>
                <li><a href="page-job-candidates.html" className="sub-menu-item">Job Candidates</a></li>
                <li><a href="page-job-candidate-detail.html" className="sub-menu-item">Candidate Detail</a></li>
                <li><a href="page-job-companies.html" className="sub-menu-item">All Companies</a></li>
                <li><a href="page-job-company-detail.html" className="sub-menu-item">Company Detail</a></li>
              </ul>  
            </li>
            <li className="has-submenu parent-menu-item"><a href="/"> Helpcenter </a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="helpcenter.html" className="sub-menu-item">Overview</a></li>
                <li><a href="helpcenter-faqs.html" className="sub-menu-item">FAQs</a></li>
                <li><a href="helpcenter-guides.html" className="sub-menu-item">Guides</a></li>
                <li><a href="helpcenter-support.html" className="sub-menu-item">Support</a></li>
              </ul>  
            </li>
            <li className="has-submenu parent-menu-item"><a href="/"> Blog <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">New</span></a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="blog.html" className="sub-menu-item">Blogs</a></li>
                <li><a href="blog-sidebar.html" className="sub-menu-item">Blogs &amp; Sidebar</a></li>
                <li><a href="blog-detail.html" className="sub-menu-item">Blog Detail</a></li>
                <li className="has-submenu child-menu-item"><a href="/"> Blog Posts <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">New</span></a><span className="submenu-arrow" />
                  <ul className="submenu">
                    <li><a href="blog-standard-post.html" className="sub-menu-item">Standard Post</a></li>
                    <li><a href="blog-slider-post.html" className="sub-menu-item">Slider Post</a></li>
                    <li><a href="blog-gallery-post.html" className="sub-menu-item">Gallery Post</a></li>
                    <li><a href="blog-youtube-post.html" className="sub-menu-item">Youtube Post</a></li>
                    <li><a href="blog-vimeo-post.html" className="sub-menu-item">Vimeo Post</a></li>
                    <li><a href="blog-audio-post.html" className="sub-menu-item">Audio Post</a></li>
                    <li><a href="blog-blockquote-post.html" className="sub-menu-item">Blockquote</a></li>
                    <li><a href="blog-left-sidebar-post.html" className="sub-menu-item">Left Sidebar</a></li>
                  </ul>  
                </li>
              </ul>  
            </li>
            <li className="has-submenu parent-menu-item"><a href="/"> Email Template</a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="email-confirmation.html" className="sub-menu-item">Confirmation</a></li>
                <li><a href="email-password-reset.html" className="sub-menu-item">Reset Password</a></li>
                <li><a href="email-alert.html" className="sub-menu-item">Alert</a></li>
                <li><a href="email-invoice.html" className="sub-menu-item">Invoice</a></li>
              </ul>  
            </li>
            <li className="has-submenu parent-menu-item"><a href="/"> Auth Pages </a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="auth-login.html" className="sub-menu-item">Login</a></li>
                <li><a href="auth-signup.html" className="sub-menu-item">Signup</a></li>
                <li><a href="auth-re-password.html" className="sub-menu-item">Reset Password</a></li>
                <li><a href="auth-lock-screen.html" className="sub-menu-item">Lock Screen</a></li>
              </ul>  
            </li>
            <li className="has-submenu parent-menu-item"><a href="/"> Utility </a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="page-terms.html" className="sub-menu-item">Terms of Services</a></li>
                <li><a href="page-privacy.html" className="sub-menu-item">Privacy Policy</a></li>
              </ul>  
            </li>
            <li className="has-submenu parent-menu-item"><a href="/"> Special</a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="page-comingsoon.html" className="sub-menu-item">Coming Soon</a></li>
                <li><a href="page-maintenance.html" className="sub-menu-item">Maintenance</a></li>
                <li><a href="page-error.html" className="sub-menu-item">Error</a></li>
                <li><a href="page-thankyou.html" className="sub-menu-item">Thank you</a></li>
              </ul>
            </li>
            <li className="has-submenu parent-menu-item"><a href="/"> Contact </a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="contact-detail.html" className="sub-menu-item">Contact Detail</a></li>
                <li><a href="contact-one.html" className="sub-menu-item">Contact One</a></li>
                <li><a href="contact-two.html" className="sub-menu-item">Contact Two</a></li>
              </ul>  
            </li>
            <li className="has-submenu parent-menu-item"><a href="/"> Multi Level Menu</a><span className="submenu-arrow" />
              <ul className="submenu">
                <li><a href="/" className="sub-menu-item">Level 1.0</a></li>
                <li className="has-submenu child-menu-item"><a href="/"> Level 2.0 </a><span className="submenu-arrow" />
                  <ul className="submenu">
                    <li><a href="/" className="sub-menu-item">Level 2.1</a></li>
                    <li><a href="/" className="sub-menu-item">Level 2.2</a></li>
                  </ul>  
                </li>
              </ul>  
            </li>
          </ul>
        </li> */}
        
        
        
      </ul>
      {/*end navigation menu*/}
    </div>
    {/*end navigation*/}
  </div>
  {/*end container*/}
</nav>
<div>
  
 
  {/* Modal */}
  {/* {cartmodal?  */}
  <div className={`modal eas duration-300 fixed z-40 top-0  ${cartmodal ? "-translate-x-0" : "-translate-x-full"} left-0  transition-all w-full  h-screen outline-none overflow-x-hidden overflow-y-auto`} id="exampleModalScrollable" tabIndex={-1} aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-scrollable h-full relative w-auto pointer-events-none">
      <div className="modal-content border-none h-full shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
          <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
            My Cart
          </h5>
          <button type="button" onClick={()=>setcartmodal(!cartmodal)} className="btn-close box-content w-4 h-4 p-1 text-gray-500    hover:text-red-600 "><b>X</b></button>
        </div>
        {/* cart data start */}
        <section className="relative md:py-10 py-16  bg-white dark:bg-slate-900">
          {viewcart === typeof undefined ?null:<>
        {viewcart[0] ? <>
        <div className="container">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
            <div className="lg:col-span-6 md:col-span-6">
              <div className="grid grid-cols-1 gap-[10px]">

              {viewcart.map((itm,k)=>(
                 <div key={k} className='grid grid-cols-3 bg-[#f2f2f2] p-5' >
                 <div className='col-span-2 flex '>
                   <div className='flex col-span-1'>
                 <img src={itm.product[0].images[0].image} className="rounded-lg w-28" alt={''} />&nbsp;&nbsp;
                   </div>
                   <div className='col-span-1 '>
                 <div>
                   <span ><b>{itm.product[0].model_name}</b></span><br/>
                   <span className='capitalize' >{itm.storage} GB-{itm.condition}</span><br/>
                 </div>
                 <div className='pt-2'>
                   <span ><b>Quantity :</b></span>
                   <div className=' pt-2 flex'>
                     <button className='border w-5 flex justify-center border-gray-500 cursor-pointer hover:text-white hover:bg-gray-700 ' onClick={()=>decrementhandler(k,itm)}>-</button>
                     <span className='border w-10 flex justify-center border-gray-600 '>{itm.quantity}</span>
                     <button className='border w-5 flex justify-center border-gray-500 cursor-pointer hover:text-white hover:bg-gray-700 ' onClick={()=>incrementhandler(k,itm)} >+</button>
                   </div>
                 </div> 
                 </div>
                 </div>            
                 <div className='col-span-1 '>
                   <div className='flex justify-end'>
                   <span ><b>Price :</b> {itm.price}</span>
                   </div>
                   <div className='flex justify-end'>
                   <p className=' h-5 pt-5 hover:text-red-400  text-sm cursor-pointer ' onClick={()=>deletefromcartfunction(k)}><RiDeleteBin6Line size={20}/></p>
                   </div>
                 </div>
               </div>
              ))} 
              
               
               

                
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
                        <dd className="md:col-span-7 col-span-7 mt-2 text-slate-400">AED {viewcart.reduce((n, {price}) => n + parseInt(price), 0)}</dd>
                        <dt className="md:col-span-5 col-span-5 mt-2">VAT :</dt>
                        <dd className="md:col-span-7 col-span-7 mt-2 text-slate-400">AED {parseFloat(viewcart.reduce((n, {price}) => n + parseInt(price), 0)/10)}</dd>
                        <dt className="md:col-span-5 col-span-5 mt-2">Delivery Charge :</dt>
                        <dd className="md:col-span-7 col-span-7 mt-2 text-slate-400">0 AED</dd>
                      </dl>
                      <hr className=''/>
                      <dl className="grid grid-cols-12 mb-0"> 
                        <dt className="md:col-span-5 col-span-5 mt-2">Total :</dt>
                        <dd className="md:col-span-7 col-span-7 mt-2 text-slate-400">AED {(viewcart.reduce((n, {price}) => n + parseInt(price), 0))+(parseFloat(viewcart.reduce((n, {price}) => n + parseInt(price), 0)/10))}</dd>
                      </dl>  
                    </div>
                  </div>
                  {/* form start */}
                  <form  onSubmit={(e)=>checkout(e,(viewcart.reduce((n, {price}) => n + parseInt(price), 0)))} className='pt-5' >
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
                            <input onChange={(e)=> setcustomerdetails({...customerdetails,email:e.target.value})} name="email" id="email" type="email" className="form-input pl-11" placeholder="Email :" />
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
                  {/* form end */}

                    {/* <div className='md:flex pt-5'>
                      <div><button className='w-64 p-2 bg-gray-800 rounded-md text-white hover:brightness-[.5]'>Buy now</button></div>
                      <div className='lg:px-1 md:pt-0 pt-3'><button className='w-64 p-2 bg-green-600 rounded-md text-white hover:brightness-[.7]'>Buy now</button></div>
                    </div> */}
                  </div>{/*end col*/}     
                
                  {/*end col*/}
                </div>{/*end grid*/}
              </div>
            </div>{/*end col*/}
          </div>{/*end grid*/}
        </div>{/*end container*/}
        </>:<div className='flex justify-center'><span className='font-bold'> Your Cart is empty</span></div>}
        </> }
  {/*end container*/}
  <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
          <button type="button" onClick={()=>setcartmodal(!cartmodal)} className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
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
  {/* :null} */}
</div>
<div>
  {/* my ordr bag start */}
  <div className={`modal eas duration-300 fixed z-40 top-0  ${mybagmodal ? "-translate-x-0" : "translate-x-full"} left-0  transition-all w-full  h-screen outline-none overflow-x-hidden overflow-y-auto`} id="exampleModalScrollable" tabIndex={-1} aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-scrollable h-full relative w-auto pointer-events-none">
      <div className="modal-content border-none h-full shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
          <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
            My Orders
          </h5>
          <button type="button" onClick={()=>setmybagmodal(!mybagmodal)} className="btn-close box-content w-4 h-4 p-1 text-gray-500    hover:text-red-600 "><b>X</b></button>
        </div>
        {/* cart data start */}
        <section className="relative md:py-10 py-16  bg-white dark:bg-slate-900">
  <div className="container">
    <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
      <div className="lg:col-span-6 md:col-span-6">
        <div className="grid grid-cols-1 gap-[10px]">
        {mybag[0] ? 
        <>
        {mybag.map((itm,k)=>(
          <div key={k} className='grid grid-cols-3 bg-[#f2f2f2] p-5' >
          <div className='col-span-2 flex '>
            <div className='flex col-span-1'>
          <img src={itm.product[0] ? itm.product[0].images[0].image :null} className="rounded-lg w-28" alt={''} />&nbsp;&nbsp;
            </div>
            <div className='col-span-1 '>
          <div>
            <span ><b>{itm.product[0] ?itm.product[0].model_name:null}</b></span><br/>
            <span className='capitalize' >{itm.storage} GB-{itm.condition}</span><br/>
          </div>
          <div className='pt-2'>
                   {/* <span ><b>Quantity : {itm.quantity}</b></span> */}
                   {/* <div className=' pt-2 flex'>
                     <span className='border w-10 flex justify-center border-gray-600 '>{itm.quantity}</span>
                   </div> */}
                 </div> 
         
          </div>
          </div>            
          {/* <div className='col-span-1 pt-14 '>
            <div className='flex justify-end'>
            <span ><b>Price :</b> {itm.price}</span>
            </div>
            
          </div> */}
           <div className='col-span-1 '>
           <div className='flex justify-end'>
            <span ><b>OrderNo :</b> {itm.orderno}</span>                   
            </div>
            <div className='flex justify-end pt-4'>
            <span ><b>Price :</b> {itm.price}</span>
            </div>
            
          </div>
        </div>
        ))}
        </>:null}
        

        </div>{/*end grid*/}
      </div>{/*end col*/}
      <div className="lg:col-span-6 md:col-span-6 ">
        <div className="sticky top-20 w-50">
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-[30px]">
            <div className="lg:col-span-12">
              
              <div className="">
              <div className="bg-gray-50 dark:bg-slate-800 shadow border border-black md:w-[80%] dark:shadow-gray-800 p-2 rounded-md">
                {/* <h5 className="text-lg font-semibold border-b border-gray-100 dark:border-gray-700 pb-3 mb-3">Project Info :</h5> */}
                
                {/* <hr className=''/> */}
                <dl className="grid grid-cols-12 mb-0 pb-2">
                        <dt className="md:col-span-5 col-span-5 mt-2">Price :</dt>
                        <dd className="md:col-span-7 col-span-7 mt-2 text-slate-400">AED {mybag ? mybag.reduce((n, {price}) => n + parseInt(price), 0):null}</dd> 
                  {/* <dt className="md:col-span-5 col-span-5 mt-2">Total :</dt>
                  <dd className="md:col-span-7 col-span-7 mt-2 text-slate-400">AED {mybag.reduce((n, {price}) => n + parseInt(price), 0)}</dd> */}
                </dl>  
              </div>
            </div>   
            </div>{/*end col*/}     
           
            {/*end col*/}
          </div>{/*end grid*/}
        </div>
      </div>{/*end col*/}
    </div>{/*end grid*/}
  </div>{/*end container*/} 
  
  {/*end container*/}
  <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
          <button type="button" onClick={()=>setmybagmodal(!mybagmodal)} className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
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
  {/* my ordr bag end */}
</div>


    </div>
  )
}
