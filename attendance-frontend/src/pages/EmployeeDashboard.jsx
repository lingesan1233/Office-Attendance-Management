import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeDashboard() {

const [tasks, setTasks] = useState([]);
const [reports, setReports] = useState({});
const [profile, setProfile] = useState(null);

const [reason, setReason] = useState("");
const [days, setDays] = useState("");

const [leaves, setLeaves] = useState([]);


const getTasks = async () => {

const res = await API.get("/tasks/employee");
setTasks(res.data);

};

const getProfile = async () => {

const res = await API.get("/auth/profile");
setProfile(res.data);

};

const getLeaves = async () => {

const res = await API.get("/leave/my-leaves");
setLeaves(res.data);

};


const handleReportChange = (id, value) => {

setReports({
...reports,
[id]: value
});

};

const updateStatus = async (id) => {

try {

await API.put(`/tasks/${id}`, {
status: "Completed",
report: reports[id] || "Work completed"
});

alert("Task marked as completed");

getTasks();

} catch {

alert("Failed to update task");

}

};


const requestLeave = async () => {

try {

await API.post("/leave/request", {
reason,
days
});

alert("Leave request submitted");

setReason("");
setDays("");

getLeaves();

} catch {

alert("Failed to request leave");

}

};


useEffect(() => {

getTasks();
getProfile();
getLeaves();

}, []);


return (

<div className="container">

<h2>Employee Dashboard</h2>

{/* Employee Profile */}

{profile && (

<div style={{marginBottom:"20px"}}>

<h3>My Details</h3>

<p><b>Name:</b> {profile.name}</p>
<p><b>Email:</b> {profile.email}</p>
<p><b>Role:</b> {profile.role}</p>

</div>

)}

{/* Leave Request */}

<h3>Request Leave</h3>

<input
placeholder="Reason for leave"
value={reason}
onChange={(e) => setReason(e.target.value)}
/>

<input
type="number"
placeholder="Number of days"
value={days}
onChange={(e) => setDays(e.target.value)}
/>

<button onClick={requestLeave}>
Submit Leave Request
</button>


{/* Leave History */}

<h3>My Leave Requests</h3>

<table>

<thead>
<tr>
<th>Reason</th>
<th>Days</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{leaves.map((leave) => (

<tr key={leave._id}>

<td>{leave.reason}</td>
<td>{leave.days}</td>

<td>

{leave.status === "Approved" && (
<span style={{color:"green"}}>Approved</span>
)}

{leave.status === "Rejected" && (
<span style={{color:"red"}}>Rejected</span>
)}

{leave.status === "Pending" && (
<span style={{color:"orange"}}>Pending</span>
)}

</td>

</tr>

))}

</tbody>

</table>


{/* Task Section */}

<h3>Your Tasks</h3>

<table>

<thead>
<tr>
<th>Title</th>
<th>Description</th>
<th>Status</th>
<th>Report</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{tasks.map((t) => (

<tr key={t._id}>

<td>{t.title}</td>
<td>{t.description}</td>
<td>{t.status}</td>

<td>

<textarea
placeholder="Explain how you completed this task"
value={reports[t._id] || ""}
onChange={(e) => handleReportChange(t._id, e.target.value)}
/>

</td>

<td>

{t.status !== "Completed" ? (

<button onClick={() => updateStatus(t._id)}>
Complete Task
</button>

) : (

<span style={{ color: "green" }}>Completed</span>

)}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default EmployeeDashboard;