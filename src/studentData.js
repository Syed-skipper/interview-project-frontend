import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function StudentData() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/addStudent");
  };

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://interview-project-backend.herokuapp.com/student/read"
      );
      setUserData(response.data);
      console.log(response.data);
    }
    getData();
  }, []);

  return (
    <div style={{backgroundColor:'grey'}}>
      <div>
        <h3
          style={{
            textAlign: "center",
            fontSize: "2rem",
            backgroundColor: "#58D68D",
            marginTop: "0px",
            padding: "20px",
          }}
        >
          Students Data
        </h3>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleNavigate}>
            Add Student
          </Button>
        </div>

        <br />
        <TableContainer
          component={Paper}
          style={{ width: "900px", marginLeft: "200px" ,backgroundColor:'#D5D8DC'}}
        >
          <Table sx={{}} aria-label="simple table">
            <TableHead>
              <TableRow style={{ fontWeight: "bold" }}>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  NAME
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  DEPARTMENT
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  EMAIL
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  MOBILE
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  ADDRESS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.department}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.mobile}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default StudentData;
