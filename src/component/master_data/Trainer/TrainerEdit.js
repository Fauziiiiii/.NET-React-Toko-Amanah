import './Trainer.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function TrainerEdit() {
   const { id } = useParams();

   //define state
   const [dataTrainer, setDataTrainer] = useState({
      id: '',
      nama: '',
      email: '',
      password: '',
      nohp: '',
      status: '',
   });

   //useEffect hook
   useEffect(() => {
      //panggil method "fetchData"
      fetchData();
   }, []);

   //function "fetchData"
   const fetchData = async () => {
      //fetching
      const response = await axios.get('https://localhost:7248/Trainer/GetTrainerById?id='+id);

      //get response data
      const data = await response.data.data;
      
      //assign response data to state "dataTrainer"
      setDataTrainer(data);
      console.log(data);
   }

   // show data dataTrainer
   useEffect(() => {
      console.log(dataTrainer);
   }, [dataTrainer]);

   const handleChange = (event) => {
      setDataTrainer({
         ...dataTrainer,
         [event.target.name]: event.target.value
      });
   }  

   const handleSubmit = async() => {
      // store the states in the form data
      const FormDataInput = new FormData();
      FormDataInput.append("nama", dataTrainer.nama)
      FormDataInput.append("email", dataTrainer.email)
      FormDataInput.append("password", dataTrainer.password)
      FormDataInput.append("nohp", dataTrainer.nohp)
      FormDataInput.append("status", dataTrainer.status)

      alert('Data berhasil diubah')

      try {
         // make axios post request
         const response = await axios({
            method: "put",
            url: "https://localhost:7248/Trainer/UpdateTrainer?id="+id,
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
            Edit Data Trainer {dataTrainer.nama}
            </div>
            <div className="conten">
               <form onSubmit={handleSubmit}>
                  <input
                  type="number"
                  name="id"
                  placeholder="Masukkan id"
                  value={dataTrainer.id}
                  onChange={handleChange}
                  disabled
                  />
                  <br/><br/>
                  <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama"
                  value={dataTrainer.nama}
                  onChange={handleChange}
                  />
                  <br/><br/>
                  <input
                  type="email"
                  name="email"
                  placeholder="Masukkan email anda"
                  value={dataTrainer.email}
                  onChange={handleChange}
                  />
                  <br/><br/>
                  <input
                  type="password"
                  name="password"
                  placeholder="Masukkan password"
                  value={dataTrainer.password}
                  onChange={handleChange}
                  />
                  <br/><br/>
                  <input
                  type="tel"
                  name="nohp"
                  placeholder="Masukkan nohp"
                  value={dataTrainer.nohp}
                  onChange={handleChange}
                  />
                  <br/><br/>
                  <input
                  type="number"
                  name="status"
                  placeholder="Masukkan status"
                  value={dataTrainer.status}
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

export default TrainerEdit;