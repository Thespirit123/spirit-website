import React from 'react'
import "./servicesSection.css"

const servicesSection = () => {
const cardItemDetail =[
        {
        id: 1, bg:"#3B82F6", icon:  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                <path d = "M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke = "#fff" strokeWidth = "2" strokeLinecap = "round" strokeLinejoin = "round" />
                      <path d="M7 3V21" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 7.5H7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 12H21" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 16.5H7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17 3V21" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17 7.5H21" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17 16.5H21" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg > , title: "Movie Portal", description: "Unlock unlimited entertainment with our comprehensive movie streaming platform. Access a vast library of films across genres, enjoy high-quality streaming, and discover new cinematic experiences anytime, anywhere.", href:"/movie-portal"},
    {
            id: 2,bg:"#22C55E", icon: <svg width="25" height="24" viewBox="0 0 25 24" fill="none" >
< path d = "M20.3281 5H4.32812C3.22356 5 2.32812 5.89543 2.32812 7V17C2.32812 18.1046 3.22356 19 4.32812 19H20.3281C21.4327 19 22.3281 18.1046 22.3281 17V7C22.3281 5.89543 21.4327 5 20.3281 5Z" stroke = "white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.32812 10H22.3281" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg >
, title: "Utility Payments", description: "Handle all your credit and debit transactions at your fingertips. Quickly recharge your phone, support multiple payment networks, and stay connected with our seamless and secure online top- up service.", href:"/utility-payment"},
    {
        id: 3, bg:"#A855F7", icon: <svg width="25" height="24" viewBox="0 0 25 24" fill="none" >
< path d = "M21.6641 15C21.6641 15.5304 21.4533 16.0391 21.0783 16.4142C20.7032 16.7893 20.1945 17 19.6641 17H7.66406L3.66406 21V5C3.66406 4.46957 3.87478 3.96086 4.24985 3.58579C4.62492 3.21071 5.13363 3 5.66406 3H19.6641C20.1945 3 20.7032 3.21071 21.0783 3.58579C21.4533 3.96086 21.6641 4.46957 21.6641 5V15Z" stroke = "white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg >
, title: "WhatsApp Monitoring Tool", description: "Advanced communication tracking designed for personal and professional insights. Monitor messages, calls, and digital interactions with discretion and precision.", href: "/whatsapp-tool" }
]



      return (
    <div className="MainDiv">

        <div className='OurServiceText'>Our Services</div>
    <div className='cardMainDiv'>

        {cardItemDetail.map((app, id)=>(
        <div className='cardItem' key={id}>
                  <div className="cardIcon" style={{background:app.bg}}>{app.icon} 
                   
</div>
            <p className='cardTitle'>{app.title}</p>
              <p className='cardDescription'>{app.description}</p>
                      <div className='ExploreButton'><button>Learn More </button><svg width="17" height="16" viewBox="0 0 17 16" fill="none" >
                          <path d="M6.72656 3.33301L11.3932 7.99967L6.72656 12.6663" stroke="#0F172A" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
</div>
        </div>
        ))}
    </div>
        
    </div>
  )
}

export default servicesSection