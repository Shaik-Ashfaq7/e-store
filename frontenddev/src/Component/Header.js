import React, { useState } from 'react'
import logo from "../e-commer/d5.gif"
import { Link } from 'react-router-dom'
import {FaUserAlt} from "react-icons/fa"
import {BsCartFill} from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { logoutRedux } from '../redux/userSlice'
import {HiSearch} from 'react-icons/hi'


const Header = () => {
  const [showMenu , setShowMenu] =useState(false);
  const userData = useSelector((state)=>state.user)
  
 
  const dispatch = useDispatch()

  const handleLogout = ()=>{
    dispatch(logoutRedux())
    toast("logout successfully")
  }
  const handleShowMenu =()=>{
    setShowMenu(preve => !preve)
}


  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
    <header className='fixed shadow-md w-full h-16 px-2 md:px-6 z-50 bg-black'>
        {/*desktop*/}
        <div className='flex items-center h-full justify-between'>
          <Link to={""}>
          <div className='h-16'>
            <img src={logo} className="h-full"/>
          </div>
          </Link>
          <div className='flex '>
          <div className='flex w-full  rounded  focus-within:outline focus-within:outline-yellow-400 '>
            <input
             type="text"
            id="searchbar"
            name="searchbar"
            placeholder='Search for products'
            className="w-full items-center px-2 py-1  h-10 bg-slate-200  focus-within:outline-slate-800 min-w-[700px] " />
            <Link to={"search"}>
            <span className='flex bg-yellow-500 h-10 w-10 text-red text-2xl  items-center justify-center cursor-pointer'><HiSearch/></span>
            </Link>
              
            </div>
          </div>
          <div className='flex items-center  gap-4  h-full md:gap-5'>
            <nav className='items-center gap-5 md:gap-5 text-base md:text-lg hidden md:flex text-white '>
              <Link to={""}>Home</Link>
              <Link to={"menu/6476fcc43ed1a6332a06bcf5"}>Menu</Link>
              <Link to={"about"}>About</Link>
              <Link to={"contact"}>Contact</Link>
            </nav>
            <div className='text-2xl text-white relative'>
              <Link to={"cart"}><BsCartFill/>
              <div className='absolute -top-6 -right-0 text-green bg-white-300 h-4 w-4 m-0 p-0 rounded-full'>
                {cartItemNumber.length}
              </div>
              </Link>
            </div>
            <div className='text-xl text-black' onClick={handleShowMenu}>
              <div className='border-2 border-solid border-slate-500 rounded-full p-2 cursor-pointer bg-white hover:bg-grey-600' >
              <FaUserAlt/>
              </div>
              {
                showMenu &&(<div className='absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[80px]'>
                  {
                    userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer'>New product</Link>
                  }
              
                {
                  userData.email ?<p className='cursor-pointer text-white bg-red-500' onClick={handleLogout}>Logout</p> : <Link to={"login"} className='whitespace-nowrap cursor-pointer'>Login</Link>
                }
                <nav className=' text-base md:text-lg flex flex-col md '>
              <Link to={""}>Home</Link>
              <Link to={"menu/6476fcc43ed1a6332a06bcf5"}>Menu</Link>
              <Link to={"about"}>About</Link>
              <Link to={"contact"}>Contact</Link>
            </nav>
                
              </div>)
              }
              
            </div>
          </div>
        </div>

       {/*mobile*/} 
    </header>
  )
}

export default Header