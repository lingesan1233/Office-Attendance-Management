import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeDashboard() {

const [tasks, setTasks] = useState([]);
const [reports, setReports] = useState({});
const [profile, setProfile] = useState(null);

const getTasks = async () => {

const res = await API.get("/tasks/employee");

setTasks(res.data);

};

const getProfile = async () => {

const res = await API.get("/auth/profile");

setProfile(res.data);

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

} catch (error) {

alert("Failed to update task");

}

};

useEffect(() => {

getTasks();
getProfile();

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