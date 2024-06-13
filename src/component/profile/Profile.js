import React, { Component } from "react";
import './Profile.css';

class Profile extends Component {
    render() {
        return (
            <div className="card">
                <div className="container">
                    <div className="Title">
                        Profile
                    </div>
                    <div className="content">
                        <b>Belajar React JS</b><br />
                        <p>Membuat Website Sederhana dengan React JS</p>
                    </div>
                    <div className="content">
                        <h2>Biodata</h2>
                        <table>
                            <tr>
                                <td>Nama</td>
                                <td>: Muhammad Fauzi Fadillah</td>
                            </tr>
                            <tr>
                                <td>Alamat</td>
                                <td>: Malang</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>: fauzii7798@gmail.com</td>
                            </tr>
                            <tr>
                                <td>Insitusi Pendidikan Terakhir</td>
                                <td>: SMK Brantas Karangkates</td>
                            </tr>
                            <tr>
                                <td>Cita-cita</td>
                                <td>: Back-End Developer</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;    