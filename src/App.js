import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./Table/table";
import Form from "./Form/form";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empData, setEmpData] = useState([]);
  const [editableEmpData, setEditableEmpData] = useState({});

  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = () => {
    fetch("http://127.0.0.1:5000/getLogs")
      .then((data) => data.json())
      .then((response) => {
        setEmpData(response.locationData);
      });
  };

  const editLogs = (employeeData) => {
    setEditableEmpData(employeeData);
  }; 

  const addLogs = () => {
    setEditableEmpData({})
    setIsModalOpen(true);
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="App">
      <div className="button">
        <Button variant="contained" onClick={() =>addLogs() }>
          ADD DATA
        </Button>
      </div>
      <div>
        <Table
          empData={empData}
          getLogs={getLogs}
          setIsModalOpen={setIsModalOpen}
          editLogs={editLogs}
        ></Table>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Form getLogs={getLogs} setIsModalOpen={setIsModalOpen} editableEmpData={editableEmpData}></Form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
