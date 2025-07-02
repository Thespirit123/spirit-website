"use client";

import React from "react";
// import './contact.css';


const Earnings = () =>{

    return(
        <div className="earn" style={{paddingTop:"70px"}}>
            <div className="mainearn">
            <div className="earns">Earnings</div>
            <div className="withdraw">Withdraw Earnings</div>
            </div>

            <div className='referral'>
                    <div className='totalref'>
                        <div className='refA'>Total Earnings</div>
                        <div className='ref1'>₦40,689</div>
                    </div>

                    <div className='totalref'>
                        <div className='refA'>Available Balance</div>
                        <div className='ref1'>₦8,689</div>
                    </div>

                    <div className='totalref'>
                        <div className='refA'>Pending</div>
                        <div className='ref3'>₦8,689</div>
                    </div>

                    <div className='totalref'>
                        <div className='refA'>Total Withdrawn</div>
                        <div className='ref1'>₦8,689</div>
                    </div>

                </div>

                <div className="time1">
                    <div className="alltime1">
                        <div className="alltime">
                            <div>All Time</div>
                            <div className="icon19"><svg className="" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg></div>
                        </div>
                    </div>

                    <div className="alltime1">
                        <div className="alltime">
                            <div>All Service</div>
                            <div className="icon19"><svg className="" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg></div>
                        </div>
                    </div>
                    
                        
                </div>

                <div className="tableview1">
                <div className="tableview2">
                <div className='table4'>
                <div className='tableB'>
                        <div className='data'>Description</div>
                        <div className='data'>Service</div>
                        <div className='data'>Amount</div>
                        <div className='data'>Date</div>
                        <div className='data data3'>Status</div>
                    </div>

                    <div className='table5'>
                        <div className='name1'>Commission from Brooks</div>
                        <div className='airtime'>Airtime</div>
                        <div className='amount'>₦50.00</div>
                        <div className='date'>14th Feb, 2024</div>
                        <div className='completed data3'><span className="completed1">completed</span></div> 
                    </div>

                    <div className='table5'>
                        <div className='name1'>Commission from Pearson</div>
                        <div className='airtime'>Spy App</div>
                        <div className='amount'>₦1,530.00</div>
                        <div className='date'>14th Feb, 2024</div>
                        <div className='process data3'><span className="process1">processing</span></div> 
                    </div>

                    <div className='table5'>
                        <div className='name1'>Withdrawal to Bank Account</div>
                        <div className='airtime'>Bank Transfer</div>
                        <div className='amount'>₦5,000.00</div>
                        <div className='date'>13th Feb, 2024</div>
                        <div className='completed data3'><span className="completed1">completed</span></div> 
                    </div>
                </div>
                </div>
                </div>

                 <div style={{textAlign:"center", borderTop:"1px solid #8080802e", padding:"10px", fontSize:"12px",fontWeight:"400",color:"#00000070"}} className="MMe"> © 2025 Spirit Media. All Rights Reserved</div>

        </div>
    )
}

export default Earnings;
