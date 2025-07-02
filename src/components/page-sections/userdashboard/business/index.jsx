"use client";

import React from "react";
import './userdashboard.css';
// import Vendor from "./vendor";


const Business = () =>{

    return(
        <div className="feed">
            {/* <Vendor /> */}

            <div className="form1">
                <form className="formControl">
                <div className="number">
                        <div className="one first">1</div>
                        <div className="bord second"></div>
                        <div className="two third">2</div>
                        <div className="bord1 fourth"></div>
                        <div className="three fifth">3</div>
                    </div>

                <div className="icon">
                        <div><svg className="icon2" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M28 20C28 20.7072 27.719 21.3855 27.219 21.8856C26.7189 22.3857 26.0406 22.6667 25.3333 22.6667H9.33333L4 28V6.66667C4 5.95942 4.28095 5.28115 4.78105 4.78105C5.28115 4.28095 5.95942 4 6.66667 4H25.3333C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V20Z" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                        <div className="cont">Business Description</div>
                </div>

                <div className="formDoc">
                    <label>Tell us about your products or services</label>
                    <textarea className="area" placeholder="What makes your business unique? What products or services do you offer?" />
                </div>

                <div className="check">
                    <input type="checkbox" />
                    <div className="agree">I agree to the <span>Terms & Conditions</span> and <span>Privacy Policy</span>  *</div>
                </div>

                <div className="formDoc">
                    <div className="downline">
                    <div><a href="" className="back">Back</a></div>
                    <div className="continue2"><a className="continue" href="">Submit registration</a></div>
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

export default Business;