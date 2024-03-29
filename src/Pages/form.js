import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
import {
  TextField,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
} from "@mui/material";

function Form() {
  let formValues = {
    id: "",
    name: "",
    department: "",
    email: "",
    mobile: "",
    address: "",
    error: {
      name: "",
      department: "",
      email: "",
      mobile: "",
      address: "",
    },
  };
  const [formData, setFormData] = useState(formValues);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let error = { ...formData.error };
    if (e.target.value === "") {
      error[e.target.name] = `${e.target.name} is Required`;
    } else {
      error[e.target.name] = "";
    }
    setFormData({ ...formData, [e.target.name]: e.target.value, error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Delete
    const errKeys = Object.keys(formData).filter((key) => {
      if (formData[key] === "" && key !== "error" && key !== "id") {
        return key;
      }
    });
    if (errKeys.length >= 1) {
      alert("Please fill all values");
    } else {
      // Create
      const response = await axios.post(
        "https://interview-project-backend.herokuapp.com/student/create",
        {
          name: formData.name,
          department: formData.department,
          email: formData.email,
          mobile: formData.mobile,
          address: formData.address,
        }
      );
      if (response.status === 200) {
        navigate("/");
      }
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#E5E7E9" }}>
        <h1
          style={{
            textAlign: "center",
            marginTop: "0px",
            padding: "20px",
            backgroundColor: "#5DADE2",
          }}
        >
          Add Student Form
        </h1>

        <Box
          textAlign="center"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
          }}
          autoComplete="off"
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            id="name"
            label="Name"
            variant="standard"
            value={formData.name}
            name="name"
            required
            onChange={(e) => handleChange(e)}
          />
          <br />
          <span style={{ color: "red" }}>{formData.error.name}</span>
          <br />
          <FormControl fullWidth>
            <InputLabel id="Courses">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Department"
              name="department"
              value={formData.department}
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="Computer Science">Computer Science</MenuItem>
              <MenuItem value="History">History</MenuItem>
              <MenuItem value="Physics">Physics</MenuItem>
              <MenuItem value="Chemitry">Chemitry</MenuItem>
              <MenuItem value="Biology">Biology</MenuItem>
              <MenuItem value="Political Science">Political Science</MenuItem>
            </Select>
          </FormControl>
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            variant="standard"
            name="email"
            required
            pattern="[^ @]*@[^ @]*"
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <span style={{ color: "red" }}>{formData.error.email}</span>
          <br />
          <TextField
            id="moblie"
            label="Mobile"
            variant="standard"
            type="number"
            name="mobile"
            required
            pattern="[789][0-9]{9}"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 10);
            }}
            value={formData.mobile}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <span style={{ color: "red" }}>{formData.error.mobile}</span>
          <br />
          <textarea
            rows="5"
            cols="50"
            id="address"
            name="address"
            placeholder="Address"
            value={formData.address}
            style={{ width: 255, height: 100 }}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <br />
          <span style={{ color: "red" }}>{formData.error.address}</span>
          <div
            style={{
              width: "auto",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" type="submit" style={{ width: 250 }}>
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
}

export default Form;
