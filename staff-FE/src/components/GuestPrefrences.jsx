import React from "react";

export default function GuestPreference(props) {
  return (
    <div className="Booking-Container" style={{
      position: 'relative', // Remove absolute positioning
      zIndex: '0',
      padding: '20px',
      margin:"0px",
      maxWidth: '800px'
    }}>
      <h2>Current Booking</h2>
      <div className="room-details" style={{
            display:"grid", gridTemplateColumns:"1fr 1fr 1fr", 
            gridTemplateRows:"1fr 1fr", 
            gap:"10px", 
            textAlign:"center", border:"1px solid black", borderRadius:"10px", boxShadow:"0 0 20px 10px rgba(0, 0, 0, 0.1)"}}>
        
          <div>
            <p>Room Number</p>
            <p>504</p>
          </div>
          <div>
            <p>Room Number</p>
            <p>504</p>
          </div>
          <div>
            <p>Room Number</p>
            <p>504</p>
          </div>
          <div>
            <p>Room Number</p>
            <p>504</p>
          </div>
        </div>
      </div>
    
  );
}