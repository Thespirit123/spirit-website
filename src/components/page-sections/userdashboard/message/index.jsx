"use client";
import React from "react";

import Image from "next/image";
import ContentImage from "@/assets/images/usa.png";


import { useRouter } from 'next/navigation';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

const Messages = () =>{

      const router = useRouter();

//       const handleBack = () => {
//   if (document.referrer === '' || window.history.length <= 1) {
//     router.push('/'); 
//   } else {
//     router.back();
//   }
// };

    return(
            <div className="mainmessage  MessDiv" >

                <div className="messSection">
                    <div className="messageIcon">
                    <div className="icon16"><div ><FontAwesomeIcon className="icon2" icon={faArrowLeft}  /></div></div>
                    <div className="mess">SMS Messages</div>
                    </div>

                    <div className=""><a className="messageIcon1" href="">
                        <div className="icon16"><FontAwesomeIcon className="icon2" icon={faArrowsRotate} /></div>
                        <div className="refresh">Refresh</div>
                        </a></div>
                </div>

                <div className='tableC'>

                    <div className='table6'>
                        <div className="usa">
                            <div className="icon16">
                            <Image src={ContentImage} alt="section Image" className=""/>
                                </div>

                            <div>
                                <div className="usanum">+1 (234) 567-8901</div>
                               <div className="america">United States</div>
                            </div>
                        </div>

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
</svg></div>
                    </div>

                    <div className='table7'>
                    <div className="usa1">
                            <div className="foreign">
                                <div className="foreign1">+1 897-654-3210</div>
                               <div className="foreign2">Your verification code is: 123456</div>
                            </div>

                            <div className="calendar">15/10/2023, 15:32:00</div>
                        </div>
                    </div>

                    <div className='table7'>
                    <div className="usa1">
                            <div className="foreign">
                                <div className="foreign1">+1 555-123-4567</div>
                               <div className="foreign2">Welcome to our service! Your account has been activated</div>
                            </div>

                            <div className="calendar">15/10/2023, 14:45:00</div>
                        </div> 
                    </div>

                    <div className='table8'>
                    <div className="sms">About SMS Messages</div>
                        <div className="calendar1">Messages received on this number will automatically appear here. Refresh this page preiodically to check for new messages.</div>
                        <div className="calendar1">Messages are stored for the duration of your number rental period.</div>
                    </div>
                </div>
                <div style={{textAlign:"center", borderTop:"1px solid #8080802e", padding:"10px", fontSize:"12px",fontWeight:"400",color:"#00000070"}} className="MMe"> © 2025 Spirit Media. All Rights Reserved</div>
            
            </div>
    )
}

export default Messages;