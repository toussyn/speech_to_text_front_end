import React, {useState} from 'react'
import './Home.css'
import  logo from '../../logo.svg'
import Record from '../record/Record'
import Data from '../data/Data'


export default function Home() {

    const [isSubmitClicked,setIsSubmitClicked] = useState(false)
    const [isDataClicked,setIsDataClicked] = useState(false)

    function setDestination(val){
        if(val==='record'){
            setIsSubmitClicked(true)
            setIsDataClicked(false)
        }
        else if(val==='data'){
            setIsSubmitClicked(false)
            setIsDataClicked(true)
        }
        else{
            setIsSubmitClicked(false)
            setIsDataClicked(false)
        }
    }
    const Btns = ()=><>
        <li><button onClick={()=>setDestination('home')}>10Academy</button></li>
        <li><button onClick={()=>setDestination('record')}>Submit Audio</button></li>
        <li><button onClick={()=>setDestination('data')}>Data</button></li>
    </>

    if(isDataClicked){
        return (<div>
                <ul>
                <li>
                    <div className='' style={{justifyContent:'center', paddingTop:'6px'}}>
                        <img src={logo}></img>
                    </div>
                </li>
                <Btns/>
                </ul>
                <Data/>
            </div>)
    }
    if(isSubmitClicked){
        return(
            <div>
                <ul>
                <li>
                    <div className='' style={{justifyContent:'center', paddingTop:'6px'}}>
                        <img src={logo}></img>
                    </div>
                </li>
                <Btns/>
                </ul>
                <Record/>
            </div>
        )
    }

  return (
    <div>
        <ul>
          <li>
            <div className='' style={{justifyContent:'center', paddingTop:'6px'}}>
                <img src={logo}></img>
            </div>
          </li>
          <Btns/>
        </ul>
        <Record/>
    </div>
  )
}
