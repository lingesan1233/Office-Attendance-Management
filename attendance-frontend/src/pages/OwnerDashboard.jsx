import { useEffect, useState } from "react";
import API from "../services/api";

function OwnerDashboard() {

  const [attendance, setAttendance] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [empName, setEmpName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empPassword, setEmpPassword] = useState("");

  const [employeeId, setEmployeeId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const getAttendance = async () => {

    const res = await API.get("/attendance");
    setAttendance(res.data);

  };


  const getTasks = async () => {

    const res = await API.get("/tasks/all");
    setTasks(res.data);

  };


  const getEmployees = async () => {

    const res = await API.get("/auth/employees");
    setEmployees(res.data);

  };


  const createEmployee = async () => {

    try {

      await API.post("/auth/create-employee", {
        name: empName,
        email: empEmail,
        password: empPassword
      });

      alert("Employee Created");

      setEmpName("");
      setEmpEmail("");
      setEmpPassword("");

      getEmployees();

    } catch {

      alert("Failed to create employee");

    }

  };


  const assignTask = async () => {

    try {

      await API.post("/tasks/assign", {
        employeeId,
        title,
        description
      });

      alert("Task Assigned");

      setEmployeeId("");
      setTitle("");
      setDescription("");

      getTasks();

    } catch {

      alert("Task assign failed");

    }

  };


  useEffect(() => {

    getAttendance();
    getTasks();
    getEmployees();

  }, []);



  return (

    <div className="container">

      <h2>Owner Dashboard</h2>



      <h3>Create Employee</h3>

      <input
        placeholder="Employee Name"
        value={empName}
        onChange={(e) => setEmpName(e.target.value)}
      />

      <input
        placeholder="Employee Email"
        value={empEmail}
        onChange={(e) => setEmpEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={empPassword}
        onChange={(e) => setEmpPassword(e.target.value)}
      />

      <button onClick={createEmployee}>Create Employee</button>



      <h3>Employee List</h3>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Employee ID</th>
          </tr>
        </thead>

        <tbody>

          {employees.map((emp) => (

            <tr key={emp._id}>

              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp._id}</td>

            </tr>

          ))}

        </tbody>

      </table>



      <h3>Assign Task</h3>

      <input
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />

      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={assignTask}>Assign Task</button>



      <h3>Attendance Records</h3>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Login Time</th>
          </tr>
        </thead>

        <tbody>

          {attendance.map((a) => (

            <tr key={a._id}>

              <td>{a.employeeId?.name}</td>
              <td>{a.employeeId?.email}</td>
              <td>{a.date}</td>
              <td>{a.loginTime}</td>

            </tr>

          ))}

        </tbody>

      </table>



      <h3>Task Status</h3>

      <table>

        <thead>
          <tr>
            <th>Employee</th>
            <th>Task</th>
            <th>Description</th>
            <th>Status</th>
            <th>Report</th>
          </tr>
        </thead>

        <tbody>

          {tasks.map((task) => (

            <tr key={task._id}>

              <td>{task.employeeId?.name}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.report}</td>

            </tr>

          ))}

        </tbody>


      </table>

    </div>

  );

}

export default OwnerDashboard;