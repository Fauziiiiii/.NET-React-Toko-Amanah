import './Transaksi.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function TransaksiAdd() {
   const [formValue, setFormValue] = useState({
      id_produk: '',
      jumlah: '',
      id_user: ''
   });

   const [produkList, setProdukList] = useState([]);
   const [userList, setUserList] = useState([]);

   useEffect(() => {
      // Fetch produk data
      axios.get('https://localhost:7091/api/Produk')
         .then(response => setProdukList(response.data.data))
         .catch(error => console.error('Error fetching produk:', error));
      
      // Fetch users data
      axios.get('https://localhost:7091/api/Users')
         .then(response => setUserList(response.data.data))
         .catch(error => console.error('Error fetching users:', error));
   }, []);

   const handleChange = (event) => {
      setFormValue({
         ...formValue,
         [event.target.name]: event.target.value
      });
   }

   const handleSubmit = async (event) => {
      event.preventDefault(); // Mencegah proses submit yang menggunakn method lama

      const data = {
         id_produk: formValue.id_produk,
         jumlah: formValue.jumlah,
         id_user: formValue.id_user
      };
      
      try {
         const response = await axios.post(
            "https://localhost:7091/api/Transaksi/CreateTransaksi",
            data, // Send datanya menjadi format JSON
            {
               headers: {
                  'Content-Type': 'application/json'
               }
            }
         );

         if (response.status === 200) {
            console.log(response);
            alert('Data berhasil disimpan');
            
            setFormValue({
               id_produk: '',
               jumlah: '',
               id_user: ''
            });
         } else {
            console.log('Error response:', response);
            alert('Terjadi kesalahan saat menyimpan data');
         }
      } catch (error) {
         console.error('Error:', error);
         alert('Terjadi kesalahan saat menyimpan data');
      }
   }

   return (
      <div className="card">
         <div className="container">
            <div className="Titel">
               Tambah Data Transaksi
            </div>
            <div className="conten">
               <form onSubmit={handleSubmit}>
                  <select name="id_produk" value={formValue.id_produk} onChange={handleChange}>
                     <option value="">Pilih Produk</option>
                     {produkList.map(produk => (
                        <option key={produk.id_produk} value={produk.id_produk}>
                           {produk.nama_produk}
                        </option>
                     ))}
                  </select>
                  <br /><br />
                  <input
                     type="number"
                     name="jumlah"
                     placeholder="Masukkan jumlah"
                     value={formValue.jumlah}
                     onChange={handleChange}
                  />
                  <br /><br />
                  <select name="id_user" value={formValue.id_user} onChange={handleChange}>
                     <option value="">Pilih User</option>
                     {userList.map(user => (
                        <option key={user.id_user} value={user.id_user}>
                           {user.nama}
                        </option>
                     ))}
                  </select>
                  <br /><br />
                  <button type="submit" className='btn btn-primary'>
                     Simpan 
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default TransaksiAdd;