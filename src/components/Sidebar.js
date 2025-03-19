import React from "react";
import { List, ListItem, ListItemText, Avatar, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = ({ patients = [] }) => {
  return (
 
      <List disablePadding>
        {patients.map((patient) => (
          <ListItem 
            button 
            key={patient.id} 
            component={Link} 
            to={`/patient/${patient.id}`}
            sx={{
              borderBottom: "1px solid #f0f0f0",
              py: 1
            }}
          >
            <Avatar 
              sx={{ 
                marginRight: 2,
                width: 40,
                height: 40
              }} 
              src={patient.profilePic || ""}
            >
              {!patient.profilePic && patient.name.charAt(0)}
            </Avatar>
            <ListItemText 
              primary={patient.name} 
              secondary={`${patient.gender}, ${patient.age}`}
              primaryTypographyProps={{
                fontWeight: "medium",
                color: "#333"
              }}
              secondaryTypographyProps={{
                color: "#666",
                fontSize: "0.8rem"
              }}
            />
          </ListItem>
        ))}
      </List>
   

  );
};

export default Sidebar;