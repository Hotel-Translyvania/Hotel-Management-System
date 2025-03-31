import React from "react";
import './GuestProfile.css';

export default function GuestProfile(props) {
  return (
    <div className="guest-profile-container">
      <div className="guest-image">
        <img src={props.data.image} alt="Guest" />
      </div>

      <div className="guest-header">
        <h1>{props.data.fname} {props.data.lname}</h1>
        <p className="guest-id">Guest ID: {props.data.id}</p>
      </div>

      <div className="guest-status">
        <span className={`status-badge ${props.data.active ? "status-active" : "status-inactive"}`}>
          {props.data.active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="divider"></div>

      <div className="guest-actions">
        <button className="action-button edit-button">Edit Profile</button>
        <a href="./check">
          <button className="action-button checkout-button">Check-out</button>
        </a>
      </div>
    </div>
  );
}
