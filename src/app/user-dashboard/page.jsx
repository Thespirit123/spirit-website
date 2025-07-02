"use client";
import React, { useState,useEffect } from "react";
import './userdashboard.css';

import Overview from "@/components/page-sections/userdashboard/overView";
import Virtual from "@/components/page-sections/userdashboard/virtual";
import Messages from "@/components/page-sections/userdashboard/message";
import Referrals from "@/components/page-sections/userdashboard/referral";
import Earnings from "@/components/page-sections/userdashboard/earnings";
import Help from "@/components/page-sections/userdashboard/help";
import Questions from "@/components/page-sections/userdashboard/question";
import Image from "next/image";
import LogoImg from "@/assets/images/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark,faBell } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () =>{
    const [section, setSection] = useState(<Overview />);
    const [toggle, setToggle] = useState(false);
    const [bg, setBg] = useState('');
    const [show, setShow] = useState(true);
    const [popSupport, setPopSupport] = useState(true);
    
    const colorChange = () => {
        setSection(<Overview />);
        setBg('mcol1');
       

    }

    useEffect (()=>{

        if(toggle){
document.body.style.overflow = "hidden"
        } else {
document.body.style.overflow = "auto"
        }

        return ()=>{
document.body.style.overflow = "auto";
        }

    },[toggle])
    // if(!toggle) return null
    return(
        <div>
        <div className="totaldash">
        <div className="navBarR"   >
                    {/* <div className="spirit">Spirit Media</div> */}
                    <div className="YuWu">
                    <div className="HomeW">
                        <div className="bar"><FontAwesomeIcon onClick={() => setToggle(!toggle)} className="famark" icon={faBars} /></div>
                    <div><a href="/"> <Image
            src={LogoImg}
            height={100}
            width={100}
            alt="The Spirit Media"
            className="object-cover"
          /></a></div>
                    </div>
                    <div className="Notifi" onClick={() => setSection(<Messages />)}><FontAwesomeIcon  className="" icon={faBell}  style={{fontSize:"20px"}}/>
                     <div className="alertMe">1</div>
                    </div>
                    </div>
                </div>
             <div className='dashboard'>
                            <div className='dash'>
                                <div>Dashboard</div>
                            </div>
             
                            <div className='line1'></div>
                            <ul className='list'>
                                <li style={{backgroundColor: bg}} className="col mcol" onClick={colorChange}><div className="list1">
                                    <div className="icon12">< svg className="icon2 col"  viewBox="0 0 143 138" fill="none">
<path d="M53.625 126.5V69H89.375V126.5M17.875 51.75L71.5 11.5L125.125 51.75V115C125.125 118.05 123.869 120.975 121.635 123.132C119.4 125.288 116.369 126.5 113.208 126.5H29.7917C26.6312 126.5 23.6001 125.288 21.3653 123.132C19.1305 120.975 17.875 118.05 17.875 115V51.75Z" stroke="#000" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                                    <div className="dash1">Overview</div></div>
                                    </li>
            
                                <li className="col mcol" onClick={() => setSection(<Virtual />)}><div className="list1">
                                <div><svg className="col" width="25" height="24" viewBox="0 0 25 24" fill="none">
<path d="M22.4999 16.9201V19.9201C22.5011 20.1986 22.444 20.4743 22.3324 20.7294C22.2209 20.9846 22.0572 21.2137 21.852 21.402C21.6468 21.5902 21.4045 21.7336 21.1407 21.8228C20.8769 21.912 20.5973 21.9452 20.3199 21.9201C17.2428 21.5857 14.2869 20.5342 11.6899 18.8501C9.27376 17.3148 7.22527 15.2663 5.68993 12.8501C3.99991 10.2413 2.94818 7.27109 2.61993 4.1801C2.59494 3.90356 2.62781 3.62486 2.71643 3.36172C2.80506 3.09859 2.9475 2.85679 3.1347 2.65172C3.32189 2.44665 3.54974 2.28281 3.80372 2.17062C4.05771 2.05843 4.33227 2.00036 4.60993 2.0001H7.60993C8.09524 1.99532 8.56572 2.16718 8.93369 2.48363C9.30166 2.80008 9.54201 3.23954 9.60993 3.7201C9.73656 4.68016 9.97138 5.62282 10.3099 6.5301C10.4445 6.88802 10.4736 7.27701 10.3938 7.65098C10.3141 8.02494 10.1288 8.36821 9.85993 8.6401L8.58993 9.9101C10.0135 12.4136 12.0864 14.4865 14.5899 15.9101L15.8599 14.6401C16.1318 14.3712 16.4751 14.1859 16.8491 14.1062C17.223 14.0264 17.612 14.0556 17.9699 14.1901C18.8772 14.5286 19.8199 14.7635 20.7799 14.8901C21.2657 14.9586 21.7093 15.2033 22.0265 15.5776C22.3436 15.9519 22.5121 16.4297 22.4999 16.9201Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                                    <div className="dash1">Virtual Numbers</div></div>
                                    </li>
                              
            
                                <li className="col mcol" onClick={() => setSection(<Messages />)}><div className='list3'>
                                    <div className="icon12"><svg className='icon2 col' width="28" height="17" viewBox="0 0 32 32" fill="none">
            <path d="M28 20C28 20.7072 27.719 21.3855 27.219 21.8856C26.7189 22.3857 26.0406 22.6667 25.3333 22.6667H9.33333L4 28V6.66667C4 5.95942 4.28095 5.28115 4.78105 4.78105C5.28115 4.28095 5.95942 4 6.66667 4H25.3333C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V20Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg></div>
                                    <div className="dash1">Movie Portal</div></div>
                                    </li>
                                                    <li className="col mcol" onClick={() => setSection(<Earnings />)}><div className='list1'>
                                <div className=""><svg className="col" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M19 7V4C19 3.73478 18.8946 3.48043 18.7071 3.29289C18.5196 3.10536 18.2652 3 18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5C3 5.53043 3.21071 6.03914 3.58579 6.41421C3.96086 6.78929 4.46957 7 5 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V12M21 12H18C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 14.5304 16.2107 15.0391 16.5858 15.4142C16.9609 15.7893 17.4696 16 18 16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V16" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>

     
                                    <div className="dash1">Freebies</div></div>
                                    </li>
                                                    <li className="col mcol" onClick={() => setSection(<Earnings />)}><div className='list1'>
                                <div className=""><svg className="col" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M19 7V4C19 3.73478 18.8946 3.48043 18.7071 3.29289C18.5196 3.10536 18.2652 3 18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5C3 5.53043 3.21071 6.03914 3.58579 6.41421C3.96086 6.78929 4.46957 7 5 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V12M21 12H18C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 14.5304 16.2107 15.0391 16.5858 15.4142C16.9609 15.7893 17.4696 16 18 16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V16" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>

     
                                    <div className="dash1">Whatsapp Spy Tool</div></div>
                                    </li>
                                                    <li className="col mcol" onClick={() => setSection(<Earnings />)}><div className='list1'>
                                <div className=""><svg className="col" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M19 7V4C19 3.73478 18.8946 3.48043 18.7071 3.29289C18.5196 3.10536 18.2652 3 18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5C3 5.53043 3.21071 6.03914 3.58579 6.41421C3.96086 6.78929 4.46957 7 5 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V12M21 12H18C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 14.5304 16.2107 15.0391 16.5858 15.4142C16.9609 15.7893 17.4696 16 18 16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V16" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>

     
                                    <div className="dash1">cracked</div></div>
                                    </li>
                                    
                                <li className="col mcol" onClick={() => setSection(<Referrals />)}><div className='list1'>
                                <div><svg className="col" width="25" height="24" viewBox="0 0 25 24" fill="none">
<path d="M16.25 21V19C16.25 17.9391 15.8286 16.9217 15.0784 16.1716C14.3283 15.4214 13.3109 15 12.25 15H6.25C5.18913 15 4.17172 15.4214 3.42157 16.1716C2.67143 16.9217 2.25 17.9391 2.25 19V21" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.25 11C11.4591 11 13.25 9.20914 13.25 7C13.25 4.79086 11.4591 3 9.25 3C7.04086 3 5.25 4.79086 5.25 7C5.25 9.20914 7.04086 11 9.25 11Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M22.25 20.9999V18.9999C22.2493 18.1136 21.9544 17.2527 21.4114 16.5522C20.8684 15.8517 20.1081 15.3515 19.25 15.1299" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.25 3.12988C17.1104 3.35018 17.873 3.85058 18.4176 4.55219C18.9622 5.2538 19.2578 6.11671 19.2578 7.00488C19.2578 7.89305 18.9622 8.75596 18.4176 9.45757C17.873 10.1592 17.1104 10.6596 16.25 10.8799" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                                    {/* <div className='icon4'><img className='icon2 col' src={refer} alt='' /></div> */}
                                    <div className="dash1">Referral Program</div></div>
                                    </li>
            
                                <li className="col mcol" onClick={() => setSection(<Earnings />)}><div className='list1'>
                                <div className=""><svg className="col" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M19 7V4C19 3.73478 18.8946 3.48043 18.7071 3.29289C18.5196 3.10536 18.2652 3 18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5C3 5.53043 3.21071 6.03914 3.58579 6.41421C3.96086 6.78929 4.46957 7 5 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V12M21 12H18C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 14.5304 16.2107 15.0391 16.5858 15.4142C16.9609 15.7893 17.4696 16 18 16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V16" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>

     
                                    <div className="dash1">Earnings</div></div>
                                    </li>
                                    
                                <li className="col mcol" onClick={() => setSection(<Earnings />)}><div className='list1'>
                                <div className=""><svg className="col" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M19 7V4C19 3.73478 18.8946 3.48043 18.7071 3.29289C18.5196 3.10536 18.2652 3 18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5C3 5.53043 3.21071 6.03914 3.58579 6.41421C3.96086 6.78929 4.46957 7 5 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V12M21 12H18C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 14.5304 16.2107 15.0391 16.5858 15.4142C16.9609 15.7893 17.4696 16 18 16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V16" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>

     
                                    <div className="dash1">Transactins</div></div>
                                    </li>
                             
                     
                            </ul>
            
                            <div className='ll line2'></div>
                                <div className="col mcol" onClick={() => setSection(<Earnings />)}><div className='list1'>
                                <div className=""><svg className="col" width="28" height="28" viewBox="0 0 24 24" fill="none">
<path d="M19 7V4C19 3.73478 18.8946 3.48043 18.7071 3.29289C18.5196 3.10536 18.2652 3 18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5C3 5.53043 3.21071 6.03914 3.58579 6.41421C3.96086 6.78929 4.46957 7 5 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V12M21 12H18C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 14.5304 16.2107 15.0391 16.5858 15.4142C16.9609 15.7893 17.4696 16 18 16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V16" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>

     
                                    <div className="dash1">Setting</div></div>
                                    </div>
            
                        <div className="ll dash2 col2">
                            <div className="arr col  mcol" onClick={() => setShow(!show)}>
                            <div className="support">
                            <div className="icon17"><svg className="col" width="28" height="28" viewBox="0 0 48 48" fill="none">
<path d="M18.18 18C18.6502 16.6633 19.5783 15.5362 20.7999 14.8183C22.0215 14.1003 23.4578 13.8379 24.8544 14.0774C26.2509 14.317 27.5176 15.043 28.4302 16.1271C29.3427 17.2111 29.8421 18.583 29.84 20C29.84 24 23.84 26 23.84 26M24 34H24.02M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                                <div className='dash3'>Help & Support</div>
                                </div> 
                            <div className="icon15">
                                {show ? <svg className="col2" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg> : <svg className="col2" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>}
                                </div>
                            </div>

                        {!show ?
                            <div className="itemsB">
                            <ul className="itemsA">
                                <li className="help1 col2" onClick={() => setSection(<Help />)}>Get in touch</li>
                                <li className="help1 col2" >Join community</li>
                                <li className="help1 col2" onClick={() => setSection(<Questions />)}>FAQs</li>

                               
                                
                            </ul>
                            </div>
                        : ''}
                            </div>
                           
                                <div className="ll col mcol" onClick={() => setSection(<Earnings />)}><div className='list1'>
                                <div className=""><svg className="col" width="28" height="28" viewBox="0 0 24 24" fill="none">
<path d="M19 7V4C19 3.73478 18.8946 3.48043 18.7071 3.29289C18.5196 3.10536 18.2652 3 18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5C3 5.53043 3.21071 6.03914 3.58579 6.41421C3.96086 6.78929 4.46957 7 5 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V12M21 12H18C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 14.5304 16.2107 15.0391 16.5858 15.4142C16.9609 15.7893 17.4696 16 18 16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V16" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>

     
                                    <div className="dash1">Logout</div></div>
                                    </div>
            
                            <div className='line3'></div>
            
                            <div className='profile'>
                                <div className='jd'>JD</div>
            
                                <div className='john'>
                                    <div className='john1'>John Doe</div>
                                    <div><a className='john2' href="View profile"></a>View Profile</div>
                                </div>
                            </div>
                        </div>
       
         {section} 
                    
        </div>

        {toggle ? 
        <div >
            <div className="navbarR"  onClick={() => setToggle(!toggle)}></div>
        <div className="nav">
        <div className="xmarkL">
            <div className="busy">
                <div className="navheaderbar">
                    <svg width="24" height="24" >
<path fillRule="evenodd" clipRule="evenodd" d="M9.76961 3.76961C9.31092 4.2283 9 4.95051 9 6C9 7.2921 9.43561 8.60063 10.0821 9.5703C10.7576 10.5836 11.4943 11 12 11C12.5057 11 13.2424 10.5836 13.918 9.5703C14.5644 8.60063 15 7.2921 15 6C15 4.95051 14.6891 4.2283 14.2304 3.76961C13.7717 3.31092 13.0495 3 12 3C10.9505 3 10.2283 3.31092 9.76961 3.76961ZM15.0952 11.3274C15.2709 11.1201 15.4336 10.9024 15.5821 10.6797C16.4356 9.39937 17 7.7079 17 6C17 4.54949 16.5609 3.2717 15.6446 2.35539C14.7283 1.43908 13.4505 1 12 1C10.5495 1 9.27171 1.43908 8.3554 2.35539C7.43909 3.2717 7 4.54949 7 6C7 7.7079 7.5644 9.39937 8.41795 10.6797C8.56642 10.9024 8.72912 11.1201 8.90483 11.3275C7.82105 11.5549 6.72153 11.9105 5.72821 12.4243C3.71542 13.4654 2.00033 15.248 2.0003 17.9999C2.0003 17.9999 2.0003 18 2.0003 17.9999L2.00015 19.9998C2.00003 21.6567 3.34321 23 5.00015 23H13C13.5523 23 14 22.5523 14 22C14 21.4477 13.5523 21 13 21H5.00015C4.44784 21 4.00011 20.5522 4.00015 19.9999L4.0003 18.0001C4.0003 16.252 5.03506 15.0346 6.64709 14.2007C8.28071 13.3557 10.3625 13 12 13C13.1105 13 14.4464 13.1642 15.7112 13.5458C16.2399 13.7053 16.7979 13.406 16.9574 12.8773C17.1169 12.3485 16.8176 11.7906 16.2888 11.6311C15.8935 11.5118 15.4937 11.411 15.0952 11.3274ZM19 15C19.5523 15 20 15.4477 20 16V18H22C22.5523 18 23 18.4477 23 19C23 19.5523 22.5523 20 22 20H20V22C20 22.5523 19.5523 23 19 23C18.4477 23 18 22.5523 18 22V20H16C15.4477 20 15 19.5523 15 19C15 18.4477 15.4477 18 16 18H18V16C18 15.4477 18.4477 15 19 15Z" fill="white"/>
</svg>

                </div>
                <div>
                    <div className="Kcs">Emmerson </div>
                     <div className="Kcs1">last login 26/06/25 11:09</div>
                </div>
            </div>
            <FontAwesomeIcon className="xmark" onClick={() => setToggle(!toggle)} icon={faXmark} /> 

            </div>
        <ul className='list'>
                                <li className="col" onClick={() =>{ setSection(<Overview />); setToggle(!toggle) }}><div className="list1">
                                <div className="icon12"><svg  width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#008ea8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
</div>

                                    <div className="navBarBold">Dashboard</div></div>
                                    </li>
                               
            
                                
                                            <li className="col" onClick={() =>{ setSection(<Virtual />); setToggle(!toggle)}}><div className='list3'>
                                    <div className="icon12">
                                         <svg className="" width="28" height="28" viewBox="0 0 25 24" fill="none">
<path d="M22.4999 16.9201V19.9201C22.5011 20.1986 22.444 20.4743 22.3324 20.7294C22.2209 20.9846 22.0572 21.2137 21.852 21.402C21.6468 21.5902 21.4045 21.7336 21.1407 21.8228C20.8769 21.912 20.5973 21.9452 20.3199 21.9201C17.2428 21.5857 14.2869 20.5342 11.6899 18.8501C9.27376 17.3148 7.22527 15.2663 5.68993 12.8501C3.99991 10.2413 2.94818 7.27109 2.61993 4.1801C2.59494 3.90356 2.62781 3.62486 2.71643 3.36172C2.80506 3.09859 2.9475 2.85679 3.1347 2.65172C3.32189 2.44665 3.54974 2.28281 3.80372 2.17062C4.05771 2.05843 4.33227 2.00036 4.60993 2.0001H7.60993C8.09524 1.99532 8.56572 2.16718 8.93369 2.48363C9.30166 2.80008 9.54201 3.23954 9.60993 3.7201C9.73656 4.68016 9.97138 5.62282 10.3099 6.5301C10.4445 6.88802 10.4736 7.27701 10.3938 7.65098C10.3141 8.02494 10.1288 8.36821 9.85993 8.6401L8.58993 9.9101C10.0135 12.4136 12.0864 14.4865 14.5899 15.9101L15.8599 14.6401C16.1318 14.3712 16.4751 14.1859 16.8491 14.1062C17.223 14.0264 17.612 14.0556 17.9699 14.1901C18.8772 14.5286 19.8199 14.7635 20.7799 14.8901C21.2657 14.9586 21.7093 15.2033 22.0265 15.5776C22.3436 15.9519 22.5121 16.4297 22.4999 16.9201Z" stroke="#008ea8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg></div>
                                    <div className="navBarBold">Virtual Numbers</div></div>
                                    </li>
                                    <li className="col" onClick={() =>{ setSection(<Earnings />); setToggle(!toggle)}} > <div className='list3'>
                                    <div className="icon12"><svg className="col" width="28" height="28" viewBox="0 0 24 24" fill="none">
<path d="M19 7V4C19 3.73478 18.8946 3.48043 18.7071 3.29289C18.5196 3.10536 18.2652 3 18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5C3 5.53043 3.21071 6.03914 3.58579 6.41421C3.96086 6.78929 4.46957 7 5 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V12M21 12H18C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 14.5304 16.2107 15.0391 16.5858 15.4142C16.9609 15.7893 17.4696 16 18 16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" stroke="#008ea8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V16" stroke="#008ea8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            </div>
                                    <div className="navBarBold">Earning</div></div>
                                    </li>
                                    
                                                  <li className="col" onClick={() =>{ setSection(<Messages />); setToggle(!toggle)}}><div className='list3'>
                                    <div className="icon12"><svg className=' col' width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M28 20C28 20.7072 27.719 21.3855 27.219 21.8856C26.7189 22.3857 26.0406 22.6667 25.3333 22.6667H9.33333L4 28V6.66667C4 5.95942 4.28095 5.28115 4.78105 4.78105C5.28115 4.28095 5.95942 4 6.66667 4H25.3333C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V20Z" stroke="#008ea8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg></div>
                                    <div className="navBarBold">Messages</div></div>
                                    </li>
                                    
                                                  <li className="col" onClick={() =>{ setSection(<Referrals/>); setToggle(!toggle)}}><div className='list3'>
                                    <div className="icon12"><svg className="col" width="28" height="28" viewBox="0 0 25 24" fill="none"><path d="M16.25 21V19C16.25 17.9391 15.8286 16.9217 15.0784 16.1716C14.3283 15.4214 13.3109 15 12.25 15H6.25C5.18913 15 4.17172 15.4214 3.42157 16.1716C2.67143 16.9217 2.25 17.9391 2.25 19V21" stroke="#008ea8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.25 11C11.4591 11 13.25 9.20914 13.25 7C13.25 4.79086 11.4591 3 9.25 3C7.04086 3 5.25 4.79086 5.25 7C5.25 9.20914 7.04086 11 9.25 11Z" stroke="#008ea8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M22.25 20.9999V18.9999C22.2493 18.1136 21.9544 17.2527 21.4114 16.5522C20.8684 15.8517 20.1081 15.3515 19.25 15.1299" stroke="#008ea8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.25 3.12988C17.1104 3.35018 17.873 3.85058 18.4176 4.55219C18.9622 5.2538 19.2578 6.11671 19.2578 7.00488C19.2578 7.89305 18.9622 8.75596 18.4176 9.45757C17.873 10.1592 17.1104 10.6596 16.25 10.8799" stroke="#008ea8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></div>
                                    <div className="navBarBold">Referral Program</div></div>
                                    </li>
                                        

                                <li className="col" onClick={() =>{ setSection(<Referrals />); setToggle(!toggle)}}><div className=''>
                                <div>
   
</div>

                                    <div className="lopoLine"></div></div>
                                    
                                    </li>
            
                            
                           <li>
                           <div className="list dash2 col2" style={{padding: '2px 5px'}}>
                            <div className="arr col  mcol3" onClick={() => setShow(!show)}>
                            <div className="support">
                            <div className="icon17"><svg className="col" width="28" height="28" viewBox="0 0 48 48" fill="none">
<path d="M18.18 18C18.6502 16.6633 19.5783 15.5362 20.7999 14.8183C22.0215 14.1003 23.4578 13.8379 24.8544 14.0774C26.2509 14.317 27.5176 15.043 28.4302 16.1271C29.3427 17.2111 29.8421 18.583 29.84 20C29.84 24 23.84 26 23.84 26M24 34H24.02M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" stroke="#008ea8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
                                <div className='dash3 navBarBold'>Help & Support</div>
                                </div> 
                            <div className="icon15">
                                {show ? <svg className="col2" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg> : <svg className="col2" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>}
                                </div>
                            </div>

                        {!show ?
                            <div className="itemsB">
                            <ul className="itemsA">
                                <li className="help1 col2" onClick={() =>{ setSection(<Help />);setToggle(!toggle)}}>Get in touch</li>
                                <li className="help1 col2" >Join community</li>
                                <li className="help1 col2" onClick={() =>{ setSection(<Questions />);setToggle(!toggle)}}>FAQs</li>
                            </ul>
                            </div>
                         : ''} 
                            </div>
                            </li>
                            <li className="col" onClick={() => { setSection(<Earnings />); setToggle(!toggle)}}><div className='list1'>
                                <div className=""><svg className="col" width="28" height="28" viewBox="0 0 24 24" fill="none">
<path d="M19 7V4C19 3.73478 18.8946 3.48043 18.7071 3.29289C18.5196 3.10536 18.2652 3 18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5C3 5.53043 3.21071 6.03914 3.58579 6.41421C3.96086 6.78929 4.46957 7 5 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V12M21 12H18C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 14.5304 16.2107 15.0391 16.5858 15.4142C16.9609 15.7893 17.4696 16 18 16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" stroke="#008ea8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V16" stroke="#008ea8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>

                                  

                                    <div className="navBarBold">Logout</div></div>
                                    </li>

                                

                            

                             </ul>
                            
        </div>
        </div>
        : '' }

        <div className='mainsupport'>
             <div className="support4" onClick={()=> setPopSupport(!popSupport)}>
              <svg className="support5" width="48" height="48" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256l0 40c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-40C0 114.6 114.6 0 256 0S512 114.6 512 256l0 144.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24l-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40L464 256c0-114.9-93.1-208-208-208zM144 208l16 0c17.7 0 32 14.3 32 32l0 112c0 17.7-14.3 32-32 32l-16 0c-35.3 0-64-28.7-64-64l0-48c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64l0 48c0 35.3-28.7 64-64 64l-16 0c-17.7 0-32-14.3-32-32l0-112c0-17.7 14.3-32 32-32l16 0z" fill='#fff'/></svg>
            
        
            {!popSupport ? 
            <div className='supportItems1'>
            <ul className='supportItems'>
              <div className='help3' onClick={() => setSection(<Help />)}>Get in touch</div>
              <div className='help3'><a href="/community">Join community</a></div>
              <div className='help3' onClick={() => setSection(<Questions />)}>FAQs</div>
              </ul>
              </div>
              
              : ''}
              </div>
            </div>
        </div>
    )
}



export default Dashboard;