import axios from "axios";
import "./table.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

function Table(props) {
  const deleteEmpData = (id) => {
    axios.post("http://127.0.0.1:5000/deleteLog", { empId: id }).then(() => {
      props.getLogs();
      Swal.fire({
        title: "Success!",
        icon: "success",
        text: "Log Deleted Successfully",
        showConfirmButton: false,
        timer: 4000,
        position: "top-end",
      });
    });
  };

  const confirmDeletion = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmpData(id);
      }
    });
  };

  const editEmpData = (empData) => {
    props.setIsModalOpen(true);
    props.editLogs(empData);
  };

  return (
    <>
      <div>
        <table className="table">
          <tr>
            <th>EMP ID</th>
            <th>EMP NAME</th>
            <th>GENDER</th>
            <th>LATITUDE</th>
            <th>LONGITUDE</th>
            <th>EDIT/DELETE</th>
          </tr>
          {props.empData.map((employee) => {
            return (
              <>
                <tr>
                  <td>{employee.empId}</td>
                  <td>{employee.empName}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.latitude}</td>
                  <td>{employee.longitude}</td>
                  <td>
                    <div className="icon">
                      <i class="bi bi-pencil" onClick={() => editEmpData(employee)}></i>
                      <i
                        class="bi bi-trash3"
                        onClick={() => confirmDeletion(employee.empId)}
                      ></i>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
}
export default Table;
