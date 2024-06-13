import './User.css';
import axios from 'axios';
import React from 'react';

function UserAdd() {
    const [formValue, setformValue] = React.useState({
        
        nama: '',
        // email: '',
        alamat: '',
        role: ''
    });

    const handleChange = (event) => {
        setformValue({
        ...formValue,
        [event.target.name]: event.target.value
    });
    }

    const handleSubmit = async() => {
        const FormDataInput = new FormData();
        
        FormDataInput.append("nama", formValue.nama)
        // FormDataInput.append("email", formValue.email)
        FormDataInput.append("alamat", formValue.alamat)
        FormDataInput.append("role", formValue.role)
        alert('Data User berhasil ditambahkan')
        try {
            const response = await axios({
                method: "POST",
                url: "https://localhost:7091/api/Users/insertUser",
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
                    Tambah User
                </div>
                <div className="conten">
                    <form onSubmit={handleSubmit}>
                    
                    <input
                        type="text"
                        name="nama"
                        placeholder="enter a Nama"
                        value={formValue.nama}
                        onChange={handleChange}
                    /><br/><br/>
                    <input
                        type="text"
                        name="alamat"
                        placeholder="enter a Alamat"
                        value={formValue.alamat}
                        onChange={handleChange}
                    /><br/><br/>
                    <input
                        type="text"
                        name="role"
                        placeholder="enter a Role"
                        value={formValue.role}
                        onChange={handleChange}
                    /><br/><br/>
                    <button type="submit" className='btn btn-primary'>Simpan</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserAdd;