import React from 'react'
import "./featuredProducts.css"
import HeroImg from "@/assets/images/homes1.jpeg";
import HeroImg1 from "@/assets/images/homes2.jpeg";
import HeroImg2 from "@/assets/images/homes3.jpeg";
import HeroImg3 from "@/assets/images/Image3.png";
import Image from "next/image";


const index = () => {


   
  const featuredProducts = [{id:1, text:"USA Foreign Number  ", Price:"1000", star:<svg width="80" height="16" viewBox="0 0 80 16" fill="none" >
<g clipPath="url(#clip0_709_914)">
<path d="M8.00016 1.33301L10.0602 5.50634L14.6668 6.17967L11.3335 9.42634L12.1202 14.013L8.00016 11.8463L3.88016 14.013L4.66683 9.42634L1.3335 6.17967L5.94016 5.50634L8.00016 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip1_709_914)">
<path d="M24.0002 1.33301L26.0602 5.50634L30.6668 6.17967L27.3335 9.42634L28.1202 14.013L24.0002 11.8463L19.8802 14.013L20.6668 9.42634L17.3335 6.17967L21.9402 5.50634L24.0002 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip2_709_914)">
<path d="M40.0002 1.33301L42.0602 5.50634L46.6668 6.17967L43.3335 9.42634L44.1202 14.013L40.0002 11.8463L35.8802 14.013L36.6668 9.42634L33.3335 6.17967L37.9402 5.50634L40.0002 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip3_709_914)">
<path d="M56.0002 1.33301L58.0602 5.50634L62.6668 6.17967L59.3335 9.42634L60.1202 14.013L56.0002 11.8463L51.8802 14.013L52.6668 9.42634L49.3335 6.17967L53.9402 5.50634L56.0002 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip4_709_914)">
<path d="M72.0002 1.33301L74.0602 5.50634L78.6668 6.17967L75.3335 9.42634L76.1202 14.013L72.0002 11.8463L67.8802 14.013L68.6668 9.42634L65.3335 6.17967L69.9402 5.50634L72.0002 1.33301Z" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_709_914">
<rect width="16" height="16" fill="white"/>
</clipPath>
<clipPath id="clip1_709_914">
<rect width="16" height="16" fill="white" transform="translate(16)"/>
</clipPath>
<clipPath id="clip2_709_914">
<rect width="16" height="16" fill="white" transform="translate(32)"/>
</clipPath>
<clipPath id="clip3_709_914">
<rect width="16" height="16" fill="white" transform="translate(48)"/>
</clipPath>
<clipPath id="clip4_709_914">
<rect width="16" height="16" fill="white" transform="translate(64)"/>
</clipPath>
</defs>
</svg>
, cartText:"Best Seller",href:"",img:HeroImg},{id:2, text:"10gb Data Plan", Price:"2800", star:<svg width="80" height="16" viewBox="0 0 80 16" fill="none" >
<g clipPath="url(#clip0_709_914)">
<path d="M8.00016 1.33301L10.0602 5.50634L14.6668 6.17967L11.3335 9.42634L12.1202 14.013L8.00016 11.8463L3.88016 14.013L4.66683 9.42634L1.3335 6.17967L5.94016 5.50634L8.00016 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip1_709_914)">
<path d="M24.0002 1.33301L26.0602 5.50634L30.6668 6.17967L27.3335 9.42634L28.1202 14.013L24.0002 11.8463L19.8802 14.013L20.6668 9.42634L17.3335 6.17967L21.9402 5.50634L24.0002 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip2_709_914)">
<path d="M40.0002 1.33301L42.0602 5.50634L46.6668 6.17967L43.3335 9.42634L44.1202 14.013L40.0002 11.8463L35.8802 14.013L36.6668 9.42634L33.3335 6.17967L37.9402 5.50634L40.0002 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip3_709_914)">
<path d="M56.0002 1.33301L58.0602 5.50634L62.6668 6.17967L59.3335 9.42634L60.1202 14.013L56.0002 11.8463L51.8802 14.013L52.6668 9.42634L49.3335 6.17967L53.9402 5.50634L56.0002 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip4_709_914)">
<path d="M72.0002 1.33301L74.0602 5.50634L78.6668 6.17967L75.3335 9.42634L76.1202 14.013L72.0002 11.8463L67.8802 14.013L68.6668 9.42634L65.3335 6.17967L69.9402 5.50634L72.0002 1.33301Z" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_709_914">
<rect width="16" height="16" fill="white"/>
</clipPath>
<clipPath id="clip1_709_914">
<rect width="16" height="16" fill="white" transform="translate(16)"/>
</clipPath>
<clipPath id="clip2_709_914">
<rect width="16" height="16" fill="white" transform="translate(32)"/>
</clipPath>
<clipPath id="clip3_709_914">
<rect width="16" height="16" fill="white" transform="translate(48)"/>
</clipPath>
<clipPath id="clip4_709_914">
<rect width="16" height="16" fill="white" transform="translate(64)"/>
</clipPath>
</defs>
</svg>, cartText:"New",href:"", img:HeroImg1},{id:3, text:"Spotify Cracked App", Price:"2000", star:<svg width="80" height="16" viewBox="0 0 80 16" fill="none" >
<g clipPath="url(#clip0_709_914)">
<path d="M8.00016 1.33301L10.0602 5.50634L14.6668 6.17967L11.3335 9.42634L12.1202 14.013L8.00016 11.8463L3.88016 14.013L4.66683 9.42634L1.3335 6.17967L5.94016 5.50634L8.00016 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip1_709_914)">
<path d="M24.0002 1.33301L26.0602 5.50634L30.6668 6.17967L27.3335 9.42634L28.1202 14.013L24.0002 11.8463L19.8802 14.013L20.6668 9.42634L17.3335 6.17967L21.9402 5.50634L24.0002 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip2_709_914)">
<path d="M40.0002 1.33301L42.0602 5.50634L46.6668 6.17967L43.3335 9.42634L44.1202 14.013L40.0002 11.8463L35.8802 14.013L36.6668 9.42634L33.3335 6.17967L37.9402 5.50634L40.0002 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip3_709_914)">
<path d="M56.0002 1.33301L58.0602 5.50634L62.6668 6.17967L59.3335 9.42634L60.1202 14.013L56.0002 11.8463L51.8802 14.013L52.6668 9.42634L49.3335 6.17967L53.9402 5.50634L56.0002 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip4_709_914)">
<path d="M72.0002 1.33301L74.0602 5.50634L78.6668 6.17967L75.3335 9.42634L76.1202 14.013L72.0002 11.8463L67.8802 14.013L68.6668 9.42634L65.3335 6.17967L69.9402 5.50634L72.0002 1.33301Z" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_709_914">
<rect width="16" height="16" fill="white"/>
</clipPath>
<clipPath id="clip1_709_914">
<rect width="16" height="16" fill="white" transform="translate(16)"/>
</clipPath>
<clipPath id="clip2_709_914">
<rect width="16" height="16" fill="white" transform="translate(32)"/>
</clipPath>
<clipPath id="clip3_709_914">
<rect width="16" height="16" fill="white" transform="translate(48)"/>
</clipPath>
<clipPath id="clip4_709_914">
<rect width="16" height="16" fill="white" transform="translate(64)"/>
</clipPath>
</defs>
</svg>, cartText:"Limited",href:"", img:HeroImg2},{id:4, text:"Marketing 101 (How to Perfectly Run Sponsored Ads On Instagram and meta)", Price:"100k", star:<svg width="80" height="16" viewBox="0 0 80 16" fill="none" >
<g clipPath="url(#clip0_709_914)">
<path d="M8.00016 1.33301L10.0602 5.50634L14.6668 6.17967L11.3335 9.42634L12.1202 14.013L8.00016 11.8463L3.88016 14.013L4.66683 9.42634L1.3335 6.17967L5.94016 5.50634L8.00016 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip1_709_914)">
<path d="M24.0002 1.33301L26.0602 5.50634L30.6668 6.17967L27.3335 9.42634L28.1202 14.013L24.0002 11.8463L19.8802 14.013L20.6668 9.42634L17.3335 6.17967L21.9402 5.50634L24.0002 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip2_709_914)">
<path d="M40.0002 1.33301L42.0602 5.50634L46.6668 6.17967L43.3335 9.42634L44.1202 14.013L40.0002 11.8463L35.8802 14.013L36.6668 9.42634L33.3335 6.17967L37.9402 5.50634L40.0002 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip3_709_914)">
<path d="M56.0002 1.33301L58.0602 5.50634L62.6668 6.17967L59.3335 9.42634L60.1202 14.013L56.0002 11.8463L51.8802 14.013L52.6668 9.42634L49.3335 6.17967L53.9402 5.50634L56.0002 1.33301Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<g clipPath="url(#clip4_709_914)">
<path d="M72.0002 1.33301L74.0602 5.50634L78.6668 6.17967L75.3335 9.42634L76.1202 14.013L72.0002 11.8463L67.8802 14.013L68.6668 9.42634L65.3335 6.17967L69.9402 5.50634L72.0002 1.33301Z" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_709_914">
<rect width="16" height="16" fill="white"/>
</clipPath>
<clipPath id="clip1_709_914">
<rect width="16" height="16" fill="white" transform="translate(16)"/>
</clipPath>
<clipPath id="clip2_709_914">
<rect width="16" height="16" fill="white" transform="translate(32)"/>
</clipPath>
<clipPath id="clip3_709_914">
<rect width="16" height="16" fill="white" transform="translate(48)"/>
</clipPath>
<clipPath id="clip4_709_914">
<rect width="16" height="16" fill="white" transform="translate(64)"/>
</clipPath>
</defs>
</svg>, cartText:"Popular",href:"", img:HeroImg3}]
  return (
    <div className='featPro'>
      <div className='featuredText'><span className="FP">Featured Products</span><span className=""><a href="" className="FPLink"></a></span></div>

      <div className='featuredProductDiv'>
        {featuredProducts.map((app)=>(
        <div className='featuredProductCard' key={app.id}>
           <div className='featuredProductCardImageDiv'>
            <Image
        src={app.img}
        alt="Hero Image"

        className="img"
       
      />
            
            <div className='featuredProductCardBestSell'>{app.cartText}</div>
            <div className='featuredProductCardAddToCart'> 
  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" >
<g clipPath="url(#clip0_709_899)">
<path d="M5.57145 14.6663C5.93964 14.6663 6.23812 14.3679 6.23812 13.9997C6.23812 13.6315 5.93964 13.333 5.57145 13.333C5.20326 13.333 4.90479 13.6315 4.90479 13.9997C4.90479 14.3679 5.20326 14.6663 5.57145 14.6663Z" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.9049 14.6663C13.2731 14.6663 13.5716 14.3679 13.5716 13.9997C13.5716 13.6315 13.2731 13.333 12.9049 13.333C12.5368 13.333 12.2383 13.6315 12.2383 13.9997C12.2383 14.3679 12.5368 14.6663 12.9049 14.6663Z" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M1.60498 1.36621H2.93831L4.71165 9.64621C4.7767 9.94945 4.94543 10.2205 5.18879 10.4128C5.43215 10.605 5.73492 10.7064 6.04498 10.6995H12.565C12.8684 10.6991 13.1626 10.5951 13.399 10.4048C13.6354 10.2145 13.7997 9.94923 13.865 9.65288L14.965 4.69954H3.65165" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_709_899">
<rect width="16" height="16" fill="white" transform="translate(0.238281)"/>
</clipPath>
</defs>
</svg>            
<span>Get Now</span></div>
            <div className='featuredProductCardLoveIcone'><svg width="17" height="16" viewBox="0 0 17 16" fill="none">
<g clipPath="url(#clip0_709_978)">
<path d="M13.1668 9.33333C14.1602 8.36 15.1668 7.19333 15.1668 5.66667C15.1668 4.69421 14.7805 3.76158 14.0929 3.07394C13.4053 2.38631 12.4726 2 11.5002 2C10.3268 2 9.50016 2.33333 8.50016 3.33333C7.50016 2.33333 6.6735 2 5.50016 2C4.5277 2 3.59507 2.38631 2.90744 3.07394C2.2198 3.76158 1.8335 4.69421 1.8335 5.66667C1.8335 7.2 2.8335 8.36667 3.8335 9.33333L8.50016 14L13.1668 9.33333Z" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_709_978">
<rect width="16" height="16" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>
</div>
           </div>
           <div className='divGuide'>
           <p className='featuredProductCardText'>{app.text}</p>
           <div className='featuredProductCardStar'>{app.star}<span style={{color:"gray",fontSize:'12px'}}>4.5</span></div>
           <div className='featuredProductCardPrice'>{app.id === 4?<><span className="priceSlash">₦{app.Price}</span>{" "}<span>Free</span></>:<span>₦{app.Price}</span>}</div>
           </div>
        </div>
        ))}
      </div>

    </div>
  )
}

export default index;