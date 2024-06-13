import './Mahasiswa.css';
import axios from 'axios';
import React from 'react';

function MahasiswaAdd() {
   const [formValue, setformValue] = React.useState({
      mhs_nim: '',
      mhs_nama: ''
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
      FormDataInput.append("mhs_nim", formValue.mhs_nim)
      FormDataInput.append("mhs_nama", formValue.mhs_nama)
      alert('Data berhasil disimpan')

      try {
         // make axios post request
         const response = await axios({
         method: "post",
         url: "https://localhost:7248/Mahasiswa/CreateMahasiswa",
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
            Tambah Data Mahasiswa
            </div>
            <div className="conten">
               <form onSubmit={handleSubmit}>
                  <input
                  type="text"
                  name="mhs_nim"
                  placeholder="enter NIM"
                  value={formValue.mhs_nim}
                  onChange={handleChange}
                  /><br/><br/>
                  <input
                  type="text"
                  name="mhs_nama"
                  placeholder="enter a Nama"
                  value={formValue.mhs_nama}
                  onChange={handleChange}
                  /><br/><br/>
                  <button type="submit" className='btn btn-primary'> Simpan 
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default MahasiswaAdd;