import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Allproduct from '../Component/Allproduct'
import { addCartItem } from '../redux/productSlide'

const Menu = () => {
  const {filterby} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productData = useSelector(state => state.product.productList)
  
  const productDisplay = productData.filter(el => el._id === filterby)[0]


  const handleAddCartProduct =(e)=>{
    dispatch(addCartItem(productDisplay))
 }
  const handleBuy = (e)=>{
    dispatch(addCartItem(productDisplay))
    navigate("/cart")
  }
  return (

    <div className='p-2 md:p-4'>
      <div className='w-full max-w-4xl bg-white m-auto md:flex '>
        <div className='max-w-md  overflow-hidden w-full'> 
          <img src={productDisplay.image} className='hover:scale-105 transition-all h-full'/>
        </div>
        <div className='flex flex-col gap-5'>
        <h3 className='font-semibold  capitalize text-3xl md:text-5xl'>{productDisplay.name}</h3>
        <p className='  font-medium text-slate-900 capitalize text-3xl'>{productDisplay.category}</p>
        <p className='   font-bold md:text-3xl'><span className='text-red-700'>₹</span><span >{productDisplay.price}</span></p>
          <div className='flex gap-3'>
          <button onClick={handleBuy} className=' bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[150px]'>Buy</button>
          <button onClick={handleAddCartProduct} className=' bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[150px]'>Add Cart</button>
          </div>
          <div className='text-slate-600 font-medium'>
            <p>Description: </p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <Allproduct heading={"Related Products"}/>
    </div>
  )
}

export default Menu