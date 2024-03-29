import React, { useState } from 'react';
import axios from 'axios'
import './form.css'
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { usercontext } from '../App';
import { useContext } from 'react';
import police1 from './images/police1.jfif'


const Login = () => {

const [username,setusername,pword,setpword,name,setname,use,setuse,accessToken,setaccessToken,userID,setuserID]=useContext(usercontext)


const nav=useNavigate()

axios.defaults.withCredentials=true;
    const handleSubmit=async (e)=>{
      e.preventDefault()
      const res=await axios.post('https://policehelpapi.onrender.com/login',{username,pword})
      try{
        console.log(res);
        if(res.data.message==='username and password requird'){
          toast(res.data.message)
        }
        if(res.data.message==='user does not exist'){
          toast(res.data.message)
        }if(res.data.role.user==="Admin"){
          console.log(res.data);
          nav('/dashboard')
        }if(res.data.role.user==="visiter"){
          console.log(res.data);
          nav('/home')
        }
        setuserID(res.data.ID)
        console.log(userID);
        setname(res.data.name)
        setaccessToken(res.data.accessToken)
        setuse(res.data.role.user)
      }
      catch(err){
        console.log(err);
      } 
      }
    function move(){
      nav('/signup')
    }
    function Emergency(){
      nav('/emergency')
    }


  return (
    <div>
            <div className=' flex justify-center items-center md:mt-10 mt-24 md:mx-0 mx-4'>
        <form class="form_main" action="">
          <div className=' text-2xl font-thin '>Welcome Back Citizen!</div>
    <p className="heading " >Login</p>
    <div class="inputContainer">
        <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="inputIcon">
        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
        </svg>
    <input placeholder="Email" id="username" value={username} onChange={(e)=>{
      setusername(e.target.value)
    }}  class="inputField" type="text" />
    </div>
    
<div class="inputContainer">
    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="inputIcon">
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
    </svg>
    <input placeholder="Password" id="password" value={pword} onChange={(e)=>{
      setpword(e.target.value)

    }} 
    class="inputField" type="password" />
</div>
              
           
<button id="button" onClick={handleSubmit}>Submit</button>
    <div className="signupContainer cursor-pointer z-10" onClick={move}>
        <p className=''>Don't have any account?</p>
       <div className=' w-16 h-8 mt-1 rounded-md bg-blue-950 flex justify-center items-center text-white'><a className=''>Sign up</a></div> 
    </div>
    <div className=' mt-6 z-10'>
      For Emergency <span className=' text-red-600 cursor-pointer' onClick={Emergency} >click here</span>
    </div>
</form>
</div>
<ToastContainer />
    </div>
  )
}

export default Login
