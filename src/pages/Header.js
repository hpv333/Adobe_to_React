import React from "react";
import { Box, Typography, Button, Avatar, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TestLogo from "../images/TestLogo.svg";

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #f0f0f0",
        backgroundColor: "#f6f7f8",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          borderBottom: "1px solid #f0f0f0",
          backgroundColor: "#ffffff",
          width: "100%",
          borderRadius: "3rem",
        }}
      >
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={TestLogo} // Replace with actual logo path
            alt="TechCare Logo"
            sx={{ width: 170, height: 40, mr: 2 }}
          />
          {/* <Typography
          variant="h5"
          component="h1"
          sx={{ 
            fontWeight: 600, 
            color: "#252733",
            fontSize: "24px" 
          }}
        >
          Tech<span style={{ color: "#00A389" }}>.</span>Care
        </Typography> */}
        </Box>

        {/* Navigation Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Button
            startIcon={<HomeOutlinedIcon />}
            sx={{
              color: "#6E7191",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Overview
          </Button>

          <Button
            startIcon={<PeopleOutlinedIcon />}
            sx={{
              backgroundColor: "#00e5b9",
              color: "#fff",
              textTransform: "none",
              borderRadius: "24px",
              padding: "6px 16px",
              fontSize: "14px",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#00c9a1",
              },
            }}
          >
            Patients
          </Button>

          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              startIcon={<CalendarTodayOutlinedIcon />}
              sx={{
                color: "#6E7191",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Schedule
            </Button>
          
          </Box>

          <Button
            startIcon={<EmailOutlinedIcon />}
            sx={{
              color: "#6E7191",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Message
          </Button>

          <Button
            startIcon={<ReceiptOutlinedIcon />}
            sx={{
              color: "#6E7191",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Transactions
          </Button>
        </Box>

        {/* Profile Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Dr. Jose Simmons"
              src="/doctor-avatar.png" // Replace with actual avatar
              sx={{ width: 32, height: 32 }}
            />
            <Box sx={{ ml: 1, textAlign: "left" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#252733",
                  lineHeight: 1.2,
                }}
              >
                Dr. Jose Simmons
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#6E7191",
                  fontSize: "12px",
                  lineHeight: 1,
                }}
              >
                General Practitioner
              </Typography>
            </Box>
          </Box>

          <IconButton size="small">
            <SettingsIcon sx={{ fontSize: 20, color: "#6E7191" }} />
          </IconButton>

          <IconButton size="small">
            <MoreVertIcon sx={{ fontSize: 20, color: "#6E7191" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
