import React, { Component } from "react";
import './Contact.css';

class Contact extends Component {
    render() {
        return (
            <div className="card">
                <div className="container">
                    <div className="Title">
                        Contact
                    </div>
                    <div className="content">
                        <b>Developer :</b> Muhammad Fauzi Fadillah <br />
                        <b>Email :</b> <a href="mailto:fauzii7798@gmail.com">fauzii7798@gmail.com</a> <br />

                        <b>Referensi :</b> <a href="https://www.akscoding.com/" target="_blank" rel="noopener noreferrer">https://www.akscoding.com/</a><br />
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
