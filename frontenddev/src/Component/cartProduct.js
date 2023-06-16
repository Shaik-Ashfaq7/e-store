import React from 'react'
import {BiMinus} from "react-icons/bi"
import {GoPlus} from "react-icons/go"
import {RiDeleteBin6Line} from "react-icons/ri"
import { useDispatch } from 'react-redux'
import { deleteCartItem,increaseQty,decreaseQty } from '../redux/productSlide'

const CartProduct = ({id,name,image,category,qty,total,price}) => {
  const dispatch = useDispatch()
  return (
    <div className='bg-slate-200 p-2 flex gap-4 border rounded-2 border-slate-500'>
        <div className='p-3 bg-white rounded overflow-hidden'>
            <img src={image} className='h-28 w-40 object-cover'/>
        </div>
        <div className='flex flex-col gap-1 w-full'>
          <div className='flex justify-between'>
        <h3 className='font-semibold  capitalize text-3xl md:text-2xl'>{name}</h3>
        <div className='cursor-pointer text-slate-700 hover:text-red-700 text-3xl' onClick={()=>dispatch(deleteCartItem(id))}>
          <RiDeleteBin6Line/>
        </div>
        </div>
        <p className='  font-medium text-slate-900 capitalize '>{category}</p>
        <p className='   font-bold text-base'><span className='text-red-700'>₹</span><span >{price}</span></p>
        <div className='flex justify-between '>
          <div className='flex gap-3 items-center'>
          <button onClick={()=>dispatch(increaseQty(id))} className=' bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 p-1 '><GoPlus/></button>
          <p className='p-1 font-semibold '>{qty}</p>
          <button onClick={()=>dispatch(decreaseQty(id))} className=' bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 p-1 '><BiMinus/></button>
          </div>
          <div className='flex items-center gap-2 font-bold'>
            <p>Total : </p>
            <p><span className='text-red-700'>₹</span>{total}</p>
          </div>
        </div>
        </div>
    </div>
  )
}

export default CartProduct