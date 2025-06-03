'use client';

import React, {useState} from "react"
import Carousel from "react-multi-carousel";
import HeroImg from "/public/Image8.png";
import HeroImg1 from "/public/caroIM.png";
import HeroImg2 from "/public/caroIM1.jpg";
import Image from "next/image";
import "./carousel.css"

import "react-multi-carousel/lib/styles.css";


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1.5,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1.4,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1.3,
    slidesToSlide: 1 // optional, default to 1.
  }
};


const CarouselDiv =()=>{

 const {deviceType,setDeviceType} = useState("mobile")
 
    return(
        <div>

          <div >
     <div className="section2M" style={{paddingTop:"60px"}}>
       <Image
              src={HeroImg}
              alt="Hero Screens"
             
              className="sectionImg"
              
            />
            <div  className="NewArrivalD">
        <div  className="NewArrivalD1">Your Plug For Foreign Numbers, Bill Payments, Movies & <span style={{color:'#008ea8'}}>More!</span></div>
        <p  className="NewArrivalD2">Get everything you need in one place.</p>
        <div  className="NewArrivalD3">Explore Our Products</div>
        </div>
     </div>
  </div>

<div style={{marginTop:'8px'}}>
                 <Carousel
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlay={deviceType !== "mobile" ? true : false}
  autoPlaySpeed={3000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  deviceType={deviceType}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
  
  <div >
  <div  className="section1">
     <Image
              src={HeroImg1}
              alt="Hero Screens"
           
              className="sectionImg"
              
            />
    
  </div>
  </div>
  <div >
  <div  className="section1">
     <Image
              src={HeroImg2}
              alt="Hero Screens"
            
             
              className="sectionImg"
              
            />
        
  </div>
  </div>
 <div >
  <div  className="section1">
     <Image
              src={HeroImg1}
              alt="Hero Screens"
           
              className="sectionImg"
              
            />
    
  </div>
  </div>
   <div >
  <div  className="section1">
     <Image
              src={HeroImg2}
              alt="Hero Screens"
            
             
              className="sectionImg"
              
            />
        
  </div>
  </div>
</Carousel>

</div>


        </div>
    )
}


export default CarouselDiv;