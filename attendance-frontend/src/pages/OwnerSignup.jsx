import { useState } from "react";
import API from "../services/api";

function OwnerSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await API.post("/auth/signup-owner", { name, email, password });

      alert("Owner created");

      window.location = "/";
    } catch (err) {
      alert("Signup failed");
    }
  };

  // --- Inline CSS Styles ---
  const styles = {
    // Styles for the main outer container (centers the card)
    pageContainer: {
      display: "flex",
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically
      minHeight: "100vh", // Full viewport height
      backgroundColor: "#f4f7f6", // Light grey background
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    // Styles for the signup form card
    signupCard: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "450px", // Limits the form width
      display: "flex",
      flexDirection: "column",
      gap: "20px", // Space between elements
    },
    // Styles for the 'Owner Signup' heading
    heading2: {
      color: "#333",
      textAlign: "center",
      marginBottom: "10px",
      fontSize: "28px",
      fontWeight: "600",
    },
    // Common styles for input fields
    input: {
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "16px",
      color: "#333",
      width: "100%",
      boxSizing: "border-box", // Important for padding and full width
      transition: "border-color 0.3s ease",
    },
    // Styles for the Signup button
    button: {
      backgroundColor: "#28a745", // Green background for signup
      color: "white",
      padding: "15px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      letterSpacing: "0.5px",
      textTransform: "uppercase", // Uppercase button text
      transition: "background-color 0.3s ease",
      marginTop: "10px",
    },
  };

  return (
    // Step 1: Wrap in a full-page flex container for centering
    <div style={styles.pageContainer}>
      {/* Step 2: Form element now uses style */}
      <div style={styles.signupCard}>
        <h2 style={styles.heading2}>Owner Signup</h2>

        <input
          style={styles.input}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Step 3: Button uses style and simulated hover */}
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")} // Basic hover effect (darker green)
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")} // Reset color on mouse out
          onClick={signup}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default OwnerSignup;