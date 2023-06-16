import React, { useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Signup ()  {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
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
 
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {firstName,lastName,email,password,confirmPassword} = data
    if(firstName && lastName && email && password && confirmPassword){
      if(password === confirmPassword){ 
         const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`,{
          method : "POST",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
         })
         const dataRes=await fetchData.json()
        
        //alert(dataRes.message);
        toast(dataRes.message)
        if(dataRes.alert){
          navigate("/login");
        }
      }
      else{
        toast("password and confirmpassword are not equal")
      }
    }
    else{
      toast("please Enter required fields")
    }
  }
  return (
    <div>
      <div className="w-full max-w-sm bg-white m-auto p-7 flex-col">
        <h1 className="text-center text-2xl font-bold">SIGN UP</h1>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full bg-slate-200 px-2 py-1 rounded mt-2 mb-2 focus-within:outline-blue-300"
            value={data.firstName}
            onChange={handleOnChange}
          ></input>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full bg-slate-200 px-2 py-1 rounded mt-2 mb-2 focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleOnChange}

          ></input>
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex bg-slate-200 px-2 py-1 rounded mt-2 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full bg-slate-200 border-none outline-none "
              value={data.confirmPassword}
              onChange={handleOnChange}
            ></input>

            <span
              className="flex text-2xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button type="submit" className="mt-4 mb-2 m-auto max-w-[120px] w-full bg-red-400 hover:bg-red-600 text-xl font-medium text-white text-center py-1 rounded-full">
            Sign Up
          </button>
        </form>
        <p className="text-center ">
          Already have a account ?{" "}
          <Link to={"/login"} className="text-red-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
