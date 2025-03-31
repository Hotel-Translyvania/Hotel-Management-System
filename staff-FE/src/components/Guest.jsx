import React, { useState, useEffect } from 'react';
import './GuestProfile.css';  
import guestImage from '../assets/img.jpg';
export default function GuestProfile(props) {
 console.log(`this is ${props.image}`);
  return (
    <div className="guest-profile-container">
    <div className="guest-image"><img src={props.data.image} alt="Guest"  /></div>
      <div className="guest-header">
        <h1>{props.data.fname}  {props.data.lname}</h1>
        <p className="guest-id">Guest ID: {props.data.id}</p>
      </div>
      
      <div className="guest-status">
        <span className="status-badge">
          {props.data.active === true ? (
            <span className="status-active">Active</span>
          ) : (
            <span className="status-inactive">Inactive</span>
          )}
        </span>
      </div>
      
      <div className="divider"></div>
      
      <div className="guest-actions">
        <button className="action-button edit-button">Edit Profile</button>
        <a href='./check'><button className="action-button checkout-button">Check-out</button></a>  {/* This sends the user to Check-out page */}
        
      </div>
    </div>
  );
};
