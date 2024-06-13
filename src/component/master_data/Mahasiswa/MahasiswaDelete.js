import './Mahasiswa.css';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

function MahasiswaDelete() {
   const { id } = useParams();

   //define state
   const [formValue, setformValue] = React.useState({
      mhs_nim: '',
      mhs_nama: ''
   });

   //useEffect hook
   React.useEffect(() => {
      //panggil method "fetchData"
      fectData();
   }, []);

   //function "fetchData"
   const fectData = async () => {
      try {
         //fetching
         const response = await
         axios.get('https://localhost:7248/Mahasiswa/GetMahasiswaByNim?mhs_nim='+id);

         //get response data
         const data = await response.data.data;

         //assign response data to state "formValue"
         setformValue(data); 
         console.log(data);
      } catch(error) {
         console.log(error)
         alert('Data tidak ditemukan atau sudah dihapus!')
      }
   }

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

      alert('Data berhasil dihapus')

      try {
         // make axios post request
         const response = await axios({
         method: "delete",
         url: "https://localhost:7248/Mahasiswa/DeleteMahasiswa?mhs_nim="+id,
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
            Hapus Data Mahasiswa {formValue.mhs_nama}
            </div>
            <div className="conten">
               <form onSubmit={handleSubmit}>
                  <input
                  type="text"
                  name="mhs_nim"
                  placeholder="enter NIM"
                  value={formValue.mhs_nim}
                  onChange={handleChange}
                  disabled
                  /><br/><br/>
                  <input
                  type="text"
                  name="mhs_nama"
                  placeholder="enter a Nama"
                  value={formValue.mhs_nama}
                  onChange={handleChange}
                  disabled
                  /><br/><br/>
                  <button type="submit" className='btn btn-danger'>
                     Hapus 
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default MahasiswaDelete;