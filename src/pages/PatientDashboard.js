import React from "react";
import { Box, Card, CardContent, Grid, Avatar } from "@mui/material";
import ChartComponent from "../components/ChartComponent";
import BloodPressureChart from "../components/BloodPressureChart";
import Layer2 from "../images/Layer2.png";
import HeartBPM from "../images/HeartBPM.png";
import respiratoryrate from "../images/respiratoryrate.png";
import temperature from "../images/temperature.png";
import CircleIcon from "@mui/icons-material/Circle";

const PatientDashboard = ({ patients = [] }) => {
  if (!patients.length)
    return <div style={{ fontSize: "14px" }}>No patient data available</div>;

  const patient = patients[0]; // Jessica Taylor's data
  console.log("patient.....................", patient);
  // Vitals data array
  const vitalsData = [
    {
      title: "Respiratory Rate",
      value: "20 bpm",
      status: "Normal",
      bgColor: "#e3f2fd",
      icon: respiratoryrate,
    },
    {
      title: "Temperature",
      value: "98.6°F",
      status: "Normal",
      bgColor: "#ffebee",
      icon: temperature,
    },
    {
      title: "Heart Rate",
      value: "78 bpm",
      status: "Lower than Average",
      bgColor: "#fff8e1",
      icon: HeartBPM,
    },
  ];

  // Blood pressure data array
  const bpData = [
    {
      name: "Systolic",
      value: "160",
      status: "▲ Higher than Average",
      color: "#E83E8C",
    },
    {
      name: "Diastolic",
      value: "78",
      status: "▼ Lower than Average",
      color: "#6F42C1",
    },
  ];

  // Patient details data array
  const patientDetailsData = [
    {
      icon: "📅",
      label: "Date Of Birth",
      value: patient.date_of_birth || "August 23, 1996",
    },
    {
      icon: "👤",
      label: "Gender",
      value: patient.gender || "Female",
    },
    {
      icon: "📞",
      label: "Contact Info",
      value: patient.phone_number || "(415) 555-1234",
    },
    {
      icon: "⚠️",
      label: "Emergency Contacts",
      value: patient.emergency_contact || "(415) 555-5678",
    },
    {
      icon: "🛡️",
      label: "Insurance Provider",
      value: patient.insurance_type || "Sunrise Health Assurance",
    },
  ];

  // Lab results data array
  const labResultsMap = patient.lab_results;
  console.log("Lab results data", labResultsMap);

  // Convert the map object to an array of objects with 'name' property
  const labResultsData = Object.keys(labResultsMap).map((index) => ({
    id: parseInt(index),
    name: labResultsMap[index],
  }));

  const diagnostic_list = patient.diagnostic_list;
  // Function to determine chip color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return { bg: "#e53935", color: "white" };
      case "Under Observation":
        return { bg: "#ff9800", color: "white" };
      case "Inactive":
        return { bg: "#4caf50", color: "white" };
      case "Cured":
        return { bg: "#2196f3", color: "white" };
      default:
        return { bg: "#9e9e9e", color: "white" };
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        borderRadius: "3rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          borderRadius: "3rem",
        }}
      >
        {/* Middle section - Diagnosis History, Vitals, etc */}
        <Box
          sx={{
            flex: 2,
            padding: 3,
            borderRight: "1px dashed #e0e0e0",
            overflowY: "auto",
            backgroundColor: "#ffffff",
            marginX: "1rem",
            borderRadius: "2rem",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Diagnosis History
          </div>
          <Box>{/* <ChartComponent patient={patient} /> */}</Box>
          {/* Blood Pressure Chart */}
          <Card sx={{ mb: 3, backgroundColor: "#F4F0FE" }}>
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
                  Blood Pressure
                </div>
                <div style={{ fontSize: "14px" }}>Last 6 months</div>
              </Box>

              {/* Repositioned Blood Pressure Chart with data on the right */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  backgroundColor: "#F4F0FE",
                  borderRadius: "1.5rem",
                }}
              >
                {/* Chart on the left */}
                <Box sx={{ flex: 2 }}>
                  <BloodPressureChart patient={patient} />
                </Box>

                {/* Systolic and Diastolic data on the right */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  {bpData.map((item, index) => (
                    <Box key={index}>
                      <div style={{ fontSize: "14px", color: item.color }}>
                        <CircleIcon sx={{ fontSize: "14px" }} /> {item.name}
                      </div>
                      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {item.value}
                      </div>
                      <div style={{ fontSize: "14px" }}>{item.status}</div>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Vitals Section */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {vitalsData.map((vital, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ bgcolor: vital.bgColor }}>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Avatar src={vital.icon} sx={{ width: 70, height: 70 }} />
                    <div style={{ fontSize: "14px" }}>{vital.title}</div>
                    <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                      {vital.value}
                    </div>
                    <br />
                    <div style={{ fontSize: "14px" }}>{vital.status}</div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Diagnostic List */}
          <Box sx={{ mt: 4 }}>
            <div
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Diagnostic List
            </div>

            <Card>
              <CardContent>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        Problem/Diagnosis
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        Description
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {diagnostic_list.map((diagnosis, index) => {
                      const statusStyle = getStatusColor(diagnosis.status);
                      return (
                        <tr key={index}>
                          <td
                            style={{
                              padding: "12px 16px",
                              borderBottom:
                                index !== diagnostic_list.length - 1
                                  ? "1px solid #ddd"
                                  : "none",
                              fontWeight: "500",
                            }}
                          >
                            {diagnosis.name}
                          </td>
                          <td
                            style={{
                              padding: "12px 16px",
                              borderBottom:
                                index !== diagnostic_list.length - 1
                                  ? "1px solid #ddd"
                                  : "none",
                            }}
                          >
                            {diagnosis.description}
                          </td>
                          <td
                            style={{
                              padding: "12px 16px",
                              borderBottom:
                                index !== diagnostic_list.length - 1
                                  ? "1px solid #ddd"
                                  : "none",
                            }}
                          >
                            <span
                              style={{
                                backgroundColor: statusStyle.bg,
                                color: statusStyle.color,
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: "500",
                              }}
                            >
                              {diagnosis.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Right section - Patient Details */}
        <Box
          sx={{
            backgroundColor: " #F6F7F8",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: "350px",
              padding: 3,
              backgroundColor: "#ffffff",
              borderRadius: "1.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src={Layer2}
                alt={patient.name}
                sx={{ width: 180, height: 180, mb: 1 }}
              />
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  textAlign: "center",
                  marginBottom: "8px",
                }}
              >
                {patient.name || "Jessica Taylor"}
              </div>

              <Card sx={{ width: "100%", mt: 0 }}>
                <CardContent>
                  {patientDetailsData.map((detail, index) => (
                    <Box sx={{ display: "flex", mb: 2 }} key={index}>
                      <Box component="span" sx={{ mr: 2 }}>
                        {detail.icon}
                      </Box>
                      <Box>
                        <div style={{ fontSize: "14px", fontWeight: "600" }}>
                          {detail.label}
                        </div>
                        <div style={{ fontSize: "14px" }}>{detail.value}</div>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ width: "100%", mt: 3 }}>
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#00e5b9",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Show All Information
              </button>
            </Box>
          </Box>

          {/* Lab Results */}
          <Box
            sx={{
              width: "350px",
              padding: 3,
              overflowY: "auto",
              backgroundColor: "#ffffff",
              borderRadius: "1.5rem",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <div
                style={{
                  fontSize: "18px",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Lab Results
              </div>

              <div>
                {labResultsData.map((lab, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: index !== labResultsData.length - 1 ? 1 : 0,
                    }}
                    key={index}
                  >
                    <div style={{ fontSize: "14px" }}>{lab.name}</div>
                    <div style={{ fontSize: "14px" }}>↓</div>
                  </Box>
                ))}
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientDashboard;
