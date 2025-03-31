import React from "react";
import phone from "../assets/phone.svg";
import passport from "../assets/passport.svg";
import email from "../assets/email.svg";
import location from "../assets/location.svg";
import country from "../assets/country.svg";
import './Contact.css';

export default function Contact(props) {
    return (
        <div className="Contact-Container">
            <div className="inner-Container">
                <h1>Contact Information</h1>

                <div className="phone-container">
                    <img src={phone} alt="Phone" style={{ marginRight: "8px" }} />
                    <span className="phone-number">{props.data.contact_information.phone}</span>
                </div>

                <div className="phone-container">
                    <img src={location} alt="Location" style={{ marginRight: "8px" }} />
                    <span className="phone-number">
                        {props.data.contact_information.address.street}, {props.data.contact_information.address.city}
                    </span>
                </div>

                <div className="phone-container">
                    <img src={country} alt="Country" style={{ marginRight: "8px" }} />
                    <span className="phone-number">{props.data.contact_information.address.country}</span>
                </div>

                <div className="phone-container">
                    <img src={passport} alt="Passport" style={{ marginRight: "8px" }} />
                    <span className="phone-number">{props.data.contact_information.passport}</span>
                </div>
            </div>
        </div>
    );
}
