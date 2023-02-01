// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router,Navigate,Route,Routes} from "react-router-dom";
import Adminhome from "./Components/Adminhome";
import Adminlogin from "./Components/Adminlogin";
import Adminorders from "./Components/Adminorders";
import Adminproducts from "./Components/Adminproducts";
import Adminselledphone from "./Components/Adminselledphone";
import Adminstatus from "./Components/Adminstatus";
import Admincategory from "./Components/Admincategory";
import Home from './Components/Home';
import Phonedetail from "./Components/Phonedetail";
import Selliphone from "./Components/Selliphone";
import Simplecontextprovider from "./Components/Simplecontext";
// import Admincontact from "./Components/Adminsetting";
import Adminprofile from "./Components/Adminprofile";
import Repassword from "./Components/Repassword";
import Passwordchage from "./Components/Passwordchage";
import Adminsetting from "./Components/Adminsetting";
import Testimonial from "./Components/Testimonial";

function App() {
  return (
<div className="justify-center items-center ">
    
     <Router>
     <Simplecontextprovider> 
      <Routes>     
        <Route exact path='/' element={<Adminlogin/>}/>
        <Route exact path='details/:id' element={<Phonedetail/>}/>
        <Route exact path='selliphone' element={<Selliphone/>}/>
        <Route exact path='adminhome' element={<Adminhome/>}/>
        <Route exact path='adminorder' element={<Adminorders/>}/>
        <Route exact path='adminsell' element={<Adminselledphone/>}/>
        <Route exact path='adminlogin' element={<Adminlogin/>}/>
        <Route exact path="adminproducts" element={<Adminproducts/>}/>
        <Route exact path="admincategory" element={<Admincategory/>}/>
        <Route exact path="adminstatus" element={<Adminstatus/>}/>
        <Route exact path="adminsetting" element={<Adminsetting/>}/>
        <Route exact path="adminprofile" element={<Adminprofile/>}/>
        <Route exact path="repassword" element={<Repassword/>}/>
        <Route exact path="testimonials" element={<Testimonial/>}/>
        <Route exact path="passwordchange/:id" element={<Passwordchage/>}/>       
      </Routes>
      </Simplecontextprovider>
     </Router>
     
    </div>
  );
}

export default App;
