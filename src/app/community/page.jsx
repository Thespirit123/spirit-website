'use client';

import React from 'react'
import "./community.css"

const page = () => {
  const waysToEarnDiv = [
     {id:1, icon:"", text:'Ways To Earn', text1:"Refer your friends and family.", link:""},
      {id:2, icon:"", text:'ways to Redeem', text1:"Go to your referral page and withdraw your referral rewards to your account and receive your money instantly.", link:""}
  ]

  const testimony = [
    {id:1, text:'5000 Members', text1:'Join Nigeria fastest growing digital community',icon:""},
    {id:2, text:'100% Secure', text1:'Your data is protected and never shared',icon:""},
    {id:3, text:'Community Benefits', text1:'Exclusive resources, events and networking opportunities',icon:""}
  ]
  return (
    <div style={{paddingTop:"60px"}}>

      <div  className='CommunityHeroDiv'>
        <div className='communityText'>Nigeria's Premier Digital Community</div>
        <div  className='communityTextHero heroAddT'>The Spirit  </div>
        <div  className='communityTextHero heroAddT1'> Community Rewards</div>

        <div  className='communityText1'>Earn massive referral rewards for life when you refer your friends to our foreign number or airtime page</div>
        <div  className='communityHeroButtonDiv'>
          <div  className='communityHeroButton NowButton1'>Airtime</div>
          <div  className='communityHeroButton MoreButton2'>Foreign numbers</div>
        </div>
        <div  className='communityCountDiv'>
           <div  className='communityCountDiv1'>
            <div  className='countHeader'><span>5000+</span></div>
            <div  className='countHeader1'>Active Members</div>
           </div>
            <div  className='communityCountDiv1'>
              <div  className='countHeader'><span>2000</span></div>
               <div  className='countHeader1'>Welcome Bonus</div>
            </div>
             <div className='communityCountDiv1'>
                <div  className='countHeader'><span>200+</span></div>
                <div  className='countHeader1'>Rewards Given</div>
             </div>
        </div>
      </div>


<div className='topDivB'>
      <div className='communitySection2'>
        <div className='communitySection2Text'>Earn & Redeem Rewards</div>
        <div className='communitySection2Text1'>Join our community rewards program and unlock exclusive benefits, discounts, and 
special offers.</div>
<div className='communitySection3'>
  <div className='communitySection4'>
    <div className='communitySection4Div'>
      <p className='RewardJ'>Your Rewards Journey</p>
      <p className='RewardJ1'>Choose between airtime & foreign number and pull your friends in. With that you can unlock exclusive benefits. </p>
    </div>
    <div className='communitySection4Div'>
      <div className='pointsDiv'>
        <div className='pointsDiv1'>350 points</div>
        <div className='pointsDiv2'>500 points needed</div>
      </div>
      <div className='pointsDivLine'>
        <div className='pointsDivLineColor'></div>
      </div>
      <div className='pointsDiv'>
        <div className='pointsDiv44'>Current Level</div>
         <div className='pointsDiv44'>Next reward</div>
      </div>
    </div>
  </div>
  <div className='communitySection4 aad'>
{waysToEarnDiv.map((app)=>(
    <div key={app.id} className='communitySection4Div rfr'>
      <div className='wwY'>
        <div>icon</div>
        <div className=''>
          <p className='wwY1'>{app.text}</p>
          <p className='wwY2'>{app.text1}</p>
        </div>
      </div>
      <div className='MoreShow'>Show More</div>
    </div>
    ))}

   
  </div>
</div>
      </div>
     </div> 

<div className="CMCm">
<div className="CoverMeS">
    <div className='InviteFriendHousing'>
      <div className='InviteFriendHousing1 vfg'>
      <div className='ffRR'>Friend Referrals</div>
      <div className='ffRR1' >Give your friends & family up to 50% of their first purchase. For each 
you will receive  up to ₦2000 in rewards!</div>
<div className='theyGot'>
  <div className=''>icon</div>
   <div className=''>
    <p className=''>They get</p>
    <p className='coupon'>2000 off coupon</p> 
   </div>
</div>
<div className='theyGot'>
  <div>icon</div>
   <div >
    <p className=''>You get</p>
    <p className='coupon'>2000 off coupon +100 points</p> 
   </div>
</div>
<div className='ShareYourR'>Share Your Referral Link</div>

      </div>
      <div className='InviteFriendHousing1'>
        <div>
         image
        </div>
        
      </div>
    </div>
    </div>
    </div>

<div className='NLN'>
    <div className='JoinCommSec'>
      <p className="JoinOurCommunity">Join Our Interactive Community</p>
      <p className="JoinOurCommunity1">For All your updates on everything Spirit, Kindly join our interactive communities below.</p>
      <div className="JoinOurCommunity2" >
        <div className="JoinOurCommunity3">Join Telegram Channel</div>
         <div className="JoinOurCommunity4">Join WhatsApp community</div>
      </div>
      <div className="JoinOurCommunity5"> Stay Updated with the latest news, events,and exclusive content</div>
    </div>

    </div>

<div className='sectionTestimony'>
{testimony.map((app)=>(
    <div key={app.id}>
      <div className='iconDiv'>icon</div>
      <div className='textFF'>{app.text}</div>
      <div className='textFF1'>{app.text1}</div>
    </div>
    ))}
    </div>

    <div>500 members have join</div>

    </div>
  )
}

export default page