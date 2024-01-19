import React, { useState } from 'react'
import avatar from './images/avartar.jpg'
import { usercontext } from '../App';
import { useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Edit = () => {
    const [username,setusername,pword,setpword,name,setname,use,setuse,accessToken,setaccessToken,userID,setuserID,Name,setName,Email,setEmail]=useContext(usercontext)

    const [fname,setfname]=useState(Name)

    function edit(e){
        setfname(e.target.value)
    }
    const [mail,setmail]=useState(Email)

    function edit1(e){
        setmail(e.target.value)
    }
    
    const nav=useNavigate()

    axios.defaults.withCredentials=true;
    const handleUpdate=async (e)=>{
        e.preventDefault()  
        try{
    const respons=await axios.put(`https://policehelpapi.onrender.com/update/${userID}`,{fname,mail})
    console.log(respons.data.message);
    toast(respons.data.message)
    if(respons.data.message=='updated successfully'){
      nav(-1)
    }
}
      catch(err){
        console.log(err.message);

      } 
    }

  return (
    <div className=' flex justify-center'>
      <div className=' w-[400px] rounded-xl h-[700px] flex justify-center md:mx-0 mx-2' style={{backgroundColor:' rgb(39, 41, 41)'}}>
        <div>
            <div>
                <img src={avatar} className=' w-[300px] h-[300px] rounded-full' />
                <div className=' w-[300px] h-[1px] bg-gray-600 mt-6'></div>
            </div>
            <div className=' text-lg text-white flex font-serif font-bold justify-center mt-8 mb-6 '>Profile Information </div>
            <div className=' mx-5 mb-3'>
            <div className=' text-white font-thin text-lg mb-1'>User Name</div>
            <input type='email' value={fname} onChange={edit}  className=' w-[260px] h-[40px] border-2 bg-blue-100 rounded-lg border-black px-2 py-2'/>
            <div className=' text-gray-500 text-sm'> This is the display name, All users can see this</div>
            </div>
            <div className=' mx-5 mb-3'>
            <div className=' text-white font-thin text-lg mb-1'>Email Address</div>
            <input type='text' value={mail} onChange={edit1} className=' w-[260px] h-[40px] border-2 bg-blue-100 rounded-lg border-black px-2 py-2' />
            <div className=' text-gray-500 text-sm'>This is your email, only you can see it</div>
            </div>
            <div className=' mx-5 cursor-pointer' onClick={handleUpdate} >
            <div className=' w-[260px] h-[43px] bg-blue-600 rounded-lg flex justify-center items-center text-white'>save Details</div>
            </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Edit
