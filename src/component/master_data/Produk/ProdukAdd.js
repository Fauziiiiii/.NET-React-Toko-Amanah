import './Produk.css';
import axios from 'axios';
import React from 'react';

function ProdukAdd() {
   const [formValue, setformValue] = React.useState({
      id_produk: '',
      nama_produk: '',
      harga_satuan: '',
      stok: '',
      created_at: '',
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
      FormDataInput.append("nama_produk", formValue.nama_produk)
      FormDataInput.append("harga_satuan", formValue.harga_satuan)
      FormDataInput.append("stok", formValue.stok)
      alert('Data Produknya udah disimpen')

      try {
         // make axios post request
         const response = await axios({
         method: "post",
         url: "https://localhost:7091/api/Produk/CreateProduk",
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
            Tambah Data Produk
            </div>
            <div className="conten">
               <form onSubmit={handleSubmit}>
                  <input
                  type="text"
                  name="nama_produk"
                  placeholder="Masukkan nama produk"
                  value={formValue.nama_produk}
                  onChange={handleChange}
                  /><br/><br/>
                  <input
                  type="text"
                  name="harga_satuan"
                  placeholder="Masukkan harga satuan"
                  value={formValue.harga_satuan}
                  onChange={handleChange}
                  /><br/><br/>
                  <input
                  type="number"
                  name="stok"
                  placeholder="Masukkan Stok barang"
                  value={formValue.stok}
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

export default ProdukAdd;