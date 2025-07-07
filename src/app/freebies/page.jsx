"use client";

import React, {useState, useEffect} from 'react'
import "./section.css"
import axios from "axios";

// import { pdfFiles } from '../../lib/pdfFiles';
// import { pdfArray } from "@/utils/pdfArray";
import Image from "next/image";
import ContentImage from "@/assets/images/freebies1.jpeg";
import ContentImage1 from "@/assets/images/freebies3.jpeg";
import ContentImage2 from "@/assets/images/freebies7.jpeg";
import ContentImg from "@/assets/images/freebies6.jpeg";
import ContentImag from "@/assets/images/freebies5.jpeg";
import ContentImag1 from "@/assets/images/freebies4.jpeg";
import ContentImag2 from "@/assets/images/freebies2.jpeg";

const form = () => {

  // const textLink = [{id:1,text:"All Resources", section:""},{id:2,text:"Health", section:""},{id:3,text:"Wealth", section:""},{id:4,text:"Mindset", section:""},{id:5,text:"Sex", section:""},{id:6,text:"Tools", section:""}]
  const featuredFreebies = [{id:1,text:"How To Perfectly Run Sponsored Ads On Meta & Instagram",text1:'500 downloads', img:ContentImag},{id:2,text:"How To Make A Girl Experience Orgasm",text1:'3500 downloads',img:ContentImag1}]
  const featuredFreebies1 = [{id:1,text:'Auto Responder for WhatsApp',text1:'No more stress! Our premium auto responder replies to all your clients instantly - on the go.',text2:'2,547 downloads',text3:'Tools',text4:'Requires Email',img:ContentImage2, category:"Tools"},
    {id:2,text:'How to Perfectly Run Sponsored Ads on Meta & Instagram',text1:"Discover the hidden secrets your mentors won't tell you. This free course gives you real insights into running effective sponsored ads.",text2:'1.823 downloads',text3:'Wealth',text4:'Requires Telegram',img:ContentImag, category:"Wealth"},
    {id:3,text:'How to Make a Girl Experience Orgasm', text1:'Learn how truly satisfy the woman you love. This guide teaches you how to help her climax and enjoy intense pleasure.', text2:'3,102 downloads',text3:'Sex',text4:'Requires Email',img:ContentImag1, category:"Sex"},
    {id:4,text:'Attia - Outline',text1:"Health is Wealth isn't just a saying. Peter Attia's book shows you how to live a longer purposeful life.",text2:'3,102 downloads',text3:'Health',text4:'Requires Email', img:ContentImg, category:"Health"},
    {id:5,text:"Alex's Books on Offers and Leads",text1:'Forget overpriced marketing courses. These books give you practical strategies that actually work. ',text2:'3,102 downloads',text3:'Wealth',text4:'Requires Email',img:ContentImage1, category:"Wealth"},
  {id:6,text:'The Richest Man in Babylon',text1:'The first book that changed how I see money. Its storytelling approach teaches timeless lessons on building wealth.',text2:'3,102 downloads',text3:'Wealth',text4:'Requires Email',img:ContentImag2, category:"Wealth"},
{id:7,text:'Letters from a Stoic',text1:'The godfather of stoicism breaks it down in this classic. Timeless Wisdom for a better, calmer life. ',text2:'3,102 downloads',text3:'Mindset',text4:'Requires Email',img:ContentImage, category:"Mindset"}]

const [selectedCategory,setSelectedCategory] = useState("All Resources");
const categories = ["All Resources", ...new Set(featuredFreebies1.map(item =>item.category))]
const filteredInfo = selectedCategory === "All Resources" ? featuredFreebies1 : featuredFreebies1.filter(item => item.category === selectedCategory)
const [show,setShow] = useState(false)
const [modalName,setModalName] = useState("")

const [form, setForm] = useState({ name: '', email: '', phone: '', pdfHeader: "" });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value, pdfHeader: modalName});
  };

  

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending...");
   
    try {
      const res = await axios.post("/api/submit", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };


 

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

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
        <p className='brs1'>Join 50,000+ creators who've  downloaded our free resources.</p>
      </div>
      </div>

      <div className='contentSec'>
        <div className="TT">
        <div className="Tare">
        <div className='contentSec1'>
        {categories.map((app)=>(
            <div key={app} onClick={()=>setSelectedCategory(app)} className='contentSec2' style={{background:selectedCategory === app?"#00859e" : "",color:selectedCategory === app ? "#fff" : "#000"}}>{app}</div>
            ))}
        </div>
        </div>
        </div>
        <div className=''>
        <div className='FFee' data-aos="fade-up" data-aos-delay="100">
          {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
<path d="M9.99984 1.66699L12.5748 6.88366L18.3332 7.72533L14.1665 11.7837L15.1498 17.517L9.99984 14.8087L4.84984 17.517L5.83317 11.7837L1.6665 7.72533L7.42484 6.88366L9.99984 1.66699Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg> */}
<span>Featured Freebies</span></div>
<div style={{padding:"0px 15px"}}><div className="lineBr"></div></div>
<div className="bvn">
        <div className='ArticleSec2'>
          {featuredFreebies.map((app)=>(
           <div key={app.id} className='ArticleSec' data-aos="fade-up" data-aos-delay="100">
                   
            <Image src={app.img} alt="section Image" className="imag" />
          
            <div className="DivOnAbsolute">
           <p className="pText like">{app.text}</p>
           <p className="pText1 like">{app.text1}</p>
           </div>
           <div className="llm"></div>
     
           </div>
           ))}
           
        </div>
        </div>
        <div className='CopTu'>
        <div className='componentSec'>
          {filteredInfo.map((app)=>(
            <div key={app.id} className='componentSec1' data-aos="fade-up" data-aos-delay="100" >
              <div className="cardUnit">
               <Image src={app.img} alt="Freebies Image" width="500" height="500"  style={{objectFit:"cover"}} className="cardImg"/>
              <div className='cardUnit1'>
                  <div className='cardUnit2 opp'><svg width="17" height="17" viewBox="0 0 17 17" fill="none" >
<path d="M14.6094 10.3047V12.9714C14.6094 13.325 14.4689 13.6641 14.2189 13.9142C13.9688 14.1642 13.6297 14.3047 13.276 14.3047H3.94271C3.58909 14.3047 3.24995 14.1642 2.9999 13.9142C2.74985 13.6641 2.60938 13.325 2.60938 12.9714V10.3047" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.27588 6.97168L8.60921 10.305L11.9425 6.97168" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.60938 10.3047V2.30469" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
<span className="DN" onClick={()=>{setShow(!show), setModalName(app.text)}}>Download Now</span></div>
                  <div className=''>
                   
</div>
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
                <div className="LLcc">{app.text3}</div>
                 <div className="lmk">{app.text4}</div>
              </div>
              </div>

            </div>
          ))}
        </div>
        </div>

        </div>
      </div>

      {show ?
      <div>
      <div className='modalLH'  onClick={()=>setShow(!show)}></div>

        <div className='modalL1'>
          <div className='modalForFreebies'>

           <div className="iconCloseModal"> <svg  width="24" height="24" viewBox="0 0 24 24"   onClick={()=>setShow(!show)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="featherCloseIcon"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
           <div className="ModalHeader" >{modalName}</div>
           <div><input  type="text" name="file" className='modalInput' value={modalName} readOnly onClick={handleChange} style={{display:"none"}} /></div>
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
        <div><button className="modalSubmit" onClick={handleSubmit}>Submit</button></div>
        {message && <p>{message}</p>}
        </div>
        </div>


      </div>
      :""}
        
    </div>
  )
}

export default form;