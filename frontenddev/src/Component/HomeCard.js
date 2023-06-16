import React from 'react'
import { Link } from 'react-router-dom'

const HomeCard = ({name,image,category,price,loading,id}) => {
  return (
    <div className='bg-white shadow-md p-2 rounded min-w-[150px]'>
        {
          name ? (
          <>
          <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior:"smooth"})}>
            <div className='w-40 min-h-[250px]'>
           <img src={image} className='w-full h-full '></img>
        </div>
        <h3 className='font-semibold text-center capitalize text-lg'>{name}</h3>
        <p className='text-center font-medium text-slate-500 capitalize'>{category}</p>
        <p className='text-center  font-bold'><span className='text-red-700'>₹</span><span >{price}</span></p>
        </Link>
          </>
        )
        :
        <div className='flex items-center h-full justify-center'>
          <p>{loading}</p>
        </div>
      }
    </div>
  )
}

export default HomeCard