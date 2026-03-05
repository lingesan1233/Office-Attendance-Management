import { Link } from "react-router-dom";

function Navbar() {

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const logout = () => {
localStorage.clear();
window.location.href = "/";
};

return (

<nav className="navbar">

<h2>Attendance System</h2>

<div>

{!token && (
<>
<Link to="/">Login</Link>
<Link to="/signup-owner">Owner Signup</Link>
</>
)}

{token && role === "owner" && (
<Link to="/owner-dashboard">Owner Dashboard</Link>
)}

{token && role === "employee" && (
<Link to="/employee-dashboard">Employee Dashboard</Link>
)}

{token && (
<button onClick={logout}>Logout</button>
)}

</div>

</nav>

);

}

export default Navbar;