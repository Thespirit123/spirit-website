
import "./footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTelegram, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons'




const Footer = () => {
  // const handleUtilityClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   e.preventDefault();
  //   toast("Utility payments coming soon!", {
  //     icon: "🚧",
  //     style: {
  //       borderRadius: "10px",
  //       background: "#333",
  //       color: "#fff",
  //     },
  //     duration: 3000,
  //   });
  // };

  const quickLinks = [{ id: 1, text: "About Us", href: "" }, { id: 2, text: "Contact", href: "" }, { id: 3, text: "Terms", href: "/terms-and-conditions" }]
  const serviceLinks = [{ id: 1, text: "Movie Portal", href: "/movie-portal" }, { id: 2, text: "Utility Payments", href: "/utility-payment" }, { id: 3, text: "WhatsApp Monitoring", href: "/whatsapp-tool" }, { id: 4, text: "Virtual Numbers", href: "/international-numbers" }, { id: 5, text: "SMS Verification", href: "" }, { id: 6, text: "Support", href: "" }]
  const footerSocialLinks = [{ id: 1, icon: faTelegram, href:"https://t.me/Thespiritupdates" }, { id: 2, icon: faWhatsapp,href:"https://chat.whatsapp.com/IZ9kgz1qkJW4wpDZl36KwR" }, { id: 3, icon: faInstagram, href:"https://www.instagram.com/thespiritupdates?igsh=M3B3czdrMjAyMmMz" }]
  return (
    <footer className="relative">
     
      <div className="FooterMain">
        <div className="FooterDiv">
          <div className=" footerDivHeader footerDivHeader1">
            <ul className="">
              <li><div className="sectionHeader">Spirit Media</div></li>
              <li><p className="textDescription">Providing innovative digital solutions at your finger since 2015</p></li>
              <li>
                <div className="SocialIconsDiv">
                  {footerSocialLinks.map((app) => (
                    <a key={app.id} href={app.href}  target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={app.icon} className="socialBrandIcons" /></a>
                  ))}

                </div>
              </li>
            </ul>
          </div>
          <div className="footerDivHeader">
            <ul>
              <li><div className="sectionHeader"> Company</div></li>
              {quickLinks.map((app, id) => (
                <li key={id} className="footerList"><a href={app.href} className="footerLinks">{app.text}</a></li>
              ))}

            </ul>
          </div>
          <div className="footerDivHeader">
            <ul>
              <li><div className="sectionHeader">Services</div></li>
              {serviceLinks.map((app, id) => (
                <li key={id} className="footerList"><a href={app.href} className="footerLinks">{app.text}</a></li>
              ))}
            </ul>

          </div>
          <div className="footerDivHeader">
            <ul>
              <li><div className="sectionHeader">Contact Us</div></li>
              <li><div className="textDescription h"><svg width="21" height="20" viewBox="0 0 21 20" fill="none" >
                <g clipPath="url(#clip0_712_1733)">
                  <path d="M16.9165 3.33301H3.58317C2.6627 3.33301 1.9165 4.0792 1.9165 4.99967V14.9997C1.9165 15.9201 2.6627 16.6663 3.58317 16.6663H16.9165C17.837 16.6663 18.5832 15.9201 18.5832 14.9997V4.99967C18.5832 4.0792 17.837 3.33301 16.9165 3.33301Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.5832 5.83301L11.1082 10.583C10.8509 10.7442 10.5534 10.8297 10.2498 10.8297C9.94624 10.8297 9.64878 10.7442 9.3915 10.583L1.9165 5.83301" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_712_1733">
                    <rect width="20" height="20" fill="white" transform="translate(0.25)" />
                  </clipPath>
                </defs>
              </svg>
                <span className=""><a href="mailto:theespiritmedia@gmail.com">Theespiritmedia@gmail.com</a></span></div></li>
              <li><div className="textDescription h"><svg width="21" height="20" viewBox="0 0 21 20" fill="none" >
                <path d="M18.5832 14.1004V16.6004C18.5841 16.8325 18.5366 17.0622 18.4436 17.2749C18.3506 17.4875 18.2143 17.6784 18.0433 17.8353C17.8722 17.9922 17.6703 18.1116 17.4505 18.186C17.2306 18.2603 16.9977 18.288 16.7665 18.2671C14.2022 17.9884 11.739 17.1122 9.57486 15.7087C7.56139 14.4293 5.85431 12.7222 4.57486 10.7087C3.16651 8.53474 2.29007 6.05957 2.01653 3.48374C1.9957 3.2533 2.02309 3.02104 2.09695 2.80176C2.1708 2.58248 2.28951 2.38098 2.4455 2.21009C2.6015 2.0392 2.79137 1.90266 3.00302 1.80917C3.21468 1.71569 3.44348 1.66729 3.67486 1.66707H6.17486C6.57928 1.66309 6.97136 1.80631 7.278 2.07002C7.58464 2.33373 7.78493 2.69995 7.84153 3.10041C7.94705 3.90046 8.14274 4.68601 8.42486 5.44207C8.53698 5.74034 8.56125 6.0645 8.49478 6.37614C8.42832 6.68778 8.27392 6.97383 8.04986 7.20041L6.99153 8.25874C8.17783 10.345 9.90524 12.0724 11.9915 13.2587L13.0499 12.2004C13.2764 11.9764 13.5625 11.8219 13.8741 11.7555C14.1858 11.689 14.5099 11.7133 14.8082 11.8254C15.5643 12.1075 16.3498 12.3032 17.1499 12.4087C17.5547 12.4658 17.9244 12.6697 18.1886 12.9817C18.4529 13.2936 18.5933 13.6917 18.5832 14.1004Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
                <span className="">+234 903 5745 258</span></div></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="SpiritMediaCopyRight">© 2025 Spirit Media. All Rights Reserved</div>

    </footer>
  );
};

export default Footer;
