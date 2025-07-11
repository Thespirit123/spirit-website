'use client';

import React, {useState} from "react"
import Carousel from "react-multi-carousel";
import HeroImg from "/public/Image8.png";
import HeroImg1 from "/public/sliderImage.jpeg";
import HeroImg2 from "/public/sliderImage1.jpeg";
import HeroImg3 from "/public/freebiesHeroCaro.jpeg";
import HeroImg4 from "/public/airimeB.jpg";

import Image from "next/image";
import "./carousel.css"

import "react-multi-carousel/lib/styles.css";


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1 
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 
  }
};


  const CarouselDiv =({onExplore})=>{

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
        <div className="BB"><button  className="NewArrivalD3" onClick={onExplore} >Explore Our Products</button></div>
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
           
              className="sectionImg4"
              
            />
    
  </div>
  </div>
  <div >
  <div  className="section1">
     <Image
              src={HeroImg2}
              alt="Hero Screens"
            
             
              className="sectionImg4"
              
            />
        
  </div>
  </div>
 <div >
  <div  className="section1">
     <Image
              src={HeroImg3}
              alt="Hero Screens"
           
              className="sectionImg4"
              
            />
    
  </div>
  </div>

   <div >
  <div  className="section1">
     <Image
              src={HeroImg4}
              alt="Hero Screens"
           
              className="sectionImg4"
              
            />
    
  </div>
  </div>
  
</Carousel>

</div>


        </div>
    )
}

export default CarouselDiv;
