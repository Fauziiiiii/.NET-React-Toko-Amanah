import React, { Component } from "react";
import DataTable from "react-data-table-component";

const columns = [
    {
        name: 'Owner',
        selector: row => row.owner,
        sortable: true,
    },
    {
        name: 'Alamat',
        selector: row => row.alamat,
        sortable: true,
    },
];

const data = [
    {
        id: 1,
        owner: 'Akscoding',
        alamat: 'Yogyakarta',
    },
    {
        id: 1,
        owner: 'Indra',
        alamat: 'Banyumas',
    },
];

class DataOwner extends Component {
    render() {
        return (
            <DataTable
            columns={columns}
            data={data}
            />
        );
    }
}

export default DataOwner;

