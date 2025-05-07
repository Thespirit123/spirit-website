'use client';

import React from 'react'
import "./internationalNumber.css"
import Slide from "@/components/page-sections/internationalNumber/slide";
import Slide1 from "@/components/page-sections/internationalNumber/slide1";
import Image  from "next/image";
import FreebiesImg from "@/assets/images/interHeroImg.png";

const page2 = () => {

  return (
    <div style={{paddingTop:"60px"}}>

          <div className="InterHouseBack">
            <div className="InterItemDiv">
                <div className="InterItemDiv1">
                    <p className="InterItemDiv2">The Fastest & Most Affordable Online SMS Verification</p>
                    <p className="InterItemDiv3">Keep your personal number private and stay secure online. 
</p>
                   <div className="InterItemDiv3">
                        <div className="InterItemDivButton getButton">Get Started</div>
                        <div className="InterItemDivButton VButton">View Demo</div>
                   </div>
                   <div className="InterItemDiv3" >
                    <p className="">instant Delivery</p>
                    <p className="">24/7 support</p>
                   </div>

                </div>
                <div className="InterItemDiv1">
                     <div className='divHeight'>
                        <Image
                        src={FreebiesImg}
                        alt="hero image"
                        height=''
                        className='heroImage5'
                        />
                     </div>
                </div>
            </div>
        </div>

        <div>
         <div>
          <div>Popular Service<span>We Support</span></div>
          <p>Our one-time-use, non-VoIP phone numbers work with most apps and services. Choose from a wide range of countries and verify hassle-free—fast, safe, and affordable.
</p>
<Slide1/>
<Slide />

         </div>

        </div>


    </div>
  )
}

export default page2
