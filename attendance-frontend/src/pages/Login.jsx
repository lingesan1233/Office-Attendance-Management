import { useState } from "react";
import API from "../services/api";

function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const login=async()=>{

try{

const res=await API.post("/auth/login",{email,password});

localStorage.setItem("token",res.data.token);

localStorage.setItem("role",res.data.user.role);

if(res.data.user.role==="owner")
window.location="/owner-dashboard";
else
window.location="/employee-dashboard";

}catch(err){
alert("Login failed");
}

};

return(

<div className="container">

<h2>Login</h2>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={login}>Login</button>

</div>

);

}

export default Login;