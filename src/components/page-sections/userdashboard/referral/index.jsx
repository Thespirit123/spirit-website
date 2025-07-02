"use client";

import React from 'react';
// import './contact.css';


const Referrals = () =>{

    return(
        <div className='refer' style={{paddingTop:"95px"}}>
                <div className='referr'>Referrals</div>

                <div className='border2'>
                <div className='border1'>
                    <div className='refcode'>Your referral link</div>
                    
                    <div className='refcode2'>
                        <div className='refcode1'>SPIRITHQ-JD-2232</div>
                        
                        <div className='refcode3'>
                            <div><svg width="17" height="16" viewBox="0 0 17 16" fill="none" >
<g clipPath="url(#clip0_713_2677)">
<path d="M14.1146 5.33301H7.44796C6.71158 5.33301 6.11462 5.92996 6.11462 6.66634V13.333C6.11462 14.0694 6.71158 14.6663 7.44796 14.6663H14.1146C14.851 14.6663 15.448 14.0694 15.448 13.333V6.66634C15.448 5.92996 14.851 5.33301 14.1146 5.33301Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.44796 10.6663C2.71462 10.6663 2.11462 10.0663 2.11462 9.33301V2.66634C2.11462 1.93301 2.71462 1.33301 3.44796 1.33301H10.1146C10.848 1.33301 11.448 1.93301 11.448 2.66634" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_713_2677">
<rect width="16" height="16" fill="white" transform="translate(0.78125)"/>
</clipPath>
</defs>
</svg>
</div>
                            <div className='refcode4'>
                            <div className='icon4'><svg className='share1' width='15' height='20' viewBox="0 0 448 512"><path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" fill='#fff'/></svg></div>
                            {/* <div className='icon4'><FontAwesomeIcon className='icon6' icon={faShareNodes} /></div> */}
                            <div className='share'>Share</div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div className='referral'>
                    <div className='totalref'>
                        <div className='refA'>Your Referrals</div>
                        <div className='ref1'>12</div>
                    </div>

                    <div className='totalref'>
                        <div className='refA'>Active Referrals</div>
                        <div className='ref1'>8</div>
                    </div>

                    <div className='totalref'>
                        <div className='refA'>Total Earnings</div>
                        <div className='ref3'>₦40,689</div>
                    </div>

                    <div className='totalref'>
                        <div className='refA'>Pending Commissions</div>
                        <div className='ref1'>₦8,689</div>
                    </div>

                </div>

                <div className='view'>
                <div className='recent'>Recent Referrals</div>
                <div><a className='viewall' href="">View all</a></div>
                </div>

                <div className='tableview1'>
                <div className='tableview2'>
                    <div className='table1'>
                        <div className='data'>Name</div>
                        <div className='data'>Service</div>
                        <div className='data'>Amount</div>
                        <div className='data'>Date</div>
                        <div className='data data3'>Status</div>
                    </div>

                <div className='table2'>
                    <div className='table3'>
                        <div className='name'>Christine Brooks</div>
                        <div className='airtime'>Airtime</div>
                        <div className='amount'>₦50.00</div>
                        <div className='date'>14th Feb, 2024</div>
                        <div className='completed data3'><span className='completed1'>completed</span></div> 
                    </div>

                    <div className='table3'>
                        <div className='name'>Christine Brooks</div>
                        <div className='airtime'>Spy App</div>
                        <div className='amount'>₦1,530.00</div>
                        <div className='date'>14th Feb, 2024</div>
                        <div className='process data3'><span className='process1'>processing</span></div> 
                    </div>

                    <div className='table3'>
                        <div className='name'>Christine Brooks</div>
                        <div className='airtime'>Movies App</div>
                        <div className='amount'>₦3,650.00</div>
                        <div className='date'>14th Feb, 2024</div>
                        <div className='completed data3'><span className='completed1'>completed</span></div> 
                    </div>
                </div>
                </div>
                </div>

                <div style={{textAlign:"center", borderTop:"1px solid #8080802e", padding:"10px", fontSize:"12px",fontWeight:"400",color:"#00000070"}} className="MMe"> © 2025 Spirit Media. All Rights Reserved</div>
            </div>
    )
}

export default Referrals;