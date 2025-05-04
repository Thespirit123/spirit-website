'use client';

import React from 'react'
import "./internationalNumber.css"
import Image  from "next/image";
import FreebiesImg from "@/assets/images/interHeroImg.png";

const page2 = () => {

  return (
    <div>

          <div className="">
            <div className="">
                <div className="">
                    <p className="">The Fastest & Most Affordable Online SMS Verification</p>
                    <p className="">Keep your personal number private and stay secure online. 
</p>
                   <div className="">
                        <div className="">Get Started</div>
                        <div className="">View Demo</div>
                   </div>
                   <div>
                    <p className="">instant Delivery</p>
                    <p className="">24/7 support</p>
                   </div>

                </div>
                <div>
                     <div>
                        <Image
                        src={FreebiesImg}
                        alt="hero image"
                        height=''
                        className=''
                        />
                     </div>
                </div>
            </div>
        </div>


    </div>
  )
}

export default page2
