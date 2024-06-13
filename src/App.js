// import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Menu from "./component/menu/Menu";
import Home from "./component/home/Home";
import Profile from "./component/profile/Profile";
import Contact from "./component/contact/Contact";
import Documentation from "./component/documentation/Documentation";
import UserList from "./views/UserList";

import TrainerList from './component/master_data/Trainer/Trainer';
import TrainerAdd from './component/master_data/Trainer/TrainerAdd';
import TrainerEdit from './component/master_data/Trainer/TrainerEdit';
import TrainerDelete from './component/master_data/Trainer/TrainerDelete';

import DataMahasiswa from './component/master_data/Mahasiswa/Mahasiswa';
import DataMahasiswaAdd from './component/master_data/Mahasiswa/MahasiswaAdd';
import DataMahasiswaEdit from './component/master_data/Mahasiswa/MahasiswaEdit';
import DataMahasiswaDelete from './component/master_data/Mahasiswa/MahasiswaDelete';

import DataUser from './component/master_data/users/User';
import DataUserAdd from './component/master_data/users/UserAdd';
import DataUserEdit from './component/master_data/users/UserEdit';
import DataUserDelete from './component/master_data/users/UserDelete';

import DataProduk from './component/master_data/Produk/Produk';
import DataProdukAdd from './component/master_data/Produk/ProdukAdd';
import DataProdukEdit from './component/master_data/Produk/ProdukEdit';
import DataProdukDelete from './component/master_data/Produk/ProdukDelete';

import DataPelanggan from "./component/master_data/pelanggan/Pelanggan";
import PelangganAdd from "./component/master_data/pelanggan/PelangganAdd";
import PelangganEdit from "./component/master_data/pelanggan/PelangganEdit";
import PelangganDelete from "./component/master_data/pelanggan/PelangganDelete";

import DataTransaksi from './component/master_data/Transaksi/Transaksi';
import DataTransaksiAdd from './component/master_data/Transaksi/TransaksiAdd';




function App() {
  return (
    <Router>
      <div className="app-header">
        <Menu />
      </div>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/userlist" element={<UserList />} />

          <Route path="/trainerlist" element={<TrainerList />} />
          <Route path="/trainer_add" element={<TrainerAdd />} />
          <Route path="/trainer_edit/:id" element={<TrainerEdit />} />
          <Route path="/trainer_delete/:id" element={<TrainerDelete />} />

          <Route path="/datamahasiswa" element={<DataMahasiswa />} />
          <Route path="/datamahasiswa_add" element={<DataMahasiswaAdd />} />
          <Route path="/datamahasiswa_edit/:id" element={<DataMahasiswaEdit />} />
          <Route path="/datamahasiswa_delete/:id" element={<DataMahasiswaDelete />} />

          <Route path="/datauser" element={<DataUser />} />
          <Route path="/datauser_add" element={<DataUserAdd />} />
          <Route path="/datauser_edit/:id" element={<DataUserEdit />} />
          <Route path="/datauser_delete/:id" element={<DataUserDelete />} />

          <Route path="/dataproduk" element={<DataProduk />} />
          <Route path="/dataproduk_add" element={<DataProdukAdd />} />
          <Route path="/dataproduk_edit/:id" element={<DataProdukEdit />} />
          <Route path="/dataproduk_delete/:id" element={<DataProdukDelete />} />

          <Route path="/datapelanggan" element={<DataPelanggan />} />
          <Route path="/datapelanggan_add" element={<PelangganAdd/>} />
          <Route path="/datapelanggan_edit/:id" element={<PelangganEdit/>} />
          <Route path="/datapelanggan_delete/:id" element={<PelangganDelete/>} />

          <Route path="/datatransaksi" element={<DataTransaksi />} />
          <Route path="/datatransaksi_add" element={<DataTransaksiAdd />} />
        </Routes>
      </div>
    </Router> 
     
      
  );
}

export default App;
