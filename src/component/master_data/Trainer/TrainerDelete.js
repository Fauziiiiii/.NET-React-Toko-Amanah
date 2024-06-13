import './Trainer.css';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

function TrainerDelete() {
   const { id } = useParams();

   //define state
   const [dataTrainer, setDataTrainer] = React.useState({
      id: '',
      nama: '',
      email: '',
      password: '',
      nohp: '',
      status: '',
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
         axios.get('https://localhost:7248/Trainer/GetTrainerById?id='+id);

         //get response data
         const data = await response.data.data;

         //assign response data to state "dataTrainer"
         setDataTrainer(data); 
         console.log(data);
      } catch(error) {
         console.log(error)
         alert('Data tidak ditemukan atau udah dihapus!')
      }
   }

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

      alert('Data berhasil dihapus')

      try {
         // make axios post request
         const response = await axios({
         method: "delete",
         url: "https://localhost:7248/Trainer/DeleteTrainer?id="+id,
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
            Hapus Data Trainer {dataTrainer.nama}
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
                  disabled
                  />
                  <br/><br/>
                  <input
                  type="email"
                  name="email"
                  placeholder="Masukkan email anda"
                  value={dataTrainer.email}
                  onChange={handleChange}
                  disabled
                  />
                  <br/><br/>
                  <input
                  type="password"
                  name="password"
                  placeholder="Masukkan password"
                  value={dataTrainer.password}
                  onChange={handleChange}
                  disabled
                  />
                  <br/><br/>
                  <input
                  type="tel"
                  name="nohp"
                  placeholder="Masukkan nohp"
                  value={dataTrainer.nohp}
                  onChange={handleChange}
                  disabled
                  />
                  <br/><br/>
                  <input
                  type="number"
                  name="status"
                  placeholder="Masukkan status"
                  value={dataTrainer.status}
                  onChange={handleChange}
                  disabled
                  />
                  <br/><br/>
                  <button type="submit" className='btn btn-danger'> Hapus 
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default TrainerDelete;