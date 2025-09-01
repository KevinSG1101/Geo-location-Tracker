import React, { useEffect, useState } from "react";
import "./form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2";

function Form(props) {
  const [empData, setEmpData] = useState({});

  const updateEmpData = (event) => {
    console.log(event);
    setEmpData({ ...empData, [event.target.name]: event.target.value });
  };

  const saveEmpData = () => {
    axios.post("http://127.0.0.1:5000/addLog", empData).then((response) => {
      if (response.data.success === true) {
        props.getLogs();
        props.setIsModalOpen(false);
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Log stored Successfully",
          showConfirmButton: false,
          timer: 4000,
          position: "top-end",
        });
      } else {
        Swal.fire({
          title: "Failed!",
          icon: "warning",
          text: response.data.message,
          showConfirmButton: false,
          timer: 4000,
          position: "top-end",
        });
      }
    });

    console.log(empData);
  };

  useEffect(() => {
    if (props.editableEmpData.latitude) {
      setEmpData(props.editableEmpData);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setEmpData({
          ...empData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <div className="form">
      <input
        className="form-input"
        onChange={(event) => updateEmpData(event)}
        type="number"
        name="empId"
        placeholder="Employee ID"
        value={empData.empId}
        disabled={props.editableEmpData.empId ? true : false}
      ></input>
      <input
        className="form-input"
        onChange={(event) => updateEmpData(event)}
        type="text"
        name="empName"
        placeholder="Employee Name"
        value={empData.empName}
      ></input>
      <div className="gender">
        <label>GENDER : </label>
        <input
          onChange={(event) => updateEmpData(event)}
          type="radio"
          name="gender"
          value="Male"
          checked={empData.gender == "male" ? true : null}
        ></input>
        <label>Male</label>
        <input
          onChange={(event) => updateEmpData(event)}
          type="radio"
          name="gender"
          value="Female"
          checked={empData.gender == "female" ? true : null}
        ></input>
        <label>Female</label>
      </div>
      <input
        className="form-input"
        value={empData.latitude}
        type="text"
        placeholder="LATITUDE"
        disabled
      ></input>
      <input
        className="form-input"
        value={empData.longitude}
        type="text"
        placeholder="LONGITUDE"
        disabled
      ></input>
      <input
        class="btn"
        onClick={() => saveEmpData()}
        type="submit"
        value="Submit"
      ></input>
    </div>
  );
}

export default Form;
