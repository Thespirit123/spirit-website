import React from 'react'
import "./slides.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegram, faWhatsapp, faInstagram,faFacebook,faXTwitter,faLinkedin,faSnapchat,faGoogle } from '@fortawesome/free-brands-svg-icons'

const Slides = () => {
	const content=[{id:1,text:"Whatsapp",text1:"1M+ users",icon: faWhatsapp},{id:2,text:"Instagram",text1:"800k+ users",icon: faInstagram},{id:3,text:"Facebook",text1:"900k+ users",icon: faFacebook},{id:4,text:"Telegram",text1:"500k+ users",icon: faTelegram},{id:5,text:"Snapchat",text1:"400k+ users",icon:faSnapchat},{id:6,text:"Google",text1:"1.2M+ users",icon: faGoogle},{id:7,text:"Twitter",text1:"600k+ users",icon:faXTwitter},{id:8,text:"LinkedIn",text1:"300k+ users",icon: faLinkedin},{id:9,text:"Whatsapp",text1:"1M+ users",icon:faWhatsapp},{id:10,text:"Instagram",text1:"800k+ users",icon: faInstagram},{id:11,text:"Facebook",text1:"900k+ users",icon:faFacebook},{id:12,text:"Telegram",text1:"500k+ users",icon:faTelegram},{id:13,text:"Snapchat",text1:"400k+ users",icon:faSnapchat},{id:14,text:"Google",text1:"1.2M+ users",icon:faGoogle}]
  return (
    <div>
<div className="slider">
	<div className="slide-track">

{content.map((app)=>(
		<div className="slide" key={app.id}>
			<div  className="ccl">
			{/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png" height="100" width="250" alt="" /> */}
			<div><FontAwesomeIcon icon={app.icon}  style={{fontSize:"22px"}}/></div>
            <div style={{fontSize:"20px", fontWeight:'600'}} >{app.text}</div>
			<div className="usersDiv">{app.text1}</div>
			</div>
		</div>
		))}
		
			

	</div>
</div>

    </div>
  )
}

export default Slides