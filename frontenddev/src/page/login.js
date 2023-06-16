import React, { useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { loginRedux } from "../redux/userSlice";
import googleImg from "../e-commer/g2.png"
import {FcGoogle} from "react-icons/fc"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { app } from "../firebase";

const Login = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    
    email: "",
    password: "",
  
  });
  const navigate = useNavigate()

  const userData = useSelector(state => state)
  
  
  const dispatch= useDispatch()

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  
  const handleOnChange = (e)=>{
    const {name,value }= e.target
       setData((preve)=>{
        return{
           ...preve,
           [name] : value
        }
       })
  }
  const handleSubmit =async(e)=>{
    e.preventDefault()
    const {email,password} = data
    if(email && password){
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`,{
          method : "POST",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
         })
         const dataRes=await fetchData.json()
         console.log(dataRes)
         
         toast(dataRes.message)
         
         if(dataRes.alert){
          dispatch(loginRedux(dataRes))
          setTimeout(() =>{
            navigate("/")
          },1000);
        }
        console.log(userData)
      }  
    else{
      toast("please Enter required fields")
    }
  }
  const handleLogin = async()=>{
     const auth =await getAuth(app)
     const provider = new GoogleAuthProvider()
     const userData = await signInWithPopup(auth,provider)
     console.log(userData)
  }
  return (
    <div className="p-3 md:p-4">
    <div className="w-full max-w-sm bg-white m-auto p-7 flex-col">
      <h1 className="text-center text-2xl font-bold">LOGIN HERE</h1>
      <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
        
        
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full bg-slate-200 px-2 py-1 rounded mt-2 mb-2 focus-within:outline-blue-300"
          value={data.email}
          onChange={handleOnChange}
        ></input>

        <label htmlFor="password">Password</label>
        <div className="flex bg-slate-200 px-2 py-1 rounded mt-2 mb-2 focus-within:outline focus-within:outline-blue-300">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="w-full bg-slate-200 border-none outline-none "
            value={data.password}
            onChange={handleOnChange}
          ></input>

          <span
            className="flex text-2xl cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
        </div>
        
        <button type="submit" className="mt-4 mb-2 m-auto max-w-[120px] w-full bg-red-400 hover:bg-red-600 text-xl font-medium text-white text-center py-1 rounded-full">
          Login
        </button>
        
      </form>
      <p className="text-center mb-4">
        Don't have  account ?{" "}
        <Link to={"/signup"} className="text-red-600 underline">
          Sign Up
        </Link>
      </p>
      <div onClick={handleLogin} className="flex gap-2 bg-slate-200 rounded items-center justify-center border-b w-full py-2 hover:bg-slate-400 cursor-pointer">
          <div className="text-2xl"><FcGoogle/></div>
          <p className="text-semibold font-bold">Login with Google</p>
        </div>
    </div>
  </div>
);
};

export default Login