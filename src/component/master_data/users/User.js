import React, { useState, useEffect} from 'react';
import'./User.css';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

function DataUser() {
    const [datauser, setDatauser] = useState([]);

     //useEffect hook
     useEffect(() => {
        //panggil method "fetchData"
        fectData();
    }, []);

    //function "fetchData"
    const fectData = async () => {
        //fetching
        const response = await axios.get('https://localhost:7091/api/Users');
        //get response data
        const data = await response.data;
        
        //assign response data to state "datamahasiswa"
        setDatauser(data);
        console.log(data);
    }

    const columns = [{
        name: 'ID',
        selector: row => row.id_user,
        sortable: true
    },
    {
        name: 'Nama',
        selector: row => row.nama,
        sortable: true
    },
    // {
    //     name: 'Email',
    //     selector: row => row.email,
    //     sortable: true
    // },
    // {
    //     name: 'Password',
    //     selector: row => row.password,
    //     sortable: true
    // },
    {
        name: 'Alamat',
        selector: row => row.alamat,
        sortable: true
    },
    {
        name: 'Role',
        selector: row => row.role,
        sortable: true
    },
    {
        name: 'Ubah',
        selector: row => <Link to ={"/datauser_edit/"+row.id_user} className="btn btn-warning">Edit</Link>,
        sortable: true
    },
    {
        name: 'Hapus',
        selector: row => <Link to ={"/datauser_delete/"+row.id_user} className="btn btn-danger">Delete</Link>,
        sortable: true
    },
];

    return (
        <div className="card">
            <div className="container">
                <div className="Titel">
                    Data User
                </div>
                <div className="conten">
                    <Link to="/datauser_add" className="btn btn-primary">+ Data User</Link>
                    <DataTable
                    columns={columns}
                    data={datauser.data}
                    pagination/>
                </div>
            </div>
        </div>
    );

}

export default DataUser;