import React, { Component } from "react";
import './Documentation.css';
import docImg from './documentation.png';

class Documentaion extends Component {
    render() {
        return (
            <div className="card">
                <div className="container">
                    <div className="Title">
                        Documentation
                    </div>
                    <div className="content">
                        <img src={docImg} className="document-img"></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default Documentaion;