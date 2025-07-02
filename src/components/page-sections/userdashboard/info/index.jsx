"use client";
import React, { useState } from "react";
import './contact.css';
import Vendor from "./vendor";



const Info = () =>{
    const [update, setUpdate] = useState('');

    const Update = ()=>{

        return(
            window.alert('Coming soon!')
        )
    }

    return(
        <div className="feed">
            <Vendor />

        <div className="form2">
            <form className="formControl">

            <div className="numbers">
                        <div className="one">1</div>
                        <div className="bord color1"></div>
                        <div className="two color2">2</div>
                        <div className="bord1 color3"></div>
                        <div className="three color4">3</div>
                    </div>

            <div className="icon">
                
                <div className="icon1"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" >
<path d="M8 29.3337V5.33366C8 4.62641 8.28095 3.94814 8.78105 3.44804C9.28115 2.94794 9.95942 2.66699 10.6667 2.66699H21.3333C22.0406 2.66699 22.7189 2.94794 23.219 3.44804C23.719 3.94814 24 4.62641 24 5.33366V29.3337H8Z" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.00008 16H5.33341C4.62617 16 3.94789 16.281 3.4478 16.781C2.9477 17.2811 2.66675 17.9594 2.66675 18.6667V26.6667C2.66675 27.3739 2.9477 28.0522 3.4478 28.5523C3.94789 29.0524 4.62617 29.3333 5.33341 29.3333H8.00008" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M24 12H26.6667C27.3739 12 28.0522 12.281 28.5523 12.781C29.0524 13.2811 29.3333 13.9594 29.3333 14.6667V26.6667C29.3333 27.3739 29.0524 28.0522 28.5523 28.5523C28.0522 29.0524 27.3739 29.3333 26.6667 29.3333H24" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.3333 8H18.6666" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.3333 13.333H18.6666" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.3333 18.667H18.6666" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.3333 24H18.6666" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                <div className="cont">Business Information</div>
                </div>

            <div className="formDetails formDoc1">
                    <label>Business Name*</label>
                    <input type="text" placeholder="Enter your business name" />
            </div>

            <div className="formDetails formDoc1">
                    <label>Business Type*</label>
                    <select className="opt">
                        <option className="">Select your business type</option>
                    </select>
            </div>

            <div className="formDetails formDoc">
                    <div className="downline downline1">
                    <div className="continue1"><a className="continue" href="" onClick={()=> setUpdate(Update)}>Continue</a></div>
                    </div>
                </div>
            </form>

            <div className="copyright1">
            <p>&copy; 2025 <span>Spirit Media, All Right Reserved.</span></p>
            </div>
        </div>
        </div>
    )
}

export default Info;