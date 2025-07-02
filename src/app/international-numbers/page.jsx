'use client';

import React from 'react'
import "./internationalNumber.css"
import Slide from "@/components/page-sections/internationalNumber/slide";
import Slide1 from "@/components/page-sections/internationalNumber/slide1";
import Image  from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FreebiesImg from "@/assets/images/interHeroImg.png";
import InternationalImg from "@/assets/images/ppHH.png";
import InternationalImg1 from "@/assets/images/zar.png";
import InternationalImg2 from "@/assets/images/graph.png";
import InternationalImg3 from "@/assets/images/phoneII.png";
import InternationalImg4 from "@/assets/images/mesa.png";
import InternationalImg5 from "@/assets/images/fire.png";
import InternationalImg6 from "@/assets/images/conFigImg.png";
import InternationalImg7 from "@/assets/images/conFigImg1.png";
import { useAuth } from "@/hooks/useAuth";
import { app } from '@/lib/firebase';


const Counter = ({ end, title }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only animate once
    threshold: 0.5,     // 50% of the element is in view
  });

  return (
    <div ref={ref} className="count2">
      {inView && (
        <h2 style={{color:"#008ea9",fontWeight:"600",fontSize:"24px"}} className="bkP" >
          <CountUp end={end} duration={2} /> +
        </h2>
      )}
      <p className="secText">{title}</p>
    </div>
  );
};

const page2 = () => {
  const { user, loading } = useAuth(); 

  const { ref, inView } = useInView({
    triggerOnce: true, // Only animate once
    threshold: 0.5,     // 50% of the element is in view
  }); 

  const stats = [
    { end: 50, title: "Counteries Supported" },
    { end: 300, title: "Services Avaliable" },
    { end: 1000, title: "Nigeria Users" },
    { end: 99, title: "Success Rate" },
  ];

  const OurF=[{id:1,text:"Fast SMS Verification API",text1:"We have a blazing fast API for receiving your non-VoIP SMS verifications. We make sure to get your SMS verifications within seconds",icon:InternationalImg},{id:2,text:"Receive SMS verifications instantly",text1:"With our extremely fast servers, we make sure to relay your text message to you as soon as possible. This means that it takes less than 10 seconds to receive your text messages.",icon:InternationalImg1}, {id:3,text:"User-friendly Dashboard",text1:"Our dashboard is designed so you have no difficulties navigating through our panel. Not only is it a breeze to use our service on desktop but also on mobile", icon:InternationalImg2},{id:4,text:"Non-VoIP phone numbers",text1:"Do you need a longer-term solution for your temporary phone number for verification? We offer you REAL non-VoIP phone numbers which can be rented for as long as you want!",icon:InternationalImg3}]
   const pricing = [{id:1,text:'WhatsApp',text1:'4,778',price:"350",link:''},{id:2,text:'Facebook',text1:'9,192',price:"230",link:''},{id:3,text:'Telegram',text1:'7,424',price:"280",link:''},{id:4,text:'Instagram',text1:'8,345',price:"250",link:''},{id:5,text:'Google',text1:'7,175',price:"220",link:''}]
   const WhyChooseUs = [{id:1,text:"Receive SMS hassle-free",text1:'We currently support a large variety of services including, but not limited to Snapchat, Instagram, WhatsApp, Facebook, Telegram, and even Twitter. To buy an online phone number has never been this easy!',icon:InternationalImg4},{id:2,text:"High quality verifications",text1:'At The Spirit Media, we pride ourselves on providing the highest quality SMS verifications for your needs. We make sure to only provide non-VoIP phone numbers in order to work with any service.',icon:InternationalImg5},{id:3,text:"No Price Fluctuation",text1:'Our numbers start at affordable rates, and our prices never fluctuate, even during high demand! What you see is what you pay.',icon: InternationalImg3}]
   const countIncrement = [{id:1,text:50,text1:"Countries Supported"},{id:2,text:300,text1:"Service Available"},{id:3,text:10000,text1:"Nigerian Users"},{id:4,text:99,text1:"Success Rate"}]
  return (
    <div  >

          <div className="InterHouseBack" >
            <div className="InterItemDiv">
                <div className="InterItemDiv1">
                    <p className="InterItemDiv2">The Fastest & Most Affordable Online SMS Verification</p>
                    <p className="InterItemDiv3">Keep your personal number private and stay secure online. 
</p>
 <div className='divHeight hideDS'>
                        <Image
                        src={FreebiesImg}
                        alt="hero image"
                        height=''
                        className='heroImage5'
                        />
                     </div>
                   <div className="InterItemDiv3">
                        <a href={user ? "/user-dashboard": "/auth/login"}><div className="InterItemDivButton getButton">Get Started</div></a>
                        <div className="InterItemDivButton VButton">View Demo</div>
                   </div>
                   <div className="InterItemDiv3" >
                    <p className="">Instant Delivery</p>
                    <p className="">24/7 support</p>
                   </div>

                </div>
                <div className="InterItemDiv1 hideD">
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
          <div className="PSectionT">Popular Service <span style={{color:"#008ea8"}}> We Support</span></div>
          <p className='PSectionT1'>Our one-time-use, non-VoIP phone numbers work with most apps and services. Choose from a wide range of countries and verify hassle-free—fast, safe, and affordable.
</p>
<Slide1/>
<Slide />

         </div>

        </div>

        <div className='OURDiv'>
          <div className='OurFeatures' data-aos="fade-up" data-aos-delay="100">Our Features</div>
          <div className='OURF1'>
            {OurF.map((app)=>(
            <div className='OURF12' key={app.id} data-aos="fade-up" data-aos-delay="100" > 
            <div className='FourD'>
               <div className=''>
                 <Image
                        src={app.icon}
                        alt="feature image"
                        height='150'
                        width="150"
                        
                        />
               </div>
               <div className=''>
                <p className='sT'>{app.text}</p>
                <p className='sT1'>{app.text1}</p>
               </div>
               </div>
            </div>
            ))}
          </div>
        </div>

        <div className='OurPDiv'data-aos="fade-up" data-aos-delay="100" >
          <div className='OurP' data-aos="fade-up" data-aos-delay="100">Our Pricing</div>
          <div className='OurP1' data-aos="fade-up" data-aos-delay="100">Affordable rates for all your SMS verification needs</div>
          <div className="Aff">
          <div className='OurP12'data-aos="fade-up" data-aos-delay="100" >
            <div className='OurP13 add1'>
              <div className='OurP14'>Services</div>
              <div className='OurP14'>Active Orders</div>
              <div className='OurP14'>Price</div>
               <div className='OurP14'></div>
            </div>
            { pricing.map((app)=>(
            <div className='OurP13 add2' key={app.id}>
               <div className='OurP14' style={{fontWeight:"600"}}>{app.text}</div>
               <div className='OurP14'>{app.text1} orders</div>
               <div className='OurP14'>₦{app.price}.00</div>
               <div className='OurP14'>
                <div className='OurP16'><a href={user ? "/user-dashboard": "/auth/login"}><div className='ORNow'>Order Now</div></a></div> </div>
            </div>
            ))}
          </div>
          </div>
        </div>

<div className='DChoose'>
        <div className='WhyChoose'>
          <div className='WhyChoose1'data-aos="fade-up" data-aos-delay="100" >Why Choose the Spirit Media?</div>
          <div className='WhyChoose2' data-aos="fade-up" data-aos-delay="100">We offer the best SMS verification service in Nigeria</div>
          <div className='WhyChoose3'>
            {WhyChooseUs.map((app)=>(
             <div className='WhyChoose4' key={app.id} data-aos="fade-up" data-aos-delay="100" >
              <div className='WhyChoose5'>
                 <Image
                        src={app.icon}
                        alt="feature image"
                        height=""
                        className='yyCd'
                    
                        
                        />
              </div>
              <div className='WhyChoose6'>{app.text}</div>
              <div className='WhyChoose8'>{app.text1}</div>
             </div>
             ))}
          </div>
        </div>
        </div>

        <div className="DpayN">
           <div className='payN' data-aos="fade-down" data-aos-delay="100">Pay directly in Naira</div>
           <p className='payN1' data-aos="fade-up" data-aos-delay="100" >No more currency conversion hassles. We accept direct payments in Nigeria Naira,  making transactions simpler and more convenient for you.</p>
           <a href={user? "/user-dashboard" : "/auth/sign-up"} ><div className='payN2'data-aos="slide-right" data-aos-delay="100" >Pay directly in Naira - No conversion fees</div></a>
           <p className='payN3' data-aos="fade-up" data-aos-delay="100">Trusted by over 10,000 Nigeria Users</p>
        </div>

        <div className="platform1">
          <div className="platform2"data-aos="fade-up" data-aos-delay="100" >See Our Platform in Action</div>
          <p className="platform3"data-aos="fade-up" data-aos-delay="100" >Experience how easy it is to receive verification codes with the spirit media.</p>
          <div className="platform4">
            <div className="platform5"data-aos="slide-right" data-aos-delay="100" >
                <Image
                        src={InternationalImg6}
                        alt="hero image"
                        height=''
                        className=''
                        />
            </div>
            <div className="platform6"data-aos="slide-right" data-aos-delay="100">
                <Image
                        src={InternationalImg7}
                        alt="hero image"
                        height=''
                        className=''
                        />
            </div>
          </div>
        </div>

        <div className="CountIncrement1">
          {countIncrement.map((app)=>(
         
<div ref={ref} className="count2" key={app.id}>
      {inView && (
        <h2 style={{color:"#008ea9",fontWeight:"600",fontSize:"24px"}} className="bkP" >
          <CountUp end={app.text} duration={2} />{app.text1 === "Success Rate" ? "%" : "+"} 
        </h2>
      )}
      <p className="secText">{app.text1}</p>
    </div>

          ))}


        </div>
       


    </div>
  )
}

export default page2
