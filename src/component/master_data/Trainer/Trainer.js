import React, { useState, useEffect } from "react";
import "./Trainer.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function DataTrainer() {
  //define state
  const [datatrainer, setDataTrainer] = useState([]);
  //useEffect hook
  useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);
  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get(
      "https://localhost:7248/Trainer/GetAllTrainer"
    );
    //get response data
    const data = await response.data;
    //assign response data to state "datatrainer"
    setDataTrainer(data);
    console.log(data);
  };
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nama",
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
        name: "Password",
        selector: (row) => row.password,
        sortable: true,
    },
    {
        name: "No Hp",
        selector: (row) => row.nohp,
        sortable: true,
    },
    {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
    },
    {
      name: 'Ubah',
      selector: row => <Link to={"/trainer_edit/"+row.id}
      className="btn btn-primary">Edit</Link>,
      sortable: true
    },
    {
      name: 'Hapus',
      selector: row => <Link to={"/trainer_delete/"+row.id}
      className="btn btn-danger">Delete</Link>,
      sortable: true
    },
  ];
  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Data Trainer</div>
        <div className="conten">
          <h2>Data Trainer</h2>
          <Link to="/trainer_add" className="btn btn-primary">
            + Data Trainer
          </Link>
          <DataTable columns={columns} data={datatrainer.data} pagination />
        </div>
      </div>
    </div>
  );
}
export default DataTrainer;





// import React, { useState, useEffect } from "react";
// import "./Trainer.css";
// import axios from "axios";
// import DataTable from "react-data-table-component";

// function DataTrainer() {
//   // Define state for trainer data and form data
//   const [datatrainer, setDataTrainer] = useState([]);
//   const [formData, setFormData] = useState({
//     id: "",
//     nama: "",
//     email: "",
//     password: "",
//     nohp: "",
//     status: "",
//   });

//   // UseEffect hook
//   useEffect(() => {
//     // Call method "fetchData"
//     fetchData();
//   }, []);

//   // Function "fetchData"
//   const fetchData = async () => {
//     try {
//       // Fetching data
//       const response = await axios.get(
//         "https://localhost:7248/Trainer/GetAllTrainer"
//       );
//       // Get response data
//       const data = response.data;
//       // Assign response data to state "datatrainer"
//       setDataTrainer(data);
//     } catch (error) {
//       console.error("There was an error fetching the trainer data!", error);
//     }
//   };

//   // Function to handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === "id" || name === "status" ? parseInt(value) : value,
//     });
//   };

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Ensure id and status are integers
//       const dataToSend = {
//         ...formData,
//         id: parseInt(formData.id),
//         status: parseInt(formData.status),
//       };
//       // Sending POST request to add new trainer
//       const response = await axios.post(
//         "https://localhost:7248/Trainer/CreateTrainer",
//         dataToSend
//       );
//       if (response.status === 200) {
//         // Refresh data after successful submission
//         fetchData();
//         // Reset form data
//         setFormData({
//           id: "",
//           nama: "",
//           email: "",
//           password: "",
//           nohp: "",
//           status: "",
//         });
//       }
//     } catch (error) {
//       console.error("There was an error creating the trainer!", error);
//     }
//   };

//   const columns = [
//     {
//       name: "Id",
//       selector: (row) => row.id,
//       sortable: true,
//     },
//     {
//       name: "Nama",
//       selector: (row) => row.nama,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//       sortable: true,
//     },
//     {
//       name: "Password",
//       selector: (row) => row.password,
//       sortable: true,
//     },
//     {
//       name: "No Hp",
//       selector: (row) => row.nohp,
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row) => row.status,
//       sortable: true,
//     },
//   ];

//   return (
//     <div className="card">
//       <div className="container">
//         <div className="Title">Data Trainer</div>
//         <div className="content">
//           <h2>Data Trainer</h2>
//           <DataTable columns={columns} data={datatrainer.data} pagination />
//         </div>
//         <div className="form-container">
//           <h2>Add New Trainer</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="number"
//               name="id"
//               placeholder="ID"
//               value={formData.id}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="text"
//               name="nama"
//               placeholder="Nama"
//               value={formData.nama}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="text"
//               name="nohp"
//               placeholder="No Hp"
//               value={formData.nohp}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="number"
//               name="status"
//               placeholder="Status"
//               value={formData.status}
//               onChange={handleInputChange}
//               required
//             />
//             <button type="submit">Add Trainer</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DataTrainer;

