import Contact from "./Contact";
import Guest from "./Guest";
import React from "react";

export default function SideBar(props) {
  return (
    <div className="SideBar-Container" style={{
      display: props.isMobile ? "none" : "flex",
      flexDirection: 'column',
      position: 'sticky',
      top: '0',
      height: '100vh',
      backgroundColor: "#fff",
      borderRight: '1px solid #eee',
    
      overflowY: 'auto',
      padding: '1.5rem',
      width: '80%',
     
    }}>
      <Guest data={props.guestData}/>
      <Contact data={props.contactInfo} />
    </div>
  );
}