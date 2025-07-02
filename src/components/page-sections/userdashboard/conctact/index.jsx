"use client";
import React from "react";
import './contact.css';
import Vendor from './vendor'



const Contact = () =>{

    return(
        <div className="feed">
            <Vendor />
            
            <div className="form">
                <form className="formControl">

                    <div className="numbers">
                        <div className="one">1</div>
                        <div className="bord"></div>
                        <div className="two">2</div>
                        <div className="bord1"></div>
                        <div className="three">3</div>
                    </div>
 
                <div className="icon">
                    <div className="icon1"><svg className="icon2" width="32" height="32" viewBox="0 0 32 32" fill="none" >
<path d="M25.3334 28V25.3333C25.3334 23.9188 24.7715 22.5623 23.7713 21.5621C22.7711 20.5619 21.4146 20 20.0001 20H12.0001C10.5856 20 9.22904 20.5619 8.22884 21.5621C7.22865 22.5623 6.66675 23.9188 6.66675 25.3333V28" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.0001 14.6667C18.9456 14.6667 21.3334 12.2789 21.3334 9.33333C21.3334 6.38781 18.9456 4 16.0001 4C13.0546 4 10.6667 6.38781 10.6667 9.33333C10.6667 12.2789 13.0546 14.6667 16.0001 14.6667Z" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                    {/* <div className="icon1"><FontAwesomeIcon className="icon2" icon={faAddressBook} /></div> */}
                    <div className="cont">Contact Information</div>
                </div>

                <div className="formDetails">
                    <label>Contact Person's Name*</label> <br />
                    <input type="text" placeholder="Enter contact person's name" />
                </div>

                <div className="formDetails">
                    <label id="header">Email Address*</label> <br />
                    <input type="email" placeholder="Enter your email address" />
                </div>

                <div className="formDetails">
                    <label>Phone Number*</label> <br />
                    <input type="text" placeholder="Enter your phone number" />
                </div>

                <div className="formDetails">
                    <div className="downline">
                    <div><a href="" className="back">Back</a></div>
                    <div className="continue1"><a className="continue" href="">Continue</a></div>
                    </div>
                </div>
                </form>
            </div>

            <div className="copyright">
            <p>&copy; 2025 <span>Spirit Media, All Right Reserved.</span></p>
            </div>
        </div>
    )
}

export default Contact;