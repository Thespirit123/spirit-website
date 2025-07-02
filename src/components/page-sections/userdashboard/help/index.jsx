import React, { useState } from "react";
// import './contact.css';


const Help = () =>{
    const [isChecked, setIsChecked] = useState(true);

    const isTicked = () =>{
        setIsChecked(false);
    }
    return(
        <div className="help" style={{paddingTop:"90px"}}>

            <div className="contact">
            <h1>Get in touch</h1>
            <div>If you have an query, please get in touch with us, we will revert back quickly.</div>
            </div>

            <div className="contact1">
            <div className="contact2">
                <div className="smsA">
                <div className='phone1'><div className='icon18'><svg className="device1" width="25" height="24" viewBox="0 0 24 24" fill="none">
<path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM12 13L4 8V18H20V8L12 13ZM12 11L20 6H4L12 11ZM4 8V6V18V8Z" fill="#008EA8" strokeWidth=''/>
</svg></div>

</div>        
                
                <div className="call">
                    <div className="bold">Email Us</div>
                    <div className="mail">Theespiritmedia@gmail.com</div>
                </div>
                </div>
            </div>

            <div className="contact2">
                <div className="smsA">
                <div className='phone1'><svg className="device1" width="25" height="24" viewBox="0 0 25 24" fill="none">
<path d="M22.4999 16.9201V19.9201C22.5011 20.1986 22.444 20.4743 22.3324 20.7294C22.2209 20.9846 22.0572 21.2137 21.852 21.402C21.6468 21.5902 21.4045 21.7336 21.1407 21.8228C20.8769 21.912 20.5973 21.9452 20.3199 21.9201C17.2428 21.5857 14.2869 20.5342 11.6899 18.8501C9.27376 17.3148 7.22527 15.2663 5.68993 12.8501C3.99991 10.2413 2.94818 7.27109 2.61993 4.1801C2.59494 3.90356 2.62781 3.62486 2.71643 3.36172C2.80506 3.09859 2.9475 2.85679 3.1347 2.65172C3.32189 2.44665 3.54974 2.28281 3.80372 2.17062C4.05771 2.05843 4.33227 2.00036 4.60993 2.0001H7.60993C8.09524 1.99532 8.56572 2.16718 8.93369 2.48363C9.30166 2.80008 9.54201 3.23954 9.60993 3.7201C9.73656 4.68016 9.97138 5.62282 10.3099 6.5301C10.4445 6.88802 10.4736 7.27701 10.3938 7.65098C10.3141 8.02494 10.1288 8.36821 9.85993 8.6401L8.58993 9.9101C10.0135 12.4136 12.0864 14.4865 14.5899 15.9101L15.8599 14.6401C16.1318 14.3712 16.4751 14.1859 16.8491 14.1062C17.223 14.0264 17.612 14.0556 17.9699 14.1901C18.8772 14.5286 19.8199 14.7635 20.7799 14.8901C21.2657 14.9586 21.7093 15.2033 22.0265 15.5776C22.3436 15.9519 22.5121 16.4297 22.4999 16.9201Z" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>        
                
                <div className="call">
                    <div className="bold">Call Us</div>
                    <div className="mail">09035745258</div>
                </div>
                </div>
            </div>
            </div>

        <div className="form3">
        <form action="" className="formControl">

            <div className="leave">
                <h2>Leave a message</h2>
                <p>Fill up form below, our team will get back soon</p>
            </div>

            <div className="formDetails">
                <input type='text' placeholder="Name" />
            </div>

            <div className="formDetails">
                <input type='email' placeholder="Email" />
            </div>

            <div className="formDetails">
                <input type='text' placeholder="Phone" />
            </div>

            <div className="formDoc">
            <textarea className="area" placeholder="Your message"/>
            </div>

            <div className="check">
                   
                    <input type="checkbox"  checked={isChecked} readOnly/>
                    <div className="agree">I agree to receive emails, newsletters, and promotional messages</div>
                </div>

            <div className="downline2 downline1">
                <div className="continue2"><a className="continue" href="">Send message</a></div>
            </div>
        </form>
        </div>

         <div style={{textAlign:"center", borderTop:"1px solid #8080802e", padding:"10px", fontSize:"12px",fontWeight:"400",color:"#00000070"}} className="MMe"> © 2025 Spirit Media. All Rights Reserved</div>
        </div>
    )
}

export default Help;