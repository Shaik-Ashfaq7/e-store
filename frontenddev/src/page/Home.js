import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../Component/HomeCard'
import { useSelector } from 'react-redux'
import CardFeature from '../Component/CardFeature'
import {GrNext} from "react-icons/gr"
import {GrPrevious} from "react-icons/gr"
import FilterProduct from '../Component/FilterProduct'
import Allproduct from '../Component/Allproduct'
import dImage from "../e-commer/d3.gif" 
import {IoLogoYoutube} from "react-icons/io"
import {FaTwitter} from "react-icons/fa"
import {AiFillLinkedin} from "react-icons/ai"
import {BsInstagram,BsFacebook} from "react-icons/bs"

const Home = () => {
  const productData = useSelector((state)=>state.product.productList)
  const homeProductCartList = productData.slice(0,4)
  const homeProductCartListVegetables = productData.filter(el=> el.category === "vegetables",[])


  const loadingArray = new Array(4).fill(null)
  const loadingArrayFeature =new Array(7).fill(null)

  const slideProductRef = useRef()
  const nextProduct = ()=>{
    slideProductRef.current.scrollLeft +=200
  }
  const preveProduct = ()=>{
    slideProductRef.current.scrollLeft -=200
  }
  

  
  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2'>
          <div className='flex gap-3 w-56 px-5 bg-yellow-400 items-center rounded-full'>
           <p className='text-xl font-medium text-slate-900'>Bike Delivery</p>
           <img src={dImage} className='h-10'></img>
          </div>
         <h2 className='text-4xl md:text-7xl font-bold py-3'>The Fastest Delivery in <span className='text-red-800 '>Your Home</span></h2>
         <p className='py-3 text-base'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
          <button type='submit' className='bg-red-400 hover:bg-red-600 text-slate-100 rounded-full mt-4 items-center w-36 h-9 font-bold'>Order Now</button>
       </div>
        <div className='md:w-1/2 flex flex-wrap gap-6 p-6 justify-center'>
          {
            homeProductCartList[0] ? homeProductCartList.map(el =>{
              return(
                <HomeCard
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                  
                />
              )
            })
            :
            loadingArray.map((el,index)=>{
              return(
                <HomeCard
                   key={index+"loading"}
                   loading={"Loading..."}
                />
              )
            })
          }
        </div>
      </div>
          <div className=''>
           <div className='flex w-full items-center'>
           <h2 className='font-bold text-slate-800 text-2xl mb-4'>Fresh Vegetables</h2>
             <div className='ml-auto flex gap-4'>
             <button onClick={preveProduct} className='bg-slate-200 hover:bg-slate-400'><GrPrevious/></button>
             <button onClick={nextProduct} className='bg-slate-200 hover:bg-slate-400'><GrNext/></button>
             </div>
           </div>
           <div className='flex gap-8 overflow-scroll scroll-smooth transition-all scrollbar-none' ref={slideProductRef}>
             {
                homeProductCartListVegetables[0] ? homeProductCartListVegetables.map(el=>{
                return(
                  <CardFeature
                  key={el._id+"vegetables"}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                  />
                )
              })
              :
              loadingArrayFeature.map((el,index)=>{
                return(
                  <CardFeature
                  key={index+"cartLoading"}
                  loading={"Loading..."}
                  />

                )
              })
              
             }
           </div>
          </div>
          
          <Allproduct heading={"Your Product"}/>
          <>
          <div className='w-full bg-slate-400 h-32 flex-col flex text-center font-semibold text-2xl'>
          <h2 className='flex flex-col'>SOCIAL LINKS</h2>
          <div className='flex gap-5 text-3xl justify-center py-5'>
          <div className='cursor-pointer hover:scale-150 transition-all h-full'><IoLogoYoutube/></div>
          <div className='cursor-pointer hover:scale-150 transition-all h-full'><FaTwitter/></div>
          <div className='cursor-pointer hover:scale-150 transition-all h-full'><BsInstagram/></div>
          <div className='cursor-pointer hover:scale-150 transition-all h-full'><BsFacebook/></div>
          <div className='cursor-pointer hover:scale-150 transition-all h-full'><AiFillLinkedin/></div>
          
          </div>
          <p className='text-sm font-lg'>@trademark</p>
           </div>
           </>
    </div>
    
  )
}

export default Home