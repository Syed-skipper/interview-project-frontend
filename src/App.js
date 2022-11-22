import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentData from "./Pages/studentData";
import Form from "./Pages/form";

function RouterComponent() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StudentData />} />
            <Route path="/addStudent" element={<Form />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default RouterComponent;
