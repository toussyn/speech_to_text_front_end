import React, {useEffect, useState} from 'react'
import './Record.css'
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import axios from 'axios'
import  loading from '../../loading2.gif'

const BASE_URL = "http://localhost:33507"
export default function Record() {

    const [audioUrl, setAudioUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [text, setText] = useState(null)
    
    const [audioDetails, setAudioDetails] = useState({
        url: null,
        blob: null,
        chunks: null,
        duration: {
          h: 0,
          m: 0,
          s: 0
        }
      })

    function handleAudioStop(data) {
        console.log(data);
        setAudioDetails(data)
        setAudioUrl(data.url)
    }

    async function handleAudioUpload(file) {
        // console.log(file);
        let formData = new FormData();
        formData.append('file', file)
        formData.append('json_id',Math.floor(Math.random() * (60000 - 1 + 1)) + 1)
        formData.append('headline', text['headline'])
        formData.append('article', text['article']) 
        try{
          setIsLoading(true)
          let res = await axios.post(`${BASE_URL}/get_audio`, formData);
          console.log(res)
          let data = res.data;
          if(data!==undefined){
            if(data.status === "success"){
              alert("Recording submitted")
            }else{
                alert(data.message)
            }
          }
          else{
              alert("Something went wrong")
          }
        }catch(e){
                console.log(e)
                alert(e.message)
            }finally{
              setIsLoading(false)
            }
    }

    function handleRest() {
        const reset = {
          url: null,
          blob: null,
          chunks: null,
          duration: {
            h: 0,
            m: 0,
            s: 0
          }
        };
        setAudioDetails(reset)
      }
    


    useEffect(()=>{
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("getUserMedia supported.");
            navigator.mediaDevices
              .getUserMedia(
                // constraints - only audio needed for this app
                {
                  audio: true,
                }
              )
              // Success callback
              .then((stream) => {})
              // Error callback
              .catch((err) => {
                alert(`The following getUserMedia error occurred: ${err}`);
              });
              setIsLoading(true)
              getText();
              setIsLoading(false)
          } else {
            alert("getUserMedia not supported on your browser!");
          }
    },[])

    async function getText(){
      try{
        let response = await axios.get(`${BASE_URL}/get_text`)
        console.log(response)
        let data = response.data;
        if(data!==undefined){
            if(data.status === "success"){
              setText(data)
            }else{
                alert(data.message)
            }
        }
        else{
            alert("Something went wrong")
        }

      }catch(e){
          console.log(e)
          alert(e.message)
      }
    }

    function handleOnChange(value, args){
        console.log(value)
        console.log(args)
    }

  return (
    <div className='home-div'>
      {isLoading &&
            <div className='loading'>
                <img src={loading}></img>
            </div>}
            {text!==null&&<div className='data-div'>
              <br/>
              <h3>Please record audio reading the below Headline and Article</h3>
              <br/>

              <hr/>
              <br/>

              <table id="data">
                <tbody>
                  <tr>
                      <th>Headline</th>
                      <td>{text['headline']}</td>
                  </tr>
                  <tr>
                      <th>Article</th>
                      <td>{text['article']}</td>
                  </tr>
                  {/* <tr>
                      <th>Category</th>
                      <td>{text['category']}</td>
                  </tr> */}
                </tbody>
              </table>
            </div>}
        <Recorder
          record={true}

          title={"New recording"}
          audioURL={audioDetails.url}
          showUIAudio
          handleAudioStop={(data) => handleAudioStop(data)}
          handleOnChange={(value) => handleOnChange(value, "firstname")}
          handleAudioUpload={(data) => handleAudioUpload(data)}
          handleReset={handleRest}
           mimeTypeToUseWhenRecording={`audio/webm`} 
        />
    </div>
  )
}
