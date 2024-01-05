import React, { useEffect, useState } from 'react'

const Geolocation = () => {
    const [location,setlocation]=useState({
        loaded:false,
        cordinates:{
            lat:'',
            long:''
        },
    })

 const onsuccess=(location)=>{
        setlocation(
            {
                loaded:true,
                cordinates:{
                    lat:location.coords.latitude,
                    long:location.coords.longitude
                },
            }
        )
        console.log(location);
    }
    
 const onerror=(error)=>{
    setlocation({
        loaded:true,
        error
    })

    console.log(error);
 }

useEffect(()=>{
    if(!('geolocation'in navigator)){
        onerror({
            code:0,
            message:'no geolocation present'
        })
    }
    navigator.geolocation.getCurrentPosition(onsuccess,onerror)
},[])

  return location
}

export default Geolocation
