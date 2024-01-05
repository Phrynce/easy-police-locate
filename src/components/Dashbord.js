import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { usercontext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import avatar from './images/blako.jpg'
import convertToBase64 from './convert';
import BarChart from './BarChart';
import Piechart from './Piechart';
import LineChart from './LineChart';
import PolarChart from './images/PolarChart';
import NewYear from './NewYear';


const Dashbord = () => {

  const nav=useNavigate()

  const [username,setusername,pword,setpword,name,setname,use,setuse,accessToken,setaccessToken]=useContext(usercontext)

  axios.defaults.withCredentials=false;
  useEffect(()=>{  
const fetching=async ()=>{
  const response=await axios.get('http://localhost:300/content/',{
    headers:{
      Authorization:`Bearer ${accessToken}`
    }
  }
  )
  try{
    console.log(response.data);
    if(response.data.message=='jwt malformed'){
      nav(-1)
    }
  }catch(err){
   if(err){
    nav('login')
   }
  }
}
fetching()
  }
,[])

const [upload,setupload]=useState(avatar)

// const onupload=async ()=>{
//   const base64=await convertToBase64();
//   setupload(base64)
//   console.log(upload);
// }

// onupload()

const handleImageChange=(upload)=>{
  return  new Promise((resolve,reject)=>{
    const fileReader=new FileReader();
    fileReader.readAsDataURL(upload);
    fileReader.onload=()=>{
         resolve(fileReader.result)
    }
    fileReader.onerror=(error)=>{
        reject(error)
    }
  })
  console.log(upload);
}
const [loading,setloading]=useState(true)

useEffect(()=>{
  setTimeout(()=>{
    setloading(false)
  },6000)
},[])

  return (
    <div>
      {
        loading==true?<NewYear />:<div>

<div className='bg-gray-700 '>
      <div className=' flex justify-end items-end'>
        <div className=' flex justify-center items-center pr-36 py-4'>
        <div className=' flex justify-start items-start lg:mr-[100px] mr-28 text-2xl text-white font-mono'>WELCOME HOME</div>
        <label htmlFor='profile'>
        <div className=''>
          <img src={avatar} className=' w-10 h-10 rounded-full inline-block mt-1'/>
          <input accept='images/*' type='file' id='profile' name='profile' className=' w-1 h-0' onChange={(e)=>{
            //@ts-ignore
            handleImageChange(e.target.files[0])
            console.log(upload);
          }}/>
        </div>
        </label>
        <span className=' text-white text-xl capitalize inline-block'>{name}</span>
        <span className=' italic text-blue-300 inline-block px-2'>[{use}]</span>
      </div>
      </div>
      </div>
      <ToastContainer />
      <div className=' bg-white'>
      <div className=' grid grid-cols-2'>
        <div >
        <BarChart />
        </div>
       <div >
        <Piechart/>
       </div>
       <div>
        <LineChart />
       </div>
       <div>
        <PolarChart />
       </div>
      </div>
      </div>
        </div>
      }
    </div>
  )
}

export default Dashbord
