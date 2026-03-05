import { useState } from "react";
import API from "../services/api";

function OwnerSignup(){

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const signup=async()=>{

try{

await API.post("/auth/signup-owner",{name,email,password});

alert("Owner created");

window.location="/";

}catch(err){

alert("Signup failed");

}

};

return(

<div className="container">

<h2>Owner Signup</h2>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={signup}>Signup</button>

</div>

);

}

export default OwnerSignup;