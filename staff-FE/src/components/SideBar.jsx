import Contact from "./Contact";
import Guest from "./Guest";
import React from "react";

export default function SideBar(props) {
  console.log(props)
  return (
    <div className="SideBar-Container" style={{
      display: props.isMobile ? "none" : "flex",
      flexDirection: 'column',
      position: 'sticky',
      top: '0',
      height: '100vh',
      backgroundColor: "#fff",
      borderRight: '1px solid #eee',
      overflow: 'auto' 
    }}>
      <Guest data = {props.guestData} isMobile={props.isMobile}/>
      <Contact data = {props.contactInfo} />
    </div>
  );
}