"use client";

import React,{useState, useMemo} from "react";
import axios from "axios";
import Select from 'react-select';
import countryList from 'react-select-country-list'
// import './contact.css';

const Virtual = () =>{
    const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), []);
  const [getApi, setGetApi] = useState('');

  const myApi = () =>{
    axios.get('https://www.smspool.net/purchase/sms/service')
    .then((res) =>{
        setGetApi(res.data.content)
        console.log(res.data.content)
    }).catch((err) =>{
        setGetApi(err)
    })
  }

  const changeHandler = value => {
    setValue(value)
  }

    return(
        <div className="virtualsec" style={{paddingTop:"50px"}} >
                    <div className="referr">Virtual Numbers</div>

                

                   

                    <div className="virtual">
                        <div className="virtual3">
                        <div className="virtual1">
                        <div className="bal">Your balance</div>
                        <div className="bal1">₦200,000.00</div>
                        </div>

                        <div className="virtual4">
                        <div className="virtual8">
                        <div className="icon20"><svg className="virtual5" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" fill="#008EA8"/></svg></div>
                        </div>
                        <div className="add">Add funds</div>
                        </div>
                        </div>

                        <div className="mainpurchase">
                            <div className="purchased">
                                <label className="purchased1">Purchased Number</label>
                                <div><input type="number" placeholder="0" /></div>
                            </div>

                            <div className="virtual6">
                            <div className="icon20"><svg className="virtual5" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" fill="#008EA8"/></svg></div>
                            </div>
                            </div>

                          
                        
                    </div>

                    <div className="virtual">
                      <div className="serviceDiv">
                            <div className="service">
                                <div className="purchased2">Service provider</div>
                                <select className="selectDiv">
                                    <option className="selectDiv1" value='Select service provider' >Select service provider...</option>
                                    <option className="selectDiv1">Swift Numbers</option>
                                    <option className="selectDiv1">Dynamic Numbers</option>
                                </select>
                            </div>
                            </div>  

                         <div className="serviceDiv">
                            <div className="service">
                                <div className="purchased2">Services</div>
                                <select className="selectDiv" placeholder='Select service' onClick={myApi}>
                                    <option className="selectDiv1" value='Select service...' >Select service...</option>
                                    <option className="selectDiv1" value='1688'>1688</option>
                                    <option className="selectDiv1" value='1Q'>1Q</option>
                                    <option className="selectDiv1" value='1StopMove'>1StopMove</option>
                                     <option className="selectDiv1" value='2dehands'>2dehands</option>
                                      <option className="selectDiv1" value='2game'>2game</option>
                                       <option className="selectDiv1" value='360NRS'>360NRS</option>
                                        <option className="selectDiv1" value='3Fun'>3Fun</option>
                                         <option className="selectDiv1" value='Smiles'>Smiles</option>
                                          <option className="selectDiv1" value='Mall'>7Mall</option>
                                </select>
                            </div>
                            </div>  

                        <div className="serviceDiv">
                            <div className="service">
                                <div className="purchased2">Country</div>
                                <div className="selectDiv2">
                                    <Select options={options} value={value} onChange={changeHandler} /></div>
                            </div>
                            </div>

                            <div className="serviceDiv3">
                                <div className="purchased2">Price</div>
                            <div className="service1">
                                <div><input type="number" placeholder="₦" /></div>
                            </div>

                            <div className="virtual9">
                        
                        <div className="add1">Purchase</div>
                        </div>
                            

                            </div>
                        
                    </div>

                   

                    <div className="tableview">
                        <div className="recent2">Recent SMS orders</div>

                        <div className="tab1"></div>

                    <div className="tableview1">
                        <div className="tableview2">
                        <table className="maintab">
                            <thead className="tab3">
                                <tr className="tabA">
                                <th className="tab">Order ID</th>
                                <th className="tab">Number</th>
                                <th className="tab">Code</th>
                                <th className="tab">Country</th>
                                <th className="tab">Service</th>
                                <th className="tab">Provider</th>
                                <th className="tab">Amount</th>
                                <th className="tab">Status</th>
                                </tr>
                            </thead>

                            <tbody className="tab2">
                                <tr className="tab4">
                                    <td>
                                
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                    </div>

                            
                    <div className="tabButton">
                            <div className="tabButton2">O of 0 row(s) selected.</div>

                            <div className="tabButton1">
                                <button className="tabBut1">Previous</button>
                                 <button className="tabBut2">Next</button>
                            </div>
                        </div>
                    

                  

                        

<div style={{textAlign:"center", borderTop:"1px solid #8080802e", padding:"10px", fontSize:"12px",fontWeight:"400",color:"#00000070"}} className="MMe"> © 2025 Spirit Media. All Rights Reserved</div>
                    </div>
    )
}

export default Virtual;