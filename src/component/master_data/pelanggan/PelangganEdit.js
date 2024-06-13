import './Pelanggan.css';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

function PelangganEdit() {
    const { id } = useParams();

    const [formValue, setformValue] = React.useState({
        
        nama_pelanggan: '',
        email: '',
        alamat: ''

    });

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await axios.get('https://localhost:7091/api/Pelanggan/GetPelangganById?id_pelanggan='+id);
            //get response data
            const data = await response.data.data[0];
            //assign response data to state "formValue"
            setformValue(data); 
            console.log(data);
        } catch(error) {
            console.log(error) 
            console.log(error)
            alert('Data tidak ditemukan atau sudah dihapus!!')
        }
    }

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }
    
    const handleSubmit = async() => {
        const FormDataInput = new FormData();
        
        FormDataInput.append("nama_pelanggan", formValue.nama_pelanggan)
        FormDataInput.append("email", formValue.email)
        FormDataInput.append("alamat", formValue.alamat)
        alert('Data Pelanggan berhasil diubah!!')
        try {
            const response = await axios({
                method: "PUT",
                url: "https://localhost:7091/api/Pelanggan/updatePelanggan"+id,
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
                    Edit Data Pelanggan
                </div>
                <div className="conten">
                    <form onSubmit={handleSubmit}>
                    
                    <input
                        type="text"
                        name="nama_pelanggan"
                        placeholder="enter a Nama Pelanggan"
                        value={formValue.nama_pelanggan}
                        onChange={handleChange}
                    /><br/><br/>
                    <input
                        type="text"
                        name="email"
                        placeholder="enter a Alamat"
                        value={formValue.email}
                        onChange={handleChange}
                    /><br/><br/>
                    <input
                        type="text"
                        name="alamat"
                        placeholder="enter a Role"
                        value={formValue.alamat}
                        onChange={handleChange}
                    /><br/><br/>
                    <button type="submit" className='btn btn-primary'>Simpan</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PelangganEdit;