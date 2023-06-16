import React from 'react'
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/productSlide'
import { useDispatch } from 'react-redux'

const CardFeature = ({name,image,category,price,loading,id}) => {
  const dispatch = useDispatch()
  const handleAddCartProduct =(e)=>{
     e.stopPropagation()
     dispatch(addCartItem({
      _id : id,
      name : name,
      price : price,
      category : category,
      image : image,
     }))
  }
  return (
    
        <div className='bg-white shadow-md p-3 max-w-[200px] max-w-[200px] rounded'>
          {
            image ? ( <>
              <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior:"smooth"})}>
               <div className='h-28 flex flex-col justify-center items-center'>
           <img src={image} className=' h-full ' />
        </div>
        <h3 className='font-semibold text-center capitalize text-lg my-4 whitespace-nowrap overflow-hidden'>{name}</h3>
        <p className='text-center font-medium text-slate-500 capitalize mt-1'>{category}</p>
        <p className='text-center  font-bold'><span className='text-red-700'>₹</span><span >{price}</span></p>
        </Link>
        <button className=' bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[170px]' onClick={handleAddCartProduct }>Add Cart</button>
        
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

export default CardFeature