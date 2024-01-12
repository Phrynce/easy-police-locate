import React, { useEffect, useState ,useRef, useCallback} from 'react'
import { usercontext } from '../App';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { MapContainer,Marker,Popup,TileLayer, useMap, useMapEvents,FeatureGroup} from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import l from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Geolocation from './Geolocation';
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet/dist/leaflet.css'
import { FaBars, FaTimes } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { GiHouse } from "react-icons/gi";
import { FaCircleInfo } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { MdLogin, MdLogout } from "react-icons/md";
import { FaPersonCircleExclamation } from "react-icons/fa6";
import { Draggable } from 'leaflet';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';



const Home1 = () => {
  const ref=useRef()
  const maker=new l.icon({
      iconUrl:'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png',
      iconSize:[25,35],
      popupAnchor:[-3,-37],
     iconAnchor:[17,46]
  })
  const marker=new l.icon({
    iconUrl:'https://static.thenounproject.com/png/1825346-200.png',
    iconSize:[50,45],
    popupAnchor:[13,-37],
    iconAnchor:[17,46]
  })

  const [username,setusername,pword,setpword,name,setname,use,setuse]=useContext(usercontext)


useEffect(()=>{
  const notify= async()=>{
    await toast.success(`welcome Citizen`)
  }
  notify()
},[])

const location=Geolocation()

 function Find(){
  const map = useMap()
  map.flyTo([location.cordinates.lat,location.cordinates.long],14,{animate:true})
 }




 

 const [toggle,settoggle]=useState(true);

 function handleToggle(){
  settoggle(prev=>!prev);
 }

const [display,setdisplay]=useState(true)

function report(){
  setdisplay(true)
}

const [look,setlook]=useState()
const [loading,setloading]=useState(true)




const GetDetails=async ()=>{
    const response=await axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=04b2bf1d45c44641a843467a6ed78469')
    try{
      setlook(response.data)
      setloading(false)
      console.log(look);
    }catch(error){
      console.log(error);
      setloading(true)
    }
    
    
}

useEffect(()=>{
  GetDetails()
},[])


const [popup,setpopup]=useState(false)

function handlePopup(e){
  e.preventDefault();
  setpopup(true)
}

function popdown(e){
e.preventDefault()
setpopup(false)
}

const nav=useNavigate()

function handle(){
  nav('/about')
}
function login(){
    nav('/')
}

const [reporterName,setreporterName]=useState()
const [incidenceName,setincidenceName]=useState()
const [incidenceDetails,setincidenceDetails]=useState()
const [reporterNumber,setreporterNumber]=useState()

axios.defaults.withCredentials=true
const Report=async()=>{
  const send=await axios.post('https://myapi-27df.onrender.com/reports',{reporterName,incidenceName,incidenceDetails,reporterNumber})
  try{
    console.log(send.data);
    if(send.data.message=="Report sent"){
      toast.success(send.data.message)
    }
    if(send.data.message=="contents are required for investigation"){
      toast.warn("cannot send empty report")
    }
    popdown()
  }catch(err){
    console.log(err);
  }
}


  return (
    <div >
      <div className='' >
        {
          toggle==true?
          <div className=' flex justify-end' >
            <div className=' absolute z-50 pt-5 px-6' onClick={handleToggle}>
          <div className=' bg-black/60 text-white w-9 h-9 rounded-lg flex justify-center items-center relative '>
          <FaBars size={17} />
          </div></div>    </div> :<div className=' flex justify-end'><div className='bg-white w-32 h-full z-50 absolute transition-all duration-500'>
          <div className=' flex justify-center items-center mt-14'onClick={login}>
            <div className=' w-24 h-8 rounded-md drop-shadow-md bg-blue-600 flex justify-center items-center font-bold text-white'>
            <div className=' inline-block capitalize font-semi-bold text-[17px] font-sans  mx-1 cursor-pointer' >logIn</div>
            <div className=' inline-block font-semi-bold text-[15px] font-sans' ><MdLogin size={18} /></div>
            </div>
          </div>
          </div><div onClick={handleToggle} className=' absolute w-full h-full z-10 bg-black opacity-50'> </div></div>
          
        }
        {
          popup==true?<div className=' flex justify-end'>
           <div className=' bg-gray-900/95 rounded-xl w-[250px] h-[580px] mx-10 text-white absolute z-10 mt-20'>
            <div className=' flex justify-center items-center mt-3'>
              <div className=' text-2xl font-bold font-sans'>{loading==true?<div>Searching..</div>:<span className=' inline-block'>{look.country_name} <span><img src={look.country_flag} className=' w-8 h-6 inline-block' /></span></span>
}</div>
            </div>
            <div className=' flex justify-center items-center'>
              <div className=' text-lg font-thin'>{loading==true?<div>Searching..</div>:look.city
}</div>
            </div>
            <div className=' grid grid-cols-2 gap-1 mx-2 mt-5 '>
              <div className=' inline-block text-center'>Lat: <div className=' w-[70px] inline-block rounded-md h-7 text-lg font-semibold bg-gray-100 text-black'>{look.latitude}</div></div>
              <div className=' inline-block text-center'>lon: <div className=' w-[70px] inline-block rounded-md h-7 text-lg font-semibold bg-gray-100 text-black'>{look.longitude}</div></div>
             
              </div>
              <div className=' mt-5 mx-3'>
          <div className=' text-gray-300'>Reporter's Name</div>
         <div className=''> <input type='text' className=' w-[210px] h-10 rounded-md px-4 text-black' placeholder='e.g: Prince' value={reporterName} onChange={(e)=>{
          setreporterName(e.target.value)
         }} /></div>
        </div>
        <div className=' mt-5 mx-3'>
          <div className=' text-gray-300'>Ongoing Incidence</div>
         <div className=''> <input type='text' className=' w-[210px] h-10 rounded-md px-4 text-black' placeholder='e.g: Fire Outbreak' value={incidenceName} onChange={(e)=>{
          setincidenceName(e.target.value)
         }} /></div>
        </div>
        <div className=' mt-5 mx-3'>
          <div className=' text-gray-300'>Incidence description</div>
         <div className=' '> <textarea  className=' w-[210px] h-24 rounded-md px-2 py-2 text-black ' placeholder='e.g: Detailed description on the incidence you are reporting' value={incidenceDetails} onChange={(e)=>{
          setincidenceDetails(e.target.value)
         }} ></textarea></div>
        </div>
        <div className=' mx-3'>
          <div className=' text-gray-300'>Reporter's contact</div>
         <div className=''> <input type='text' className=' w-[210px] h-10 rounded-md px-4 text-black' placeholder='e.g: 0595248912' value={reporterNumber} onChange={(e)=>{
          setreporterNumber(e.target.value)
         }} /></div>
        </div>
        <div className=' inline-block w-[80px] h-[37px] bg-blue-600 mt-5 mx-3 text-center rounded-md cursor-pointer hover:bg-blue-800 font-thin text-lg'><span className=' flex justify-center pt-[3px]  items-center'>Report</span></div>
        <div className=' inline-block w-[80px] h-[37px] bg-white border-[1px] border-blue-500 mt-5 mx-2 text-center cursor-pointer rounded-md font-thin text-lg pt-[2px] text-black' onClick={popdown}><span className=' flex justify-center items-center'>cancel</span></div>
           </div>
          </div>:null
          
        }
      <div onClick={handlePopup} >
          <MapContainer center={[7.9465,1.0232]} zoom={5} ref={ref} scrollWheelZoom={false}    >
          <Find />
            <FeatureGroup>
                  <EditControl position='topleft' draw={{marker:false}}  />
            </FeatureGroup>
        <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
       {location.loaded && !location.error && (
        <Marker position={[location.cordinates.lat,location.cordinates.long]} icon={maker} >
          <Popup>You are here</Popup>
        </Marker>
       )}
      </MapContainer>
      </div>
      </div>
      <ToastContainer />
      
    </div>
  )
}

export default Home1
