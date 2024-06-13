import './Produk.css';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

function ProdukDelete() {
   const { id } = useParams();

   //define state
   const [formValue, setformValue] = React.useState({
      id_produk: '',
      nama_produk: '',
      harga_satuan: '',
      stok: '',
      created_at: '',
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
         axios.get('https://localhost:7091/api/Produk/GetProdukById?id_produk='+id);

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
      FormDataInput.append("id_produk", setformValue.id_produk)
      FormDataInput.append("nama_produk", setformValue.nama_produk)
      FormDataInput.append("harga_satuan", setformValue.harga_satuan)
      FormDataInput.append("stok", setformValue.stok)

      alert('Data berhasil dihapus')

      try {
         // make axios post request
         const response = await axios({
            method: "delete",
            url: "https://localhost:7091/api/Produk/DeleteProduk?id_produk="+id,
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
                  name="id_produk"
                  value={formValue.id_produk}
                  onChange={handleChange}
                  disabled
                  /><br/><br/>
                  <input
                  type="text"
                  name="nama_produk"
                  value={formValue.nama_produk}
                  onChange={handleChange}
                  disabled
                  /><br/><br/>
                  <input
                  type="text"
                  name="harga_satuan"
                  value={formValue.harga_satuan}
                  onChange={handleChange}
                  disabled
                  /><br/><br/>
                  <input
                  type="text"
                  name="stok"
                  value={formValue.stok}
                  onChange={handleChange}
                  disabled
                  /><br/><br/>
                  <input
                  type="text"
                  name="created_at"
                  value={formValue.created_at}
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

export default ProdukDelete;