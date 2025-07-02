"use Client"

import React, { useState } from 'react';
// import './contact.css';


const Overview = () =>{
const [section, setSection] = useState('Overview');
const [show,setShow] = useState(false)


const [form, setForm] = useState({ name: '', email: '', phone: '', file: "" });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value});
  };

    return(
            <div className='over'>
                {/* <div>
                    <div>
                        <div>Wallet Balance</div>
                        <div></div>
                    </div>
                    <div><input type="number" readOnly value="#0"/></div>
                    <div>Addd Fund</div>

                </div> */}
            <div className="referr">Overview</div>
                 <div className="virtual3 MMe" style={{height:"auto"}}>
                        <div className="virtual1">
                        <div className="bal">Your balance</div>
                        <div className="bal1">₦200,000.00</div>
                        </div>

                        <div className="virtual4">
                        <div className="virtual8">
                        <div className="icon20"><svg className="virtual5" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" fill="#008EA8"/></svg></div>
                        </div>
                        <div className="add" onClick={()=>setShow(!show)}>Add funds</div>
                        </div>
                        </div>

            <div className='wallet'>
                <div className='wallet1'>
                    <div className='wallet2'>
                        <div className='icon4'><svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M19 7V4C19 3.73478 18.8946 3.48043 18.7071 3.29289C18.5196 3.10536 18.2652 3 18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5C3 5.53043 3.21071 6.03914 3.58579 6.41421C3.96086 6.78929 4.46957 7 5 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V12M21 12H18C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 14.5304 16.2107 15.0391 16.5858 15.4142C16.9609 15.7893 17.4696 16 18 16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V16" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                    {/* <div className='icon9'><img className='icon8' src={wallet} alt='' /></div> */}
                        <div>
                            <div className='total'>Total Earnings</div>
                            <div className='ref1'>₦40,689</div>
                        </div>
                    </div>

                    <div className='wallet3'>
                    <div className='wallet4'><a className='wallet5' href="">View details</a></div>
                    </div>
                </div>

                <div className='wallet1'>
                    <div className='wallet2'>
                        <div className='icon4'><svg width="25" height="24" viewBox="0 0 25 24" fill="none" >
<path d="M22.75 7L14.25 15.5L9.25 10.5L2.75 17" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.75 7H22.75V13" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                    {/* <div className='icon9'><img className='icon8' src={wallet} alt='' /></div> */}
                        <div>
                            <div className='total'>Monthly Earnings</div>
                            <div className='ref1'>₦10,009</div>
                        </div>
                    </div>

                    <div className='wallet3'>
                    <div className='wallet4'><a className='wallet5' href="">View details</a></div>
                    </div>
                </div>

                <div className='wallet1'>
                    <div className='wallet2'>
                        <div className='icon4'><svg width="25" height="24" viewBox="0 0 25 24" fill="none">
<path d="M22.4999 16.9201V19.9201C22.5011 20.1986 22.444 20.4743 22.3324 20.7294C22.2209 20.9846 22.0572 21.2137 21.852 21.402C21.6468 21.5902 21.4045 21.7336 21.1407 21.8228C20.8769 21.912 20.5973 21.9452 20.3199 21.9201C17.2428 21.5857 14.2869 20.5342 11.6899 18.8501C9.27376 17.3148 7.22527 15.2663 5.68993 12.8501C3.99991 10.2413 2.94818 7.27109 2.61993 4.1801C2.59494 3.90356 2.62781 3.62486 2.71643 3.36172C2.80506 3.09859 2.9475 2.85679 3.1347 2.65172C3.32189 2.44665 3.54974 2.28281 3.80372 2.17062C4.05771 2.05843 4.33227 2.00036 4.60993 2.0001H7.60993C8.09524 1.99532 8.56572 2.16718 8.93369 2.48363C9.30166 2.80008 9.54201 3.23954 9.60993 3.7201C9.73656 4.68016 9.97138 5.62282 10.3099 6.5301C10.4445 6.88802 10.4736 7.27701 10.3938 7.65098C10.3141 8.02494 10.1288 8.36821 9.85993 8.6401L8.58993 9.9101C10.0135 12.4136 12.0864 14.4865 14.5899 15.9101L15.8599 14.6401C16.1318 14.3712 16.4751 14.1859 16.8491 14.1062C17.223 14.0264 17.612 14.0556 17.9699 14.1901C18.8772 14.5286 19.8199 14.7635 20.7799 14.8901C21.2657 14.9586 21.7093 15.2033 22.0265 15.5776C22.3436 15.9519 22.5121 16.4297 22.4999 16.9201Z" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                    {/* <div className='icon9'><img className='icon8' src={phone} alt='' /></div> */}
                        <div>
                            <div className='total'>Active Numbers</div>
                            <div className='ref1'>5</div>
                        </div>
                    </div>

                    <div className='wallet3'>
                    <div className='wallet4'><a className='wallet5' href="">View numbers</a></div>
                    </div>
                </div>

                <div className='wallet1'>
                    <div className='wallet2'>
                        <div className='icon4'><svg width="25" height="24" viewBox="0 0 25 24" fill="none" >
<path d="M16.25 21V19C16.25 17.9391 15.8286 16.9217 15.0784 16.1716C14.3283 15.4214 13.3109 15 12.25 15H6.25C5.18913 15 4.17172 15.4214 3.42157 16.1716C2.67143 16.9217 2.25 17.9391 2.25 19V21" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.25 11C11.4591 11 13.25 9.20914 13.25 7C13.25 4.79086 11.4591 3 9.25 3C7.04086 3 5.25 4.79086 5.25 7C5.25 9.20914 7.04086 11 9.25 11Z" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M22.25 20.9999V18.9999C22.2493 18.1136 21.9544 17.2527 21.4114 16.5522C20.8684 15.8517 20.1081 15.3515 19.25 15.1299" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.25 3.12988C17.1104 3.35018 17.873 3.85058 18.4176 4.55219C18.9622 5.2538 19.2578 6.11671 19.2578 7.00488C19.2578 7.89305 18.9622 8.75596 18.4176 9.45757C17.873 10.1592 17.1104 10.6596 16.25 10.8799" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                    {/* <div className='icon9'><img className='icon8' src={refer} alt='' /></div> */}
                        <div>
                            <div className='total'>Total Referrals</div>
                            <div className='ref1'>12</div>
                        </div>
                    </div>

                    <div className='wallet3'>
                    <div className='wallet4'><a className='wallet5' href="">View referrals</a></div>
                    </div>
                </div>
            </div>

            <div className='view1'>
                <div className='recent'>Recent Activity</div>
                <div><a className='viewall' href="">View all</a></div>
                </div>

            <div className='tableD'>
                <div className='table9'>
                    <div className="usa1">
                            <div className="foreign">
                                <div className='over1'><svg width="20" height="20" viewBox="0 0 20 20" fill="none">
<g clipPath="url(#clip0_713_2206)">
<path d="M18.3334 14.1004V16.6004C18.3344 16.8325 18.2868 17.0622 18.1939 17.2749C18.1009 17.4875 17.9645 17.6784 17.7935 17.8353C17.6225 17.9922 17.4206 18.1116 17.2007 18.186C16.9809 18.2603 16.7479 18.288 16.5168 18.2671C13.9525 17.9884 11.4893 17.1122 9.32511 15.7087C7.31163 14.4293 5.60455 12.7222 4.32511 10.7087C2.91676 8.53474 2.04031 6.05957 1.76677 3.48374C1.74595 3.2533 1.77334 3.02104 1.84719 2.80176C1.92105 2.58248 2.03975 2.38098 2.19575 2.21009C2.35174 2.0392 2.54161 1.90266 2.75327 1.80917C2.96492 1.71569 3.19372 1.66729 3.42511 1.66707H5.92511C6.32953 1.66309 6.7216 1.80631 7.02824 2.07002C7.33488 2.33373 7.53517 2.69995 7.59177 3.10041C7.69729 3.90046 7.89298 4.68601 8.17511 5.44207C8.28723 5.74034 8.31149 6.0645 8.24503 6.37614C8.17857 6.68778 8.02416 6.97383 7.80011 7.20041L6.74177 8.25874C7.92807 10.345 9.65549 12.0724 11.7418 13.2587L12.8001 12.2004C13.0267 11.9764 13.3127 11.8219 13.6244 11.7555C13.936 11.689 14.2602 11.7133 14.5584 11.8254C15.3145 12.1075 16.1001 12.3032 16.9001 12.4087C17.3049 12.4658 17.6746 12.6697 17.9389 12.9817C18.2032 13.2936 18.3436 13.6917 18.3334 14.1004Z" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_713_2206">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

                                    <div></div>
                                {/* <div className="icon9"><img className='icon8' src={phone} alt="" /></div> */}
                               <div className='newnum'>+1 (234) 567-8901</div>
                               </div>

                               <div className="newAmount">
                                <div className='amt'>Amount</div>
                                <div className='amt'>#2,500</div>
                               </div>
                            </div>

                    <div className='completed4'>
                            <div className="completed2">completed</div>
                            <div className='newA'>14 Feb 2024</div>
                            </div>
                        </div>
                    </div>

                    <div className='table9'>
                    <div className="usa1">
                            <div className="foreign">
                                <div className='over1'>
                                    <div><svg width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.3571 13.4763C11.732 12.8512 10.8841 12.5 10.0001 12.5H5.00008C4.11603 12.5 3.26818 12.8512 2.64306 13.4763C2.01794 14.1014 1.66675 14.9493 1.66675 15.8333V17.5" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.50008 9.16667C9.34103 9.16667 10.8334 7.67428 10.8334 5.83333C10.8334 3.99238 9.34103 2.5 7.50008 2.5C5.65913 2.5 4.16675 3.99238 4.16675 5.83333C4.16675 7.67428 5.65913 9.16667 7.50008 9.16667Z" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.3333 17.5001V15.8334C18.3327 15.0948 18.0869 14.3774 17.6344 13.7937C17.1819 13.2099 16.5484 12.793 15.8333 12.6084" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.3333 2.6084C14.0503 2.79198 14.6858 3.20898 15.1396 3.79366C15.5935 4.37833 15.8398 5.09742 15.8398 5.83757C15.8398 6.57771 15.5935 7.2968 15.1396 7.88147C14.6858 8.46615 14.0503 8.88315 13.3333 9.06673" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                                {/* <div className="icon9"><img className='icon8' src={refer} alt="" /></div> */}
                               <div className='newnum'>Movie Portal App</div>
                               </div>

                               <div className="newAmount">
                                <div className='amt'>Amount</div>
                                <div className='amt'>#1,530</div>
                               </div>
                            </div>

                    <div className=''>
                            <div className="process2">processing</div>
                            <div className='newA'>14 Feb 2024</div>
                            </div>
                        </div>
                    </div>

                        
            </div>    

            <div className='quick'>Quick Actions</div>    

         
            <div className='phoneA'>
                <div className='phone'>
                    <div className='phone1'>
                    <div className='icon9'><svg width="25" height="24" viewBox="0 0 25 24" fill="none">
<path d="M22.4999 16.9201V19.9201C22.5011 20.1986 22.444 20.4743 22.3324 20.7294C22.2209 20.9846 22.0572 21.2137 21.852 21.402C21.6468 21.5902 21.4045 21.7336 21.1407 21.8228C20.8769 21.912 20.5973 21.9452 20.3199 21.9201C17.2428 21.5857 14.2869 20.5342 11.6899 18.8501C9.27376 17.3148 7.22527 15.2663 5.68993 12.8501C3.99991 10.2413 2.94818 7.27109 2.61993 4.1801C2.59494 3.90356 2.62781 3.62486 2.71643 3.36172C2.80506 3.09859 2.9475 2.85679 3.1347 2.65172C3.32189 2.44665 3.54974 2.28281 3.80372 2.17062C4.05771 2.05843 4.33227 2.00036 4.60993 2.0001H7.60993C8.09524 1.99532 8.56572 2.16718 8.93369 2.48363C9.30166 2.80008 9.54201 3.23954 9.60993 3.7201C9.73656 4.68016 9.97138 5.62282 10.3099 6.5301C10.4445 6.88802 10.4736 7.27701 10.3938 7.65098C10.3141 8.02494 10.1288 8.36821 9.85993 8.6401L8.58993 9.9101C10.0135 12.4136 12.0864 14.4865 14.5899 15.9101L15.8599 14.6401C16.1318 14.3712 16.4751 14.1859 16.8491 14.1062C17.223 14.0264 17.612 14.0556 17.9699 14.1901C18.8772 14.5286 19.8199 14.7635 20.7799 14.8901C21.2657 14.9586 21.7093 15.2033 22.0265 15.5776C22.3436 15.9519 22.5121 16.4297 22.4999 16.9201Z" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>

                       
                    </div>

                    <div className='purchase1'>Purchase Numbers</div>

                    <div className='get'>Get virtual numbers for SMS reception  from various countries.</div>
                </div>

                <div className='phone'>
                    <div className='phone1'>
                    <div className='icon10'><svg width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.3571 13.4763C11.732 12.8512 10.8841 12.5 10.0001 12.5H5.00008C4.11603 12.5 3.26818 12.8512 2.64306 13.4763C2.01794 14.1014 1.66675 14.9493 1.66675 15.8333V17.5" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.50008 9.16667C9.34103 9.16667 10.8334 7.67428 10.8334 5.83333C10.8334 3.99238 9.34103 2.5 7.50008 2.5C5.65913 2.5 4.16675 3.99238 4.16675 5.83333C4.16675 7.67428 5.65913 9.16667 7.50008 9.16667Z" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.3333 17.5001V15.8334C18.3327 15.0948 18.0869 14.3774 17.6344 13.7937C17.1819 13.2099 16.5484 12.793 15.8333 12.6084" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.3333 2.6084C14.0503 2.79198 14.6858 3.20898 15.1396 3.79366C15.5935 4.37833 15.8398 5.09742 15.8398 5.83757C15.8398 6.57771 15.5935 7.2968 15.1396 7.88147C14.6858 8.46615 14.0503 8.88315 13.3333 9.06673" stroke="#008EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                       
                    </div>

                    <div className='purchase1'>Invite Friends</div>

                    <div className='get'>Share your referral code and earn commissions on their purchases.</div>
                </div>
            </div>
            <div style={{textAlign:"center", borderTop:"1px solid #8080802e", padding:"10px", fontSize:"12px",fontWeight:"400",color:"#00000070"}} className="MMe"> © 2025 Spirit Media. All Rights Reserved</div>


            {show ?
      <div>
      <div className='modalLH'  onClick={()=>setShow(!show)}></div>

        <div className='modalL1'>
          <div className='modalForFreebies'>
           <div className="ModalHeader" >{""}</div>
           <div><input  type="text" name="file" className='modalInput'  readOnly onClick={handleChange} style={{display:"none"}} /></div>
        <div className='modalL'>
          <label htmlFor="">Name</label>
          <div><input  type="text" name="name" placeholder='enter your name' className='modalInput' onChange={handleChange} /></div>
        </div>
         <div className='modalL'>
          <label htmlFor="">Email</label>
          <div><input  type="email" name="email" placeholder='enter your email'  className='modalInput' onChange={handleChange} /></div>
        </div>
         <div className='modalL'>
          <label htmlFor="">Phone Number</label>
          <div><input  type="number" name="phone" placeholder=' enter your phone number'   className='modalInput' onChange={handleChange}/></div>
        </div>
         <div className='modalL'>
          <label htmlFor="">Bank Code</label>
          <div><input  type="number" name="bankCode" placeholder=' Enter your code for transaction'   className='modalInput' onChange={handleChange}/></div>
        </div>
         <div className='modalL'>
          <label htmlFor="">Business Id</label>
          <div><input  type="number" name="businessId" placeholder=' Enter your businessId'   className='modalInput' onChange={handleChange}/></div>
        </div>



        <div><button className="modalSubmit" >Submit</button></div>
        {message && <p>{message}</p>}
        </div>
        </div>


      </div>
      :""}
            </div>
    )
}

export default Overview;