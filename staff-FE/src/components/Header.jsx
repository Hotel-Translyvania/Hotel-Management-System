import React from "react";
import logo from "../assets/logo.svg"

export default function Header(){

    return <div className="Header" style={{marginBottom:"10px"}}>
    
        <img src={logo}></img> <span style={{position:"relative", bottom:"20px", fontSize:"25Px", fontWeight:"bold", left:"10px"}}>Royal Hotel</span>
        
    </div>
}