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
      [id]: value,
    });
  };

  const updateStatus = async (id) => {
    try {
      await API.put(`/tasks/${id}`, {
        status: "Completed",
        report: reports[id] || "Work completed",
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
        days,
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

  // Inline CSS styles
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    heading2: {
      color: "#333",
      textAlign: "center",
      marginBottom: "30px",
    },
    heading3: {
      color: "#555",
      borderBottom: "2px solid #ddd",
      paddingBottom: "10px",
      marginTop: "40px",
      marginBottom: "20px",
    },
    card: {
      border: "1px solid #eee",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
    },
    profileDetail: {
      margin: "10px 0",
      color: "#666",
    },
    inputForm: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      maxWidth: "500px",
      marginBottom: "20px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
    },
    textarea: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
      resize: "vertical",
      minHeight: "60px",
      width: "100%",
      boxSizing: "border-box", // Important for full width inside padding
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "background-color 0.3s",
      width: "fit-content",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px",
      backgroundColor: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    th: {
      textAlign: "left",
      padding: "12px",
      backgroundColor: "#f2f2f2",
      color: "#333",
      fontWeight: "600",
      borderBottom: "2px solid #ddd",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #eee",
      verticalAlign: "top", // For textareas in cells
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
    actionCell: {
      whiteSpace: "nowrap", // Keep actions on one line
    },
    completedText: {
      color: "green",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading2}>Employee Dashboard</h2>

      {/* Employee Profile */}
      {profile && (
        <div style={styles.card}>
          <h3 style={{ marginTop: 0, color: "#555" }}>My Details</h3>{" "}
          {/* Overriding top margin from common styles */}
          <p style={styles.profileDetail}>
            <b>Name:</b> {profile.name}
          </p>
          <p style={styles.profileDetail}>
            <b>Email:</b> {profile.email}
          </p>
          <p style={styles.profileDetail}>
            <b>Role:</b> {profile.role}
          </p>
        </div>
      )}

      {/* Leave Request */}
      <h3 style={styles.heading3}>Request Leave</h3>
      <div style={styles.card}>
        <div style={styles.inputForm}>
          <input
            style={styles.input}
            placeholder="Reason for leave"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <input
            style={styles.input}
            type="number"
            placeholder="Number of days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
          <button
            style={styles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#0056b3")
            } /* Basic hover effect */
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#007bff")
            } /* Reset color on mouse out */
            onClick={requestLeave}
          >
            Submit Leave Request
          </button>
        </div>
      </div>

      {/* Leave History */}
      <h3 style={styles.heading3}>My Leave Requests</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Reason</th>
            <th style={styles.th}>Days</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
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
            </tr>
          ))}
        </tbody>
      </table>

      {/* Task Section */}
      <h3 style={styles.heading3}>Your Tasks</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Report</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t._id}>
              <td style={styles.td}>{t.title}</td>
              <td style={styles.td}>{t.description}</td>
              <td style={styles.td}>{t.status}</td>
              <td style={styles.td}>
                <textarea
                  style={styles.textarea}
                  placeholder="Explain how you completed this task"
                  value={reports[t._id] || ""}
                  onChange={(e) => handleReportChange(t._id, e.target.value)}
                />
              </td>
              <td style={{ ...styles.td, ...styles.actionCell }}>
                {t.status !== "Completed" ? (
                  <button
                    style={styles.button}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#0056b3")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#007bff")
                    }
                    onClick={() => updateStatus(t._id)}
                  >
                    Complete Task
                  </button>
                ) : (
                  <span style={styles.completedText}>Completed</span>
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