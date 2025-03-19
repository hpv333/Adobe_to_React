import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, Box, Typography, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from "./components/Sidebar";
import PatientDashboard from "./pages/PatientDashboard";
import PatientDetails from "./pages/PatientDetails";
import Header from "./pages/Header";

function App() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to properly encode authentication credentials
  const getAuthHeader = () => {
    // Store username and password for authentication
    // Note: In a production app, these would be stored more securely or obtained from environment variables
    const username = "coalition";
    const password = "skills-test";
    
    // Create the Base64 encoded auth string
    // This is the proper way to handle basic authentication without hardcoding the encoded result
    const authString = btoa(`${username}:${password}`);
    return `Basic ${authString}`;
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
      headers: {
        Authorization: getAuthHeader(),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPatients(data || []);
        console.log("Data from api: >>>>>>>>>", data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("⚠️ Error fetching data:", error);
        setError("Failed to fetch patient data. Please check your connection.");
        setLoading(false);
      });
  }, []);

  // Filter to only show Jessica Taylor as per requirements
  const jessicaTaylor = patients.find(patient => patient.name === "Jessica Taylor") || null;
  const filteredPatients = jessicaTaylor ? [jessicaTaylor] : [];
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ 
        display: "flex", 
        flexDirection: "column", 
        height: "100vh", 
        width: "100%",
        overflow: "hidden", 
      }}>
        {/* Header - Always on top, full width */}
        <Box 
          sx={{ 
            width: "100%",
            zIndex: 1100,
            position: "relative"
          }}
        >
          <Header />
        </Box>
        
        {/* Content area below header - contains sidebar and main content */}
        <Box 
          sx={{ 
            display: "flex", 
            flex: 1,
            width: "100%",
            overflow: "hidden",
            borderTop: "1px dashed #F6F7F8", backgroundColor:"#F6F7F8"
          }}
        >
          {/* Left sidebar */}
          <Box 
            sx={{ 
              width: "250px", 
              borderRight: "1px dashed #e0e0e0", 
              height: "100%",
              overflowY: "auto",
              padding: "20px",
              backgroundColor: "#ffffff", 
              borderRadius:"2rem"
            }}
          >
            <Box 
              sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                mb: 2, 
              borderRadius:"3rem"
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Patients</Typography>
              <IconButton size="small">
                <SearchIcon />
              </IconButton>
            </Box>
            <Sidebar patients={patients} />
          </Box>
          
          {/* Main content area */}
          <Box 
            sx={{ 
              flex: 1, 
              display: "flex",
              overflow: "auto"
            }}
          >
            <Routes>
              <Route path="/" element={<PatientDashboard patients={filteredPatients} />} />
              <Route path="/patient/:id" element={<PatientDetails getAuthHeader={getAuthHeader} />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;