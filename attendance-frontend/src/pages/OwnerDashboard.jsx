import { useEffect, useState } from "react";
import API from "../services/api";

function OwnerDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);

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

  const getLeaves = async () => {
    const res = await API.get("/leave/all");
    setLeaves(res.data);
  };

  const createEmployee = async () => {
    try {
      await API.post("/auth/create-employee", {
        name: empName,
        email: empEmail,
        password: empPassword,
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
        description,
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

  const updateLeaveStatus = async (id, status) => {
    try {
      await API.put(`/leave/${id}`, { status });

      alert("Leave status updated");

      getLeaves();
    } catch {
      alert("Failed to update leave");
    }
  };

  useEffect(() => {
    getAttendance();
    getTasks();
    getEmployees();
    getLeaves();
  }, []);

  // --- Inline CSS Styles ---
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "20px auto",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f4f7f6",
      borderRadius: "8px",
    },
    heading2: {
      color: "#333",
      textAlign: "center",
      marginBottom: "30px",
      borderBottom: "2px solid #007bff",
      paddingBottom: "10px",
    },
    heading3: {
      color: "#555",
      marginTop: "30px",
      marginBottom: "15px",
    },
    formContainer: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
      width: "100%",
      boxSizing: "border-box", // Important for full width inside padding
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "12px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
      width: "fit-content",
      alignSelf: "flex-start",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      borderRadius: "8px",
      overflow: "hidden", // Ensures border-radius works on table
    },
    th: {
      textAlign: "left",
      padding: "15px",
      backgroundColor: "#f8f9fa",
      color: "#333",
      fontWeight: "600",
      borderBottom: "2px solid #eee",
    },
    td: {
      padding: "15px",
      borderBottom: "1px solid #eee",
      color: "#666",
    },
    statusApproved: {
      color: "green",
      fontWeight: "bold",
    },
    statusRejected: {
      color: "red",
      fontWeight: "bold",
    },
    statusPending: {
      color: "orange",
      fontWeight: "bold",
    },
    actionButtons: {
      display: "flex",
      gap: "10px",
    },
    approveBtn: {
      backgroundColor: "#28a745", // Green for approve
      color: "white",
      padding: "8px 15px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    },
    rejectBtn: {
      backgroundColor: "#dc3545", // Red for reject
      color: "white",
      padding: "8px 15px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading2}>Owner Dashboard</h2>

      {/* Create Employee */}
      <h3 style={styles.heading3}>Create Employee</h3>
      <div style={styles.formContainer}>
        <input
          style={styles.input}
          placeholder="Employee Name"
          value={empName}
          onChange={(e) => setEmpName(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Employee Email"
          value={empEmail}
          onChange={(e) => setEmpEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={empPassword}
          onChange={(e) => setEmpPassword(e.target.value)}
        />
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          onClick={createEmployee}
        >
          Create Employee
        </button>
      </div>

      {/* Employee List */}
      <h3 style={styles.heading3}>Employee List</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td style={styles.td}>{emp.name}</td>
              <td style={styles.td}>{emp.email}</td>
              <td style={styles.td}>{emp._id}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assign Task */}
      <h3 style={styles.heading3}>Assign Task</h3>
      <div style={styles.formContainer}>
        <input
          style={styles.input}
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          onClick={assignTask}
        >
          Assign Task
        </button>
      </div>

      {/* Attendance Records */}
      <h3 style={styles.heading3}>Attendance Records</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Login Time</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a) => (
            <tr key={a._id}>
              <td style={styles.td}>{a.employeeId?.name}</td>
              <td style={styles.td}>{a.employeeId?.email}</td>
              <td style={styles.td}>{a.date}</td>
              <td style={styles.td}>{a.loginTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Task Status */}
      <h3 style={styles.heading3}>Task Status</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Employee</th>
            <th style={styles.th}>Task</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Report</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td style={styles.td}>{task.employeeId?.name}</td>
              <td style={styles.td}>{task.title}</td>
              <td style={styles.td}>{task.description}</td>
              <td style={styles.td}>{task.status}</td>
              <td style={styles.td}>{task.report}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Leave Requests */}
      <h3 style={styles.heading3}>Leave Requests</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Employee</th>
            <th style={styles.th}>Reason</th>
            <th style={styles.th}>Days</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td style={styles.td}>{leave.employeeId?.name}</td>
              <td style={styles.td}>{leave.reason}</td>
              <td style={styles.td}>{leave.days}</td>
              <td style={styles.td}>
                {leave.status === "Approved" && (
                  <span style={styles.statusApproved}>Approved</span>
                )}
                {leave.status === "Rejected" && (
                  <span style={styles.statusRejected}>Rejected</span>
                )}
                {leave.status === "Pending" && (
                  <span style={styles.statusPending}>Pending</span>
                )}
              </td>
              <td style={styles.td}>
                {leave.status === "Pending" && (
                  <div style={styles.actionButtons}>
                    <button
                      style={styles.approveBtn}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#218838")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#28a745")
                      }
                      onClick={() => updateLeaveStatus(leave._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      style={styles.rejectBtn}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#c82333")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#dc3545")
                      }
                      onClick={() => updateLeaveStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OwnerDashboard;