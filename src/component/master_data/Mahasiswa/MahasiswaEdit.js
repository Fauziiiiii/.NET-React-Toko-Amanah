import './Mahasiswa.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function MahasiswaAdd() {
   const { id } = useParams();

   //define state
   const [dataMahasiswa, setDatamahasiswa] = useState({
      'mhs_nim': '',
      'mhs_nama': ''
   });

   //useEffect hook
   useEffect(() => {
      //panggil method "fetchData"
      fetchData();
   }, []);

   //function "fetchData"
   const fetchData = async () => {
      //fetching
      const response = await axios.get('https://localhost:7248/Mahasiswa/GetMahasiswaByNim?mhs_nim='+id);

      //get response data
      const data = await response.data.data;
      
      //assign response data to state "dataMahasiswa"
      setDatamahasiswa(data);
      console.log(data);
   }

   // show data dataMahasiswa
   // useEffect(() => {
   //    console.log(dataMahasiswa);
   // }, [dataMahasiswa]);

   const handleChange = (event) => {
      setDatamahasiswa({
         ...dataMahasiswa,
         [event.target.name]: event.target.value
      });
   }  

   const handleSubmit = async() => {
      // store the states in the form data
      const FormDataInput = new FormData();

      FormDataInput.append("mhs_nim", dataMahasiswa.mhs_nim)
      FormDataInput.append("mhs_nama", dataMahasiswa.mhs_nama)
      alert('Data berhasil diubah')

      try {
         // make axios post request
         const response = await axios({
            method: "put",
            url: "https://localhost:7248/Mahasiswa/UpdateMahasiswa?mhs_nim="+id,
            data: FormDataInput,
            headers: { "Content-Type": "application/json" },
         });
         console.log(response)
      } catch(error) {
         console.log(error)
         alert(error)
      }
   }

   return (
      <div className="card">
         <div className="container">
            <div className="Titel">
            Edit Data Mahasiswa {dataMahasiswa.mhs_nama}
            </div>
            <div className="conten">
               <form onSubmit={handleSubmit}>
                  <input
                     type="text"
                     name="mhs_nim"
                     placeholder="enter NIM"
                     value={id}
                     onChange={handleChange}
                     disabled
                  /><br/><br/>
                  <input
                     type="text"
                     name="mhs_nama"
                     placeholder="enter a Nama"
                     value={dataMahasiswa.mhs_nama}
                     onChange={handleChange}
                  />
                  <br/><br/>
                  <button type="submit" className='btn btn-primary'> Simpan 
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default MahasiswaAdd;