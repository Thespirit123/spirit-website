"use client";

import React, { useState } from "react";
// import './contact.css';


const Questions = () =>{
    const [faqOne, setFaqOne] = useState(false);
    const [faqTwo, setFaqTwo] = useState(false);
    const [faqThree, setFaqThree] = useState(false);
    const [faqFour, setFaqFour] = useState(false);
    const [faqFive, setFaqFive] = useState(false);

    const faqInfo = [
        {id:1, click: ()=> setFaqOne(!faqOne), test: 'What services do Spirit Media offer?', test1: 'Spirit Media is a platform to purchase movies, virtual numbers, etc.'},
        {id:2, click: ()=> setFaqTwo(!faqTwo), test: 'Is the support team always available?', test1: 'Yes, the support team is active 24/7.'},
        {id:3, click: ()=> setFaqThree(!faqThree),test: 'Does Spirit Media make refunds?', test1: 'Yes, for all unsuccessful, transactions, we return your funds to your wallet.'},
        {id:4, click: ()=> setFaqFour(!faqFour), test: 'How can I purchase airtime/data?', test1: 'You can purchase airtime/data in the Airtime/data page.'},
        {id:5, click: ()=> setFaqFive(!faqFive), test: 'How do I fund my wallet?', test1: 'You can fund your wallet by simply hitting the "Fund wallet" button, and follow procedures.'}

    ]
    return(
        <div className="quest2">
            <section>
                <div className="quest">Frequent Questions</div>

{faqInfo.map((app)=>(
                    <div className='flex' key={app.id}>
                    <div className="faq1" >
                <div className="faq3" onClick={app.click}>
                <div className="faq2">{app.test}</div>
                <div className="icon15"><svg className="" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg></div>
                </div>

                {(faqOne && app.id === 1) ? 
                 <div>
                <div className="faqtext">{app.test1}</div>
                </div>
                : (faqTwo && app.id === 2) ?
                <div>
                <div className="faqtext">{app.test1}</div>
                </div> : (faqThree && app.id === 3) ?
                <div>
                <div className="faqtext">{app.test1}</div>
                </div> : (faqFour && app.id === 4) ?
                <div>
                <div className="faqtext">{app.test1}</div>
                </div> : (faqFive && app.id === 5) ?
                <div>
                <div className="faqtext">{app.test1}</div>
                </div> : '' }
                </div>

                </div>                
                ))}

                

                
                

                

               
            </section>
        </div>
    )
}

export default Questions;