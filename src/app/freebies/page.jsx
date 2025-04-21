import React from 'react'
import "./section.css"
import Image from "next/image";
import ContentImage from "@/assets/images/Image.png";
import ContentImg from "@/assets/images/Image.png";
import ContentImag from "@/assets/images/FreeB.png";
import ContentImag1 from "@/assets/images/freeB1.png";
import ContentImag2 from "@/assets/images/freeB2.png";

const form = () => {

  const textLink = [{id:1,text:"All Resources", section:""},{id:2,text:"Templates", section:""},{id:3,text:"Graphics", section:""},{id:4,text:"Tools", section:""},{id:5,text:"UI Kits", section:""},{id:6,text:"Mockups", section:""}]
  const featuredFreebies = [{id:1,text:"Premium UI Kit",text1:'500 downloads', img:ContentImag},{id:2,text:"Icon Pack Essential",text1:'3500 downloads',img:ContentImag1}]
  const featuredFreebies1 = [{id:1,text:'Essential UI Component Pack',text1:'A comprehensive collection of React components for modern web applications',text2:'2,547 downloads',text3:'UI kits',text4:'Required Email',img:ContentImag},{id:2,text:'Social Media Template Kit',text1:'Ready-to-use social media templates for Instagram and Facebook.',text2:'1.823 downloads',text3:'templates',text4:'',img:ContentImag1},{id:3,text:'Dashboard Wireframe Kit',text1:'Professional wireframe templates for dashboard design',text2:'3,102 downloads',text3:'mockups',text4:'Required email',img:ContentImag2}]
  return (
    <div >
      {/* section ! hero section */}
      <div className = "lk">
      <div className="Section11">
        <p className='PreRes'>Premium Resources,</p>
        <p className='PreRes1 '>Completely Free</p>
        <p className='PreRes2'>Download high-quality digital resources to enhance your projects.No strings attached </p>
        <div className='Dbrs'>
          <div className='brs row'>Browse All Freebies</div>
          <div className='brs row1'>View Categories</div>
        </div>
        <p className='brs1'>Join 50,000+ creators who've  downloaded our free resources</p>
      </div>
      </div>

      <div className='contentSec'>
        <div className="TT">
        <div className="Tare">
        <div className='contentSec1'>
        {textLink.map((app)=>(
            <div key={app.id}  className='contentSec2' style={{background:app.id === 1?"#00859e":"",color:app.id === 1?"#fff":"#00"}}>{app.text}</div>
            ))}
        </div>
        </div>
        </div>
        <div className=''>
        <div className='FFee'>
          {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
<path d="M9.99984 1.66699L12.5748 6.88366L18.3332 7.72533L14.1665 11.7837L15.1498 17.517L9.99984 14.8087L4.84984 17.517L5.83317 11.7837L1.6665 7.72533L7.42484 6.88366L9.99984 1.66699Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg> */}
<span>Featured Freebies</span></div>
<div style={{padding:"0px 10px"}}><div className="lineBr"></div></div>
<div className="bvn">
        <div className='ArticleSec2'>
          {featuredFreebies.map((app)=>(
           <div key={app.id} className='ArticleSec'>
                   
            <Image src={app.img} alt="section Image" className="imag"/>
          
            <div className="DivOnAbsolute">
           <p className="pText like">{app.text}</p>
           <p className="pText1 like">{app.text1}</p>
           </div>
           <div className="llm"></div>
     
           </div>
           ))}
           
        </div>
        </div>
        <div className='componentSec'>
          {featuredFreebies1.map((app)=>(
            <div key={app.id} className='componentSec1'>
              <div className="cardUnit">
               <Image src={app.img} alt="Freebies Image" width="500" height="500"  style={{objectFit:"cover"}} className="cardImg"/>
              <div className='cardUnit1'>
                  <div className='cardUnit2 opp'><svg width="17" height="17" viewBox="0 0 17 17" fill="none" >
<path d="M14.6094 10.3047V12.9714C14.6094 13.325 14.4689 13.6641 14.2189 13.9142C13.9688 14.1642 13.6297 14.3047 13.276 14.3047H3.94271C3.58909 14.3047 3.24995 14.1642 2.9999 13.9142C2.74985 13.6641 2.60938 13.325 2.60938 12.9714V10.3047" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.27588 6.97168L8.60921 10.305L11.9425 6.97168" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.60938 10.3047V2.30469" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
<span className="DN">Download Now</span></div>
                  <div className='cardUnit2 opp1'><svg width="17" height="17" viewBox="0 0 17 17" fill="none" >
<g clipPath="url(#clip0_712_1921)">
<path d="M1.78874 8.53693C1.73318 8.38725 1.73318 8.2226 1.78874 8.07293C2.32987 6.76083 3.24842 5.63895 4.42792 4.84953C5.60742 4.0601 6.99477 3.63867 8.41407 3.63867C9.83338 3.63867 11.2207 4.0601 12.4002 4.84953C13.5797 5.63895 14.4983 6.76083 15.0394 8.07293C15.095 8.2226 15.095 8.38725 15.0394 8.53693C14.4983 9.84902 13.5797 10.9709 12.4002 11.7603C11.2207 12.5498 9.83338 12.9712 8.41407 12.9712C6.99477 12.9712 5.60742 12.5498 4.42792 11.7603C3.24842 10.9709 2.32987 9.84902 1.78874 8.53693Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.41406 10.3047C9.51863 10.3047 10.4141 9.40926 10.4141 8.30469C10.4141 7.20012 9.51863 6.30469 8.41406 6.30469C7.30949 6.30469 6.41406 7.20012 6.41406 8.30469C6.41406 9.40926 7.30949 10.3047 8.41406 10.3047Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_712_1921">
<rect width="16" height="16" fill="white" transform="translate(0.414062 0.304688)"/>
</clipPath>
</defs>
</svg>
<span>Preview</span></div>
              </div>
              <div className="Um1"></div>
              </div>
              <div className="cc">
              <div className="cc1">
                <div className="textCc">{app.text}</div>
                 <div className="textCc2">{app.text2}</div>
              </div>

              <div className="cc2">{app.text1}</div>

               <div className="cc1">
                <div className="">{app.text3}</div>
                 <div className="lmk">{app.text4}</div>
              </div>
              </div>

            </div>
          ))}
        </div>

        </div>
      </div>
        
    </div>
  )
}

export default form;