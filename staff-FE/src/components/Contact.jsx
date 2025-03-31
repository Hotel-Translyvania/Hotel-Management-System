import React from "react";
import phone from "../assets/phone.svg";
import './Contact.css';

export default function Contact(props){
    return <div className="Contact-Container">
    <div className="inner-Container">
        <h1>Contact information</h1>
        <span class="phone-container">
            <img src={phone} style={{height:"20px", margin:""}}></img>
            <span class="phone-number">0949115880</span>
        </span>
      
        </div>



    </div>
}
