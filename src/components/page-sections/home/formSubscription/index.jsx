
// // import React from 'react'
// // import "./form.css"

// // const Index = () => {
// //   return (
// //     <div>
// //         <div className="emailSubscriptionDiv">
// //   <div  className="">
// //     <p  className="emailSubscriptionTitle">Stay Updated</p>
// //     <p  className="emailSubscriptionText">Subscribe to our newsletter for exclusive deals and updates</p>
// //     <div  className="FormControlDiv">
// //       <div  className="FormControlDiv1"><input  className="" type="email" placeholder="Enter your email"/></div>
// //       <div  className="FormControlDiv2"><button  className="">Subscribe</button></div>
// //     </div>
// //     <p  className="emailSubscriptionText">By subscribing, you agree to our Privacy Policy and consent to receive updates from our company</p>
// //   </div> 
// // </div>



// //     </div>
// //   )
// // }

// // export default Index;

// import React, { useState } from 'react';
// import './form.css';
// import axios from 'axios';

// const Index = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [email, setEmail] = useState('');
//   const [modalMessage, setModalMessage] = useState('');
//   const [loading,setLoading] = useState(false)

//   const handleSubscribe = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       const response = await axios.post('/api/subscription', { email });

//       if (response.status === 200) {
//         setModalMessage("Subscription successful. Please check your email.");
//         setShowModal(true);
//         setLoading(false)
        
//         setTimeout(() => setShowModal(false), 3000);
//       }
//     } catch (error) {
//       setModalMessage("Subscription failed. Try again later.");
//       setShowModal(true);
//       setLoading(false)
//       setTimeout(() => setShowModal(false), 3000);
//       console.error(error);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div>
//       <div className="emailSubscriptionDiv">
//         <div>
//           <p className="emailSubscriptionTitle">Stay Updated</p>
//           <p className="emailSubscriptionText">
//             Subscribe to our newsletter for exclusive deals and updates
//           </p>
//           <div className="FormControlDiv">
//             <div className="FormControlDiv1">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="FormControlDiv2">
//               <button onClick={handleSubscribe}>{ loading ? "submitting" : "Subscribe"}

//               </button>
//             </div>
//           </div>
//           <p className="emailSubscriptionText">
//             By subscribing, you agree to our Privacy Policy and consent to receive updates from our company
//           </p>
//         </div>
//       </div>

//       {showModal && (
//         <div className="modalOverlay" onClick={closeModal}>
//           <div className="modalBox" onClick={(e) => e.stopPropagation()}>
//             <p className="modalText">{modalMessage}</p>
//             <button className="closeButton" onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Index;


import React, { useState } from 'react';
import './form.css';
import axios from 'axios';

const Index = () => {
  const [email, setEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/subscription', { email });

      if (response.status === 200) {
         setEmail('');
        setModalMessage(' Subscription successful. Please check your email.');
       
      } else {
        setModalMessage(' Subscription failed. Try again later.');
      }
    } catch (error) {
      setModalMessage(' Subscription failed. Try again later.');
      console.error(error);
    } finally {
      setShowModal(true);
      setLoading(false);
      setTimeout(() => {
        setShowModal(false)
        setEmail("")
      }
      , 3000);
    }
  };

  return (
    <div className="emailSubscriptionDiv">
      <div>
        <h2 className="emailSubscriptionTitle">Stay Updated</h2>
        <p className="emailSubscriptionText">
          Subscribe to our newsletter for exclusive deals and updates
        </p>

        <form className="FormControlDiv" >
          <div className="FormControlDiv1">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="FormControlDiv2"   onClick={handleSubscribe} >
            <button  disabled={loading} >
              {loading ? 'Submitting...' : 'Subscribe'}
            </button>
          </div>
        </form>

        <p className="emailSubscriptionText">
          By subscribing, you agree to our <a href="/privacy-policy">Privacy Policy</a> and consent to receive updates from our company.
        </p>
      </div>

      {showModal && (
        <div className="modalOverlay" onClick={() => setShowModal(false)}>
          <div className="modalBox" onClick={(e) => e.stopPropagation()}>
            <p className="modalText">{modalMessage}</p>
            <button className="closeButton" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;

