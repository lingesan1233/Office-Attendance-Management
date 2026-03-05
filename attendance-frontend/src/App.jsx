import { BrowserRouter,Routes,Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import OwnerSignup from "./pages/OwnerSignup";
import OwnerDashboard from "./pages/OwnerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<Login/>}/>

<Route path="/signup-owner" element={<OwnerSignup/>}/>

<Route path="/owner-dashboard" element={<OwnerDashboard/>}/>

<Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>

</Routes>

</BrowserRouter>

);

}

export default App;