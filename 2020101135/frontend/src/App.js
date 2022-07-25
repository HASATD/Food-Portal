import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./components/templates/Navbar";
import Register from "./components/common/Register";
import Login from "./components/common/Login"
import {Link} from "react-router-dom"
import VendorDash from "./components/vendor/dashboard"
import BuyerDash from "./components/buyer/dashboard"
import FoodDash from "./components/vendor/fooddashboard"
import CreateFood from "./components/vendor/createfood"
import EditFood from "./components/vendor/editfood"
import OrderDash from "./components/vendor/orderdashboard";
import EditOrder from "./components/vendor/editorder";
import BOrderDash from "./components/buyer/orderdashboard";
import SingleOrder from "./components/buyer/single_order";
import BuyerFoodDash from "./components/buyer/fooddashboard";
import BuyOrder from "./components/buyer/buyorder";
import StatsDash from "./components/vendor/orderstats";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          
         
          <Route path="register" element={<Register />} />
          <Route path="login" element = {<Login />} />
          <Route path="/buyer/dashboard" element = {<BuyerDash/>} />
          <Route path = "/vendor/dashboard" element = {<VendorDash/>} />
          <Route path = "/vendor/fooddashboard" element = {<FoodDash />} />
          <Route path = "/vendor/createfood" element = {<CreateFood />} />
          <Route path = "/edit/:id" element={<EditFood/>}/>
          <Route path = "/open/:id" element={<EditOrder/>}/>
          <Route path = "/vendor/orderdashboard" element={<OrderDash/>}/>
          <Route path = "/buyer/orderdashboard" element={<BOrderDash/>}/>
          <Route path = "/mekku/:id" element={<SingleOrder/>}/>
          <Route path = "/buyer/fooddashboard" element={<BuyerFoodDash/>}/>
          <Route path = "/view/:id" element={<BuyOrder/>}/>
          <Route path = "/vendor/statistics" element={<StatsDash/>}/>
          


          
          

          
                  
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
