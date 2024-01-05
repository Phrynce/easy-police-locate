import Login from "./components/Login";
import { Route,Routes } from 'react-router';
import Signup from "./components/Signup";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Home";
import Dashbord from "./components/Dashbord";
import { useContext } from "react";
import { useState } from "react";
import React from "react";
import NewYear from "./components/NewYear";
import About from "./components/About";
import Edit from "./components/Edit";
import Home1 from "./components/Home1";

export const usercontext=React.createContext()


function App() {
const [username,setusername]=useState()
const [pword,setpword]=useState()
const [name,setname]=useState()
const [use,setuse]=useState()
const [accessToken,setaccessToken]=useState()
const [userID,setuserID]=useState() 
const [Name,setName]=useState()
const [Email,setEmail]=useState()
  return (
    <div className="App">
      <usercontext.Provider value={[username,setusername,pword,setpword,name,setname,use,setuse,accessToken,setaccessToken,userID,setuserID,Name,setName,Email,setEmail]}>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<Dashbord />} />
        <Route path="about" element={<About />} />
        <Route path="edit" element={<Edit />} />
        <Route path="emergency" element={<Home1 />} />
      </Routes>
      </usercontext.Provider>
    </div>
  );
}

export default App;
