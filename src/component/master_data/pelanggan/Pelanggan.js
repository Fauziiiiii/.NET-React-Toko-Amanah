import React, { useState, useEffect} from 'react';
import'./Pelanggan.css';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

function DataPelanggan() {
    const [datapelanggan, setDatapelanggan] = useState([]);

    //useEffect hook
    useEffect(() => {
       //panggil method "fetchData"
       fectData();
   }, []);
   
   //function "fetchData"
   const fectData = async () => {
    //fetching
    const response = await axios.get('https://localhost:7091/api/Pelanggan');
    //get response data
    const data = await response.data;
    
    //assign response data to state "datamahasiswa"
    setDatapelanggan(data);
    console.log(data);
}

    const columns = [{
        name: 'ID',
        selector: row => row.id_pelanggan,
        sortable: true
    },
    {
        name: 'Nama Pelanggan',
        selector: row => row.nama_pelanggan,
        sortable: true
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true
    },
    {
        name: 'Alamat',
        selector: row => row.alamat,
        sortable: true
    },
    {
        name: 'Ubah',
        selector: row => <Link to ={"/datapelanggan_edit/"+row.id_pelanggan} className="btn btn-warning">Edit</Link>,
        sortable: true
    },
    {
        name: 'Hapus',
        selector: row => <Link to ={"/datapelanggan_delete/"+row.id_pelanggan} className="btn btn-danger">Delete</Link>,
        sortable: true
    },
];

    return (
        <div className="card">
            <div className="container">
                <div className="Titel">
                    Data Pelanggan
                </div>
                <div className="conten">
                    <Link to="/datapelanggan_add" className="btn btn-primary">+ Data User</Link>
                    <DataTable
                    columns={columns}
                    data={datapelanggan.data}
                    pagination/>
                </div>
            </div>
        </div>
    );
}

export default DataPelanggan;