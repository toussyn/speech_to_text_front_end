import React, {useEffect, useState} from 'react'
import sample from './sample'
import ReactAudioPlayer from "react-audio-player";
import './Data.css'
import axios from 'axios'
import  loading from '../../loading2.gif'

const BASE_URL = "http://localhost:33507"


const j = [
    {
        'json_id':45213,
        'headline':"Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
        "article":"Odit voluptas facilis laudantium sapiente qui iste numquam hic, architecto necessitatibus, cupiditate sunt labore quo impedit a, commodi officiis excepturi id fugiat.",
        'audio_file':sample
    },
    {
        'json_id':51213,
        'headline':"Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
        "article":"Odit voluptas facilis laudantium sapiente qui iste numquam hic, architecto necessitatibus, cupiditate sunt labore quo impedit a, commodi officiis excepturi id fugiat.",
        'audio_file':sample
    },
    {
        'json_id':32213,
        'headline':"Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
        "article":"Odit voluptas facilis laudantium sapiente qui iste numquam hic, architecto necessitatibus, cupiditate sunt labore quo impedit a, commodi officiis excepturi id fugiat.",
        'audio_file':sample
    },
    {
        'json_id':21332,
        'headline':"Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
        "article":"Odit voluptas facilis laudantium sapiente qui iste numquam hic, architecto necessitatibus, cupiditate sunt labore quo impedit a, commodi officiis excepturi id fugiat.",
        'audio_file':sample
    },
]


export default function Data() {
    const[data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(()=>{
        getData()
    },[])


    async function getData(){
        try{
            setIsLoading(true)
          let res = await axios.post(`${BASE_URL}/return_processed_audio`,
          {headers: {
                'Content-Type': 'application/json'
            }}
          );
          console.log(res)
          let data = res.data;
          if(data!==undefined){
            if(data.status === "success"){
              setData(data.data)
            }else{
                setData(j)
                alert(data.message)
            }
          }
          else{
            alert("Something went wrong")
            setData(j)  
          }
        }catch(e){
            console.log(e)
            alert(e.message)
            setData(j)
        }finally{
            setIsLoading(false)
        }
        // setData(j)
    }

  return (
    <div className='data-div'>
        <table id="data">
            <thead>
                <tr>
                    <th>JSON ID</th>
                    <th>Headline</th>
                    <th>Article</th>
                    <th>Audio Version</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d)=>(
                    <tr key={d.json_id}>
                        <td>{d.json_id}</td>
                        <td>{d.headline}</td>
                        <td>{d.article}</td>
                        <td>
                            <ReactAudioPlayer
                                src={d.audio_file}
                                // autoPlay
                                controls
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
    </div>
  )
}
