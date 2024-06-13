import React, { useState, useEffect } from "react";
import "./Produk.css";
import axios from "axios";
import DataTable from "react-data-table-component";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function DataProduk() {
  //define state
  const [dataproduk, setDataProduk] = useState([]);
  //useEffect hook
  useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);
  
  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get(
      "https://localhost:7091/api/Produk"
    );

    //get response data
    const data = await response.data;

    //assign response data to state "dataproduk"
    setDataProduk(data);
    console.log(data);
  };

  useEffect(() => {
    console.log(dataproduk);
 }, [dataproduk]);

  const columns = [
    {
      name: "Id Produk",
      selector: (row) => row.id_produk,
      sortable: true,
    },
    {
      name: "Nama Produk",
      selector: (row) => row.nama_produk,
      sortable: true,
    },
    {
      name: "Harga Satuan",
      selector: (row) => row.harga_satuan,
      sortable: true,
    },
    {
      name: "Stok",
      selector: (row) => row.stok,
      sortable: true,
    },
    {
      name: "Tanggal dibuat",
      selector: (row) => formatDate(row.created_at),
      sortable: true,
    },
    {
      name: 'Ubah',
      selector: row => <Link to={"/dataproduk_edit/"+row.id_produk}
      className="btn btn-warning">Edit</Link>,
      sortable: true
    },
    {
      name: 'Hapus',
      selector: row => <Link to={"/dataproduk_delete/"+row.id_produk}
      className="btn btn-danger">Delete</Link>,
      sortable: true
    },
  ];

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  }

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Data Produk</div>
        <div className="conten">
          <Link to="/dataproduk_add" className="btn btn-primary">
            + Data Produk
          </Link>
          <DataTable 
          columns={columns} 
          data={dataproduk.data} 
          pagination />
        </div>
      </div>
    </div>
  );
  
}

export default DataProduk;
