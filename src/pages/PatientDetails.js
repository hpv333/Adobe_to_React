import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Grid2, 
  Divider, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell,
  Avatar
} from "@mui/material";

const PatientDetails = ({ getAuthHeader }) => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // For this test, we already have Jessica Taylor's data from the main API,
    // but in a real app, we would fetch individual patient data like this:
    fetch(`https://fedskillstest.coalitiontechnologies.workers.dev`, {
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
        // Find Jessica Taylor's data
        const jessicaData = data.find(patient => patient.id.toString() === id || patient.name === "Jessica Taylor");
        if (jessicaData) {
          setPatient(jessicaData);
          console.log('jessica Data:>>>>>>>>',  jessicaData);

        } else {
          setError("Patient not found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("⚠️ Error fetching patient details:", error);
        setError("Failed to fetch patient details");
        setLoading(false);
      });
  }, [id, getAuthHeader]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!patient) return <div>Patient not found</div>;

  return (
    <Box sx={{ flexGrow: 1, margin: 2, width: "100%" }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} md={3}>
              <Avatar 
                src={patient.profilePic} 
                alt={patient.name}
                sx={{ width: 120, height: 120, mb: 2 }}
              >
                {!patient.profilePic && patient.name.charAt(0)}
              </Avatar>
            </Grid2>
            <Grid2 item xs={12} md={9}>
              <Typography variant="h4">{patient.name}</Typography>
              <Typography variant="subtitle1">Date of Birth: {patient.dob}</Typography>
              <Typography variant="subtitle1">Gender: {patient.gender}</Typography>
              <Typography variant="subtitle1">Age: {patient.age}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1">Contact: {patient.contact}</Typography>
              <Typography variant="subtitle1">Emergency Contact: {patient.emergency}</Typography>
              <Typography variant="subtitle1">Insurance: {patient.insurance}</Typography>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      <Grid2 container spacing={3}>
        <Grid2 item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Diagnosis History</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Diagnosis</TableCell>
                    <TableCell>Doctor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patient.diagnosisHistory && patient.diagnosisHistory.map((diagnosis, index) => (
                    <TableRow key={index}>
                      <TableCell>{diagnosis.date}</TableCell>
                      <TableCell>{diagnosis.diagnosis}</TableCell>
                      <TableCell>{diagnosis.doctor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid2>
        
        <Grid2 item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Lab Results</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell>Result</TableCell>
                    <TableCell>Range</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patient.labResults && patient.labResults.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.date}</TableCell>
                      <TableCell>{result.test}</TableCell>
                      <TableCell>{result.result}</TableCell>
                      <TableCell>{result.range}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid2>
        
        <Grid2 item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Diagnostic List</Typography>
              <List>
                {patient.diagnostics && patient.diagnostics.map((diag, index) => (
                  <ListItem key={index} divider>
                    <ListItemText 
                      primary={diag.problem} 
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            {diag.description}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="textSecondary">
                            Status: {diag.status}
                          </Typography>
                        </>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default PatientDetails;