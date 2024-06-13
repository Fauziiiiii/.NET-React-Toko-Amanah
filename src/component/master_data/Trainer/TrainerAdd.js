import './Trainer.css';
import axios from 'axios';
import React from 'react';

function TrainerAdd() {
   const [formValue, setformValue] = React.useState({
      id: '',
      nama: '',
      email: '',
      password: '',
      nohp: '',
      status: '',
   });

   const handleChange = (event) => {
      setformValue({
         ...formValue,
         [event.target.name]: event.target.value
      });
   }

   const handleSubmit = async() => {
      // store the states in the form data
      const FormDataInput = new FormData();
      FormDataInput.append("nama", formValue.nama)
      FormDataInput.append("email", formValue.email)
      FormDataInput.append("password", formValue.password)
      FormDataInput.append("nohp", formValue.nohp)
      FormDataInput.append("status", formValue.status)
      
      alert('Data berhasil disimpan')

      try {
         // make axios post request
         const response = await axios({
         method: "post",
         url: "https://localhost:7248/Trainer/CreateTrainer",
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
            Tambah Data Trainer
            </div>
            <div className="conten">
               <form onSubmit={handleSubmit}>
                  <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama"
                  value={formValue.nama}
                  onChange={handleChange}
                  />
                  <br/><br/>
                  <input
                  type="text"
                  name="email"
                  placeholder="Masukkan email anda"
                  value={formValue.email}
                  onChange={handleChange}
                  />
                  <br/><br/>
                  <input
                  type="password"
                  name="password"
                  placeholder="Masukkan password"
                  value={formValue.password}
                  onChange={handleChange}
                  />
                  <br/><br/>
                  <input
                  type="tel"
                  name="nohp"
                  placeholder="Masukkan nohp"
                  value={formValue.nohp}
                  onChange={handleChange}
                  />
                  <br/><br/>
                  <input
                  type="number"
                  name="status"
                  placeholder="Masukkan status"
                  value={formValue.status}
                  onChange={handleChange}
                  />
                  <br/><br/>
                  <button type="submit" className='btn btn-primary'>
                     Simpan 
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default TrainerAdd;