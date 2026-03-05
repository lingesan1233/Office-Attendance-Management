import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    // It's better to use useNavigate() hook within a Router component for redirection.
    // Assuming your overall app setup is correct, window.location.href works but causes a full reload.
    window.location.href = "/";
  };

  // --- Inline CSS Styles ---
  const styles = {
    // Styles for the main <nav> container
    navbar: {
      display: "flex",
      justifyContent: "space-between", // Pushes title to left, links to right
      alignItems: "center", // Vertically centers items
      padding: "15px 30px", // Adds padding around the content
      backgroundColor: "#2c3e50", // Dark blue-grey background
      color: "white", // Default text color is white
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)", // Adds a subtle bottom shadow
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Set a modern font
    },
    // Styles for the main heading text
    heading: {
      margin: 0, // Remove default margins
      fontSize: "22px",
      fontWeight: "bold",
      color: "white",
    },
    // Styles for the container holding the navigation links/buttons
    linksContainer: {
      display: "flex",
      alignItems: "center", // Vertically centers items within the container
      gap: "20px", // Adds space between each link/button
    },
    // Common styles for the navigation links
    link: {
      textDecoration: "none", // Removes the default underline
      color: "white", // Link text color is white
      fontWeight: "500",
      fontSize: "16px",
      transition: "opacity 0.3s ease", // Smooth transition for hover effect
    },
    // Simulate hover effect for links (opacity change)
    linkHover: {
      opacity: 0.8,
    },
    // Styles for the Logout button
    logoutButton: {
      backgroundColor: "#e74c3c", // Red background for logout
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px", // Rounded corners
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    // Apply styles to the main <nav> tag
    <nav style={styles.navbar}>
      <h2 style={styles.heading}>webspirelabs</h2>

      {/* Apply styles to the links container */}
      <div style={styles.linksContainer}>
        {!token && (
          <>
            <Link
              to="/"
              style={styles.link}
              // Simulating hover using state or mouse events isn't easily done purely with inline styles defined in a variable like this.
              // For a simple effect, we change the opacity on mouseover/mouseout directly.
              onMouseOver={(e) => (e.target.style.opacity = 0.8)}
              onMouseOut={(e) => (e.target.style.opacity = 1)}
            >
              Login
            </Link>
            <Link
              to="/signup-owner"
              style={styles.link}
              onMouseOver={(e) => (e.target.style.opacity = 0.8)}
              onMouseOut={(e) => (e.target.style.opacity = 1)}
            >
              Owner Signup
            </Link>
          </>
        )}

        {token && role === "owner" && (
          <Link
            to="/owner-dashboard"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.opacity = 0.8)}
            onMouseOut={(e) => (e.target.style.opacity = 1)}
          >
            Owner Dashboard
          </Link>
        )}

        {token && role === "employee" && (
          <Link
            to="/employee-dashboard"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.opacity = 0.8)}
            onMouseOut={(e) => (e.target.style.opacity = 1)}
          >
            Employee Dashboard
          </Link>
        )}

        {token && (
          <button
            onClick={logout}
            style={styles.logoutButton}
            // Simulating button hover (change color)
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")} // Darker red on hover
            onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")} // Back to original red
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;