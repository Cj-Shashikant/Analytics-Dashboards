'use client';

import Header from "../components/layout/headers";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header Component */}
      <Header />
      
      {/* Main Content */}
      <Box sx={{ padding: "2rem" }}>
        <Box sx={{ 
          backgroundColor: "white", 
          borderRadius: "8px", 
          padding: "2rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{ 
            fontSize: "2rem", 
            fontWeight: "bold", 
            marginBottom: "1rem",
            color: "#333"
          }}>
            Welcome to Tata Realty Dashboard
          </h1>
          <p style={{ 
            fontSize: "1.1rem", 
            color: "#666",
            marginBottom: "1rem"
          }}>
            Your analytics dashboard is ready. The header component has been successfully integrated.
          </p>
          <ul style={{ 
            listStyle: "disc", 
            paddingLeft: "1.5rem",
            color: "#666"
          }}>
            <li>Header component is now active</li>
            <li>Navigation and search functionality included</li>
            <li>User profile menu with logout option</li>
            <li>Ready for additional dashboard components</li>
          </ul>

        </Box>
      </Box>
    </Box>
  );
}
