'use client';

import React from 'react'
import "./community.css"
import Image from "next/image";
import ContentImage from "@/assets/images/newHomePage1.jpeg";

const page = () => {
  const waysToEarnDiv = [
     {id:1, icon:<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M9.32358 3.41406L4.96289 9.22832V29.5782C4.96289 30.3492 5.26918 31.0887 5.81437 31.6339C6.35956 32.1791 7.099 32.4853 7.87002 32.4853H28.2199C28.9909 32.4853 29.7304 32.1791 30.2756 31.6339C30.8208 31.0887 31.127 30.3492 31.127 29.5782V9.22832L26.7664 3.41406H9.32358Z" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.96289 9.22852H31.127" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23.858 15.0439C23.858 16.586 23.2454 18.0649 22.155 19.1552C21.0647 20.2456 19.5858 20.8582 18.0437 20.8582C16.5017 20.8582 15.0228 20.2456 13.9324 19.1552C12.8421 18.0649 12.2295 16.586 12.2295 15.0439" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      , text:'Ways To Earn', text1:"Refer your friends and family.", link:""},
      {id:2, icon:<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M29.7711 12.1348H6.51411C5.71133 12.1348 5.06055 12.7855 5.06055 13.5883V16.4955C5.06055 17.2982 5.71133 17.949 6.51411 17.949H29.7711C30.5739 17.949 31.2247 17.2982 31.2247 16.4955V13.5883C31.2247 12.7855 30.5739 12.1348 29.7711 12.1348Z" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.1406 12.1348V31.0311" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28.3157 17.9502V28.1251C28.3157 28.8962 28.0094 29.6356 27.4642 30.1808C26.919 30.726 26.1796 31.0323 25.4086 31.0323H10.8729C10.1019 31.0323 9.36249 30.726 8.8173 30.1808C8.27211 29.6356 7.96582 28.8962 7.96582 28.1251V17.9502" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.5997 12.1376C10.636 12.1376 9.71166 11.7547 9.03017 11.0732C8.34868 10.3918 7.96582 9.46746 7.96582 8.50369C7.96582 7.53991 8.34868 6.61561 9.03017 5.93412C9.71166 5.25263 10.636 4.86978 11.5997 4.86978C13.002 4.84535 14.3761 5.52571 15.5429 6.82215C16.7097 8.11858 17.615 9.97092 18.1408 12.1376C18.6666 9.97092 19.5719 8.11858 20.7387 6.82215C21.9055 5.52571 23.2796 4.84535 24.6818 4.86978C25.6456 4.86978 26.5699 5.25263 27.2514 5.93412C27.9329 6.61561 28.3157 7.53991 28.3157 8.50369C28.3157 9.46746 27.9329 10.3918 27.2514 11.0732C26.5699 11.7547 25.6456 12.1376 24.6818 12.1376" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        , text:'ways to Redeem', text1:"Go to your referral page and withdraw your referral rewards to your account and receive your money instantly.", link:""}
  ]

  const testimony = [
    {id:1, text:'5000 Members', text1:'Join Nigeria fastest growing digital community',icon:<svg width="94" height="94" viewBox="0 0 94 94" fill="none" >
      <path d="M0.578125 46.5414C0.578125 20.8524 21.4032 0.0273438 47.0922 0.0273438C72.7812 0.0273438 93.6062 20.8524 93.6062 46.5414C93.6062 72.2304 72.7812 93.0554 47.0922 93.0554C21.4032 93.0554 0.578125 72.2304 0.578125 46.5414Z" fill="#008EA8" fillOpacity="0.1"/>
      <path d="M53.8753 61.8048V58.4132C53.8753 56.6141 53.1607 54.8888 51.8886 53.6167C50.6164 52.3446 48.8911 51.6299 47.092 51.6299H36.9171C35.118 51.6299 33.3927 52.3446 32.1206 53.6167C30.8485 54.8888 30.1338 56.6141 30.1338 58.4132V61.8048" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M42.004 44.8459C45.7503 44.8459 48.7873 41.8089 48.7873 38.0626C48.7873 34.3163 45.7503 31.2793 42.004 31.2793C38.2577 31.2793 35.2207 34.3163 35.2207 38.0626C35.2207 41.8089 38.2577 44.8459 42.004 44.8459Z" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M64.0484 61.8041V58.4125C64.0473 56.9095 63.5471 55.4495 62.6262 54.2616C61.7054 53.0738 60.4162 52.2253 58.9609 51.8496" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M53.874 31.5C55.3331 31.8736 56.6264 32.7222 57.55 33.912C58.4735 35.1018 58.9748 36.5651 58.9748 38.0713C58.9748 39.5775 58.4735 41.0408 57.55 42.2307C56.6264 43.4205 55.3331 44.269 53.874 44.6426" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      },
    {id:2, text:'100% Secure', text1:'Your data is protected and never shared',icon:<svg width="94" height="94" viewBox="0 0 94 94" fill="none" >
      <path d="M0.204102 46.5414C0.204102 20.8524 21.0292 0.0273438 46.7181 0.0273438C72.4071 0.0273438 93.2322 20.8524 93.2322 46.5414C93.2322 72.2304 72.4071 93.0554 46.7181 93.0554C21.0292 93.0554 0.204102 72.2304 0.204102 46.5414Z" fill="#008EA8" fillOpacity="0.1"/>
      <path d="M60.2836 48.2388C60.2836 56.7179 54.3482 60.9575 47.2936 63.4165C46.9242 63.5416 46.5229 63.5356 46.1574 63.3995C39.0858 60.9575 33.1504 56.7179 33.1504 48.2388V36.368C33.1504 35.9183 33.3291 35.4869 33.6471 35.1689C33.9651 34.8509 34.3965 34.6722 34.8462 34.6722C38.2379 34.6722 42.4774 32.6372 45.4282 30.0596C45.7874 29.7526 46.2445 29.584 46.717 29.584C47.1895 29.584 47.6465 29.7526 48.0058 30.0596C50.9735 32.6542 55.1961 34.6722 58.5878 34.6722C59.0375 34.6722 59.4689 34.8509 59.7869 35.1689C60.1049 35.4869 60.2836 35.9183 60.2836 36.368V48.2388Z" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      },
    {id:3, text:'Community Benefits', text1:'Exclusive resources, events and networking opportunities',icon:<svg width="94" height="94" viewBox="0 0 94 94" fill="none">
      <path d="M0.84375 46.5414C0.84375 20.8524 21.6688 0.0273438 47.3578 0.0273438C73.0468 0.0273438 93.8718 20.8524 93.8718 46.5414C93.8718 72.2304 73.0468 93.0554 47.3578 93.0554C21.6688 93.0554 0.84375 72.2304 0.84375 46.5414Z" fill="#008EA8" fillOpacity="0.1"/>
      <path d="M43.8605 52.478C43.7091 51.8912 43.4032 51.3556 42.9746 50.927C42.5461 50.4984 42.0105 50.1925 41.4236 50.0411L31.0197 47.3583C30.8422 47.308 30.686 47.2011 30.5747 47.0539C30.4635 46.9066 30.4033 46.7272 30.4033 46.5427C30.4033 46.3581 30.4635 46.1787 30.5747 46.0315C30.686 45.8842 30.8422 45.7773 31.0197 45.727L41.4236 43.0425C42.0103 42.8912 42.5457 42.5856 42.9743 42.1573C43.4028 41.7291 43.7088 41.1938 43.8605 40.6073L46.5433 30.2034C46.5932 30.0252 46.7 29.8682 46.8474 29.7564C46.9948 29.6445 47.1748 29.584 47.3598 29.584C47.5449 29.584 47.7248 29.6445 47.8723 29.7564C48.0197 29.8682 48.1265 30.0252 48.1764 30.2034L50.8575 40.6073C51.0089 41.1941 51.3148 41.7297 51.7433 42.1583C52.1719 42.5869 52.7075 42.8928 53.2944 43.0442L63.6983 45.7253C63.8772 45.7746 64.0349 45.8813 64.1474 46.0289C64.2598 46.1766 64.3207 46.3571 64.3207 46.5427C64.3207 46.7282 64.2598 46.9087 64.1474 47.0564C64.0349 47.204 63.8772 47.3107 63.6983 47.36L53.2944 50.0411C52.7075 50.1925 52.1719 50.4984 51.7433 50.927C51.3148 51.3556 51.0089 51.8912 50.8575 52.478L48.1747 62.8819C48.1248 63.0601 48.018 63.2171 47.8706 63.329C47.7231 63.4408 47.5432 63.5013 47.3581 63.5013C47.1731 63.5013 46.9931 63.4408 46.8457 63.329C46.6983 63.2171 46.5915 63.0601 46.5416 62.8819L43.8605 52.478Z" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M60.9248 31.2793V38.0626" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M64.3175 34.6719H57.5342" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M33.792 55.0205V58.4122" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M35.4874 56.7178H32.0957" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      }
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
          <a href="/international-numbers"><div  className='communityHeroButton MoreButton2'>Foreign numbers</div></a>
        </div>
        <div  className='communityCountDiv'>
           <div  className='communityCountDiv1'>
            <div  className='countHeader'><svg width="36" height="36" viewBox="0 0 36 36" fill="none" >
<path d="M24.139 31.1647V28.2576C24.139 26.7156 23.5264 25.2367 22.436 24.1463C21.3456 23.0559 19.8667 22.4434 18.3247 22.4434H9.60332C8.06128 22.4434 6.5824 23.0559 5.49202 24.1463C4.40163 25.2367 3.78906 26.7156 3.78906 28.2576V31.1647" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.9656 16.6295C17.1767 16.6295 19.7799 14.0264 19.7799 10.8152C19.7799 7.60411 17.1767 5.00098 13.9656 5.00098C10.7545 5.00098 8.15137 7.60411 8.15137 10.8152C8.15137 14.0264 10.7545 16.6295 13.9656 16.6295Z" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M32.8607 31.1643V28.2571C32.8597 26.9689 32.431 25.7174 31.6417 24.6993C30.8524 23.6811 29.7473 22.9539 28.5 22.6318" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M24.1387 5.19043C25.3893 5.51065 26.4979 6.23801 27.2895 7.25785C28.0811 8.27768 28.5108 9.53198 28.5108 10.823C28.5108 12.114 28.0811 13.3683 27.2895 14.3881C26.4979 15.408 25.3893 16.1353 24.1387 16.4556" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
<span>5000+</span></div>
            <div  className='countHeader1'>Active Members</div>
           </div>
            <div  className='communityCountDiv1'>
              <div  className='countHeader'><svg width="32" height="33" viewBox="0 0 30 33" fill="none" >
<path d="M3.2759 18.9895C3.00084 18.9905 2.73115 18.9133 2.49818 18.7671C2.26521 18.6209 2.07851 18.4115 1.95977 18.1634C1.84104 17.9153 1.79515 17.6386 1.82743 17.3654C1.85971 17.0922 1.96883 16.8338 2.14212 16.6202L16.5324 1.79386C16.6404 1.66926 16.7875 1.58507 16.9496 1.55509C17.1117 1.52511 17.2791 1.55113 17.4245 1.62889C17.5699 1.70664 17.6845 1.8315 17.7495 1.98298C17.8146 2.13446 17.8262 2.30355 17.7825 2.4625L14.9916 11.213C14.9093 11.4332 14.8817 11.6701 14.9111 11.9034C14.9405 12.1367 15.026 12.3594 15.1604 12.5523C15.2947 12.7453 15.4739 12.9027 15.6825 13.0112C15.8911 13.1197 16.1229 13.176 16.358 13.1753H26.5329C26.808 13.1743 27.0777 13.2515 27.3107 13.3977C27.5436 13.5439 27.7303 13.7533 27.8491 14.0014C27.9678 14.2495 28.0137 14.5262 27.9814 14.7994C27.9491 15.0726 27.84 15.331 27.6667 15.5446L13.2764 30.3709C13.1685 30.4955 13.0214 30.5797 12.8593 30.6097C12.6972 30.6397 12.5297 30.6137 12.3843 30.5359C12.239 30.4581 12.1244 30.3333 12.0593 30.1818C11.9943 30.0303 11.9826 29.8612 12.0264 29.7023L14.8172 20.9518C14.8995 20.7316 14.9271 20.4947 14.8977 20.2614C14.8684 20.0281 14.7828 19.8054 14.6485 19.6125C14.5141 19.4195 14.3349 19.262 14.1264 19.1535C13.9178 19.045 13.686 18.9888 13.4509 18.9895H3.2759Z" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
<span>2000</span></div>
               <div  className='countHeader1'>Welcome Bonus</div>
            </div>
             <div className='communityCountDiv1'>
                <div  className='countHeader'><svg width="36" height="36" viewBox="0 0 36 36" fill="none" >
<path d="M9.39629 13.7219H7.21594C6.25217 13.7219 5.32787 13.3391 4.64638 12.6576C3.96489 11.9761 3.58203 11.0518 3.58203 10.088C3.58203 9.12424 3.96489 8.19994 4.64638 7.51845C5.32787 6.83696 6.25217 6.4541 7.21594 6.4541H9.39629" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M26.8379 13.7219H29.0182C29.982 13.7219 30.9063 13.3391 31.5878 12.6576C32.2693 11.9761 32.6521 11.0518 32.6521 10.088C32.6521 9.12424 32.2693 8.19994 31.5878 7.51845C30.9063 6.83696 29.982 6.4541 29.0182 6.4541H26.8379" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.48828 32.6191H29.7453" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.2103 21.9502V25.3515C15.2103 26.151 14.5271 26.776 13.8003 27.1103C12.0851 27.8953 10.8496 30.0611 10.8496 32.6194" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21.0244 21.9502V25.3515C21.0244 26.151 21.7076 26.776 22.4344 27.1103C24.1496 27.8953 25.3851 30.0611 25.3851 32.6194" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M26.8383 3.54688H9.39551V13.7218C9.39551 16.0349 10.3144 18.2532 11.9499 19.8888C13.5855 21.5243 15.8038 22.4432 18.1169 22.4432C20.4299 22.4432 22.6483 21.5243 24.2838 19.8888C25.9194 18.2532 26.8383 16.0349 26.8383 13.7218V3.54688Z" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
<span>200+</span></div>
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
        <div className="IconLove">
          {app.icon}
        </div>
        <div className=''>
          <p className='wwY1'>{app.text}</p>
          <p className='wwY2'>{app.text1}</p>
        </div>
      </div>
      <div className='MoreShow'><span>Show More</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M9.30273 17.5846L15.117 11.7703L9.30273 5.95605" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      </div>
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
  <div className=''><svg width="79" height="80" viewBox="0 0 79 80" fill="none" >
<g filter="url(#filter0_dd_1030_6069)">
<path d="M4.5 38.4725C4.5 19.2057 20.1188 3.58691 39.3855 3.58691C58.6523 3.58691 74.2711 19.2057 74.2711 38.4725C74.2711 57.7392 58.6523 73.358 39.3855 73.358C20.1188 73.358 4.5 57.7392 4.5 38.4725Z" fill="white"/>
<path d="M45.1995 51.5563V48.6492C45.1995 47.1072 44.5869 45.6283 43.4966 44.5379C42.4062 43.4475 40.9273 42.835 39.3852 42.835H30.6639C29.1218 42.835 27.643 43.4475 26.5526 44.5379C25.4622 45.6283 24.8496 47.1072 24.8496 48.6492V51.5563" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M35.0252 37.0211C38.2363 37.0211 40.8394 34.418 40.8394 31.2068C40.8394 27.9957 38.2363 25.3926 35.0252 25.3926C31.8141 25.3926 29.2109 27.9957 29.2109 31.2068C29.2109 34.418 31.8141 37.0211 35.0252 37.0211Z" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M53.9212 51.5559V48.6487C53.9203 47.3605 53.4915 46.109 52.7022 45.0909C51.913 44.0727 50.8079 43.3455 49.5605 43.0234" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M45.2021 25.5811C46.4528 25.9013 47.5613 26.6286 48.353 27.6485C49.1446 28.6683 49.5742 29.9226 49.5742 31.2136C49.5742 32.5046 49.1446 33.7589 48.353 34.7788C47.5613 35.7986 46.4528 36.526 45.2021 36.8462" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<filter id="filter0_dd_1030_6069" x="0.139308" y="0.679786" width="78.4929" height="78.4929" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1.45356"/>
<feGaussianBlur stdDeviation="2.18035"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1030_6069"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="1.45356" operator="erode" in="SourceAlpha" result="effect2_dropShadow_1030_6069"/>
<feOffset dy="1.45356"/>
<feGaussianBlur stdDeviation="1.45356"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_1030_6069" result="effect2_dropShadow_1030_6069"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1030_6069" result="shape"/>
</filter>
</defs>
</svg>
</div>
   <div className=''>
    <p className='getYouMe'>They get</p>
    <p className='coupon'>2000 off coupon</p> 
   </div>
</div>
<div className='theyGot'>
  <div><svg width="79" height="80" viewBox="0 0 79 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dd_1030_6081)">
<path d="M4.5 38.3162C4.5 19.0494 20.1188 3.43066 39.3855 3.43066C58.6523 3.43066 74.2711 19.0494 74.2711 38.3162C74.2711 57.583 58.6523 73.2017 39.3855 73.2017C20.1188 73.2017 4.5 57.583 4.5 38.3162Z" fill="white"/>
<path d="M45.1995 51.3981V48.491C45.1995 46.949 44.5869 45.4701 43.4966 44.3797C42.4062 43.2893 40.9273 42.6768 39.3852 42.6768H30.6639C29.1218 42.6768 27.643 43.2893 26.5526 44.3797C25.4622 45.4701 24.8496 46.949 24.8496 48.491V51.3981" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M35.0252 36.8619C38.2363 36.8619 40.8394 34.2588 40.8394 31.0477C40.8394 27.8365 38.2363 25.2334 35.0252 25.2334C31.8141 25.2334 29.2109 27.8365 29.2109 31.0477C29.2109 34.2588 31.8141 36.8619 35.0252 36.8619Z" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M49.5605 32.502V41.2233" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M53.9235 36.8633H45.2021" stroke="#008EA8" strokeWidth="2.90713" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<filter id="filter0_dd_1030_6081" x="0.139308" y="0.523536" width="78.4929" height="78.4929" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1.45356"/>
<feGaussianBlur stdDeviation="2.18035"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1030_6081"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="1.45356" operator="erode" in="SourceAlpha" result="effect2_dropShadow_1030_6081"/>
<feOffset dy="1.45356"/>
<feGaussianBlur stdDeviation="1.45356"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_1030_6081" result="effect2_dropShadow_1030_6081"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1030_6081" result="shape"/>
</filter>
</defs>
</svg>
</div>
   <div >
    <p className='getYouMe'>You get</p>
    <p className='coupon'>2000 off coupon +100 points</p> 
   </div>
</div>
<div className='ShareYourR'><span>Share Your Referral Link</span>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
<path d="M8.17595 13.4125C8.42064 12.9231 8.55872 12.3708 8.55872 11.7869C8.55872 11.2031 8.42064 10.6507 8.17595 10.1614M8.17595 13.4125C7.80978 14.1446 7.20716 14.7316 6.46571 15.0785C5.72426 15.4253 4.88742 15.5117 4.09076 15.3236C3.29411 15.1355 2.5843 14.6839 2.07633 14.042C1.56836 13.4001 1.29199 12.6055 1.29199 11.7869C1.29199 10.9684 1.56836 10.1738 2.07633 9.53188C2.5843 8.88999 3.29411 8.43841 4.09076 8.25029C4.88742 8.06217 5.72426 8.14853 6.46571 8.49538C7.20716 8.84223 7.80978 9.42926 8.17595 10.1614M8.17595 13.4125L16.2093 17.4292M8.17595 10.1614L16.2093 6.14468M16.2093 17.4292C15.7782 18.2914 15.7072 19.2896 16.0121 20.2042C16.317 21.1188 16.9726 21.8748 17.8349 22.3059C18.6971 22.737 19.6953 22.808 20.6099 22.5031C21.5245 22.1983 22.2805 21.5426 22.7116 20.6803C23.1427 19.8181 23.2137 18.8199 22.9088 17.9053C22.604 16.9907 21.9483 16.2347 21.086 15.8036C20.6591 15.5901 20.1943 15.4629 19.7181 15.429C19.242 15.3952 18.7639 15.4555 18.311 15.6064C17.3964 15.9113 16.6404 16.5669 16.2093 17.4292ZM16.2093 6.14468C16.4228 6.57155 16.7183 6.95218 17.0788 7.26487C17.4394 7.57755 17.858 7.81614 18.3108 7.96704C18.7636 8.11793 19.2417 8.17816 19.7178 8.14429C20.1938 8.11042 20.6586 7.98312 21.0854 7.76964C21.5123 7.55617 21.8929 7.26071 22.2056 6.90013C22.5183 6.53956 22.7569 6.12092 22.9078 5.66813C23.0587 5.21535 23.1189 4.73727 23.085 4.26121C23.0512 3.78514 22.9239 3.32041 22.7104 2.89354C22.2793 2.03145 21.5233 1.37593 20.6089 1.07119C19.6944 0.766446 18.6964 0.83745 17.8343 1.26858C16.9722 1.69971 16.3167 2.45564 16.0119 3.37009C15.7072 4.28453 15.7782 5.28258 16.2093 6.14468Z" stroke="white" strokeWidth="1.45356" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

</div>

      </div>
      <div className='InviteFriendHousing1'>
        <div style={{padding:"10px",background:"#fff",borderRadius:"10px",height:"500px"}}>
         <Image src={ContentImage} alt="section Image" className="klk"/>
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
        <div className="JoinOurCommunity3">
        <svg width="31" height="31" viewBox="0 0 33 33" fill="none" >
<g clipPath="url(#clip0_1030_6115)">
<path d="M27.1865 3.50684C27.5267 3.42773 27.8788 3.42124 28.2207 3.48633L28.3672 3.51855C28.757 3.61729 29.1187 3.80855 29.417 4.07617L29.7021 4.33203H27.7998L27.8018 4.6582L27.1191 5.14453L4.27344 11.7363L2.62305 12.2129L4.16211 12.9766L10.1436 15.9443L10.46 16.1016L10.7666 15.9287L16.5254 12.6992L12.3232 15.6973L11.9141 15.9893L12.0811 16.4629L15.6836 26.71L15.9424 27.4453L16.6289 27.0762L22.0342 24.1699C22.1075 24.1487 22.1833 24.1389 22.2598 24.1416L22.3486 24.1504C22.4679 24.1694 22.5826 24.217 22.6797 24.29V24.291L28.2363 28.4971L29.3164 29.3154L29.3066 27.96L29.1416 5.3418L30.5596 4.33203H30.1064L30.377 4.00586L30.8428 3.44238C30.9781 3.56385 31.0985 3.70644 31.1982 3.86719V3.86621C31.3688 4.14129 31.4741 4.45818 31.5039 4.78809L31.5117 4.92969L31.6787 27.8857V28.0293C31.6691 28.2835 31.6064 28.5327 31.4961 28.7617L31.4375 28.875C31.2902 29.1336 31.0844 29.3487 30.8398 29.5029L30.7324 29.5654C30.4766 29.7022 30.1911 29.7719 29.9023 29.7695L29.7783 29.7646C29.4895 29.7414 29.2107 29.6457 28.9658 29.4863L28.8633 29.4141H28.8623L23.3389 25.2412L22.9287 24.9316L22.5244 25.248L17.0928 29.498C17.0801 29.5063 17.0645 29.5169 17.043 29.5283L17.0332 29.5332L17.0234 29.5391C16.852 29.638 16.6659 29.7083 16.4727 29.7461L16.2773 29.7725C16.0808 29.7887 15.8837 29.7721 15.6934 29.7236L15.5059 29.665H15.5049C15.3196 29.5953 15.1466 29.4951 14.9932 29.3691L14.8467 29.2344L14.7148 29.085C14.5924 28.9291 14.4957 28.754 14.4297 28.5664H14.4307L10.4697 17.2031L10.3809 16.9473L10.1387 16.8262L3.44824 13.4766L3.44141 13.4736L3.32031 13.4082C3.0844 13.2705 2.88637 13.0833 2.74219 12.8613L2.6748 12.7471C2.52754 12.4748 2.46087 12.1695 2.47949 11.8643L2.49219 11.7334C2.53513 11.4303 2.66353 11.1393 2.86816 10.8877L2.96094 10.7822C3.21985 10.5081 3.56399 10.3059 3.95605 10.208L3.97949 10.2021L27.1865 3.50684Z" fill="#008EA8" stroke="#008EA8" strokeWidth="1.33529"/>
</g>
<defs>
<clipPath id="clip0_1030_6115">
<rect width="32.0471" height="32.0471" fill="white" transform="translate(0.131836 0.740234)"/>
</clipPath>
</defs>
</svg>
<span>Join Telegram Channel</span>

        </div>
         <div className="JoinOurCommunity4">
         <svg width="30" height="31" viewBox="0 0 32 33" fill="none" >
<path d="M16.1299 1.4082H16.1309C18.005 1.40327 19.8629 1.74706 21.6094 2.4209L21.957 2.55957C23.6882 3.27732 25.2702 4.31064 26.6221 5.60547L26.8896 5.86816L26.8926 5.87109C28.3085 7.28114 29.4305 8.95814 30.1943 10.8047C30.9104 12.5359 31.2983 14.384 31.3389 16.2549L31.3428 16.6299V16.6309C31.3389 25.0192 24.5123 31.8445 16.1299 31.8447H16.123L15.6475 31.8369C13.2719 31.7623 10.9445 31.1313 8.85352 29.9922L8.62109 29.8662L8.36523 29.9326L1.06348 31.8477L3.0127 24.7344L3.08691 24.4658L2.94727 24.2236C1.6164 21.9184 0.916104 19.302 0.916016 16.6201C0.919793 8.3641 7.53366 1.62191 15.7373 1.41309L16.1299 1.4082ZM16.1348 2.75488C8.4864 2.75488 2.26546 8.9743 2.26367 16.6201C2.2597 19.0674 2.90526 21.4689 4.12988 23.5811L4.38184 24H4.38281L4.53906 24.25L3.28516 28.8389L2.97949 29.9541L4.09863 29.6611L8.82324 28.4199L9.06543 28.5635L9.06641 28.5645C11.0695 29.7509 13.3373 30.4115 15.6592 30.4893L16.124 30.4971H16.1299C23.6538 30.4968 29.7981 24.4703 29.9922 16.9893L29.9961 16.6318C30.0013 14.9235 29.6891 13.2302 29.0762 11.6377L28.9492 11.3203C28.2525 9.63602 27.2291 8.10639 25.9375 6.82031H25.9385C23.3217 4.2008 19.8373 2.75488 16.1348 2.75488ZM10.5068 9.9541C10.7697 9.9541 11.0214 9.95687 11.2363 9.9668V9.96582C11.2881 9.96845 11.3383 9.96883 11.3643 9.96875C11.379 9.96871 11.3905 9.96866 11.3994 9.96875C11.4267 10.0023 11.4782 10.0786 11.5439 10.2354V10.2363C11.7084 10.6325 11.988 11.3162 12.2412 11.9316C12.3628 12.2271 12.483 12.5189 12.5811 12.7529L12.7881 13.2275C12.8146 13.2802 12.8203 13.3075 12.8223 13.3174C12.8216 13.3189 12.8214 13.321 12.8203 13.3232C12.7081 13.5467 12.6658 13.6447 12.5957 13.7451L12.5127 13.8516H12.5117C12.3325 14.0611 12.195 14.2378 12.0723 14.3779L11.9541 14.5059L11.9521 14.5078C11.8714 14.5886 11.6574 14.7903 11.5508 15.0771C11.4207 15.4272 11.4783 15.788 11.6729 16.123V16.124C11.9005 16.5161 12.6526 17.746 13.7822 18.8232L14.0127 19.0361L14.0137 19.0371C15.2145 20.1077 16.3055 20.6421 16.9141 20.9121L17.3477 21.1035L17.3516 21.1055C17.5934 21.226 17.893 21.3347 18.2217 21.2949C18.5783 21.2516 18.8327 21.0528 19.0127 20.8457L19.0117 20.8447C19.2331 20.5913 20.0083 19.6847 20.3086 19.2383C20.3132 19.2397 20.3182 19.2416 20.3232 19.2432L20.4307 19.2812C20.5769 19.3356 21.1137 19.5877 21.7109 19.876L23.0703 20.541L23.0713 20.542C23.1754 20.594 23.2728 20.641 23.3506 20.6787C23.4204 20.7125 23.474 20.7386 23.5176 20.7617C23.519 20.8254 23.5184 20.9085 23.5098 21.0088C23.4917 21.2178 23.4477 21.4802 23.3652 21.7705L23.2695 22.0703C23.1811 22.3173 22.8623 22.6586 22.3604 22.9805C21.9345 23.2535 21.5006 23.4339 21.2275 23.5L21.1211 23.5215H21.1201C20.5723 23.604 19.9278 23.6387 19.2275 23.4717L18.9238 23.3877L18.9219 23.3867L18.4688 23.2412C18.147 23.1344 17.7848 23.0061 17.375 22.8447L16.7236 22.5762C12.9405 20.9428 10.45 17.1097 10.2139 16.7959H10.2129C10.1153 16.6648 9.74212 16.166 9.3916 15.4756C9.033 14.7692 8.72754 13.9186 8.72754 13.0928C8.72762 11.837 9.2078 11.0782 9.59961 10.6113L9.94141 10.2334H9.94238C10.1572 9.99801 10.395 9.9541 10.5068 9.9541Z" fill="black" stroke="white" strokeWidth="1.33529"/>
</svg>

          <span>Join WhatsApp community</span></div>
      </div>
      <div className="JoinOurCommunity5"> Stay Updated with the latest news, events,and exclusive content</div>
    </div>

    </div>

<div className='sectionTestimony'>
{testimony.map((app)=>(
    <div key={app.id} className='goingUp'>
      <div className='iconDiv'>{app.icon}</div>
      <div className='textFF'>{app.text}</div>
      <div className='textFF1'>{app.text1}</div>
    </div>
    ))}
    </div>

    <div className='Members5'>500 members have join</div>

    </div>
  )
}

export default page