import React, { useState, useEffect } from "react";
import "./Transaksi.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function DataTransaksi() {
  //define state
  const [datatransaksi, setDataTransaksi] = useState([]);
  //useEffect hook
  useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);
  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get(
      "https://localhost:7091/api/Transaksi"
    );
    //get response data
    const data = await response.data;
    //assign response data to state "datatransaksi"
    setDataTransaksi(data);
    console.log(data);
  };
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
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
        name: "Jumlah",
        selector: (row) => row.jumlah,
        sortable: true,
    },
    {
        name: "Harga Total",
        selector: (row) => row.harga_total,
        sortable: true,
    },
    {
        name: "Id User",
        selector: (row) => row.id_user,
        sortable: true,
    },
    {
      name: "Tanggal dibuat",
      selector: (row) => formatDate(row.created_at),
      sortable: true,
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
        <div className="Titel">Data Transaksi</div>
        <div className="conten">
          <Link to="/datatransaksi_add" className="btn btn-primary">
            + Data Transaksi
          </Link>
          <DataTable columns={columns} data={datatransaksi.data} pagination />
        </div>
      </div>
    </div>
  );
}
export default DataTransaksi;
