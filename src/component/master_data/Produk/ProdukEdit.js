import './Produk.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function ProdukEdit() {
   const { id } = useParams();

   //define state
   const [dataProduk, setDataProduk] = useState({
      id_produk: '',
      nama_produk: '',
      harga_satuan: '',
      stok: '',
      created_at: '',
   });

   //useEffect hook
   useEffect(() => {
      //panggil method "fetchData"
      fetchData();
   }, []);

   //function "fetchData"
   const fetchData = async () => {
      //fetching
      const response = await axios.get('https://localhost:7091/api/Produk/GetProdukById?id_produk='+id);

      //get response data
      const data = await response.data.data[0];
      
      //assign response data to state "dataProduk"
      setDataProduk(data);
      console.log(data);
   }

   // show data dataProduk in json
   useEffect(() => {
      console.log(dataProduk);
   }, [dataProduk]);

   const handleChange = (event) => {
      setDataProduk({
         ...dataProduk,
         [event.target.name]: event.target.value
      });
   }  

   const handleSubmit = async() => {
      // store the states in the form data
      const FormDataInput = new FormData();
      FormDataInput.append("nama_produk", dataProduk.nama_produk)
      FormDataInput.append("harga_satuan", dataProduk.harga_satuan)
      FormDataInput.append("stok", dataProduk.stok)

      alert('Data Produkmu berhasil diganti')

      try {
         // make axios post request
         const response = await axios({
            method: "put",
            url: "https://localhost:7091/api/Produk/UpdateProduk?id_produk="+id,
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
            Edit Data Produk {dataProduk.nama_produk}
            </div>
            <div className="conten">
               <form onSubmit={handleSubmit}>
                  <input
                     type="text"
                     name="id_produk"
                     value={dataProduk.id_produk}
                     onChange={handleChange}
                     disabled
                  /><br/><br/>
                  <input
                     type="text"
                     name="nama_produk"
                     placeholder="Masukan nama produk"
                     value={dataProduk.nama_produk}
                     onChange={handleChange}
                  />
                  <br/><br/>
                  <input
                     type="number"
                     name="harga_satuan"
                     placeholder="Masukan harga satuan"
                     value={dataProduk.harga_satuan}
                     onChange={handleChange}
                  />
                  <br/><br/>
                  <input
                     type="number"
                     name="stok"
                     placeholder="Masukin dulu stoknya"
                     value={dataProduk.stok}
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

export default ProdukEdit;