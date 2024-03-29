import React from 'react'
import { useSelector } from 'react-redux'

import CartProduct from '../Component/cartProduct'
import { current } from '@reduxjs/toolkit'
import { json, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {loadStripe} from "@stripe/stripe-js"

const Cart = () => {

    const productCartItem = useSelector((state)=>state.product.cartItem)

   
    const user = useSelector(state => state.user)
 
    const navigate = useNavigate()

    const totalPrice = productCartItem.reduce((acc,curr)=>acc + parseInt(curr.total),0)
    const totalQty = productCartItem.reduce((acc,curr)=>acc + parseInt(curr.qty),0)

    

    const handlePayment = async()=>{
      if (user.email){
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        const res=await fetch (`${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`,{
          method : "POST",
          headers :{
            "content-type" : "application/json"
          },
           body : JSON.stringify(productCartItem)
        })
          if(res.statusCode === 500 )return;
  
          const data =await res.json()
          console.log(data)
          toast("Redirect to payment Gateway...!")
          stripePromise.redirectToCheckout({sessionId : data})
      }else{
        toast("You have to Login First!")
        setTimeout(()=>{
           navigate("/login")
        },1000)
      }
      
    }
  return (
    <>
    <div className='p-2 md:p-4'>
       <h2 className='font-bond text-lg text-5xl'>Your Cart Items</h2> 
       {
        productCartItem[0] ?
       <div className='my-4 flex'>
          {/* display Cart Items */}
          <div className='w-full max-w-3xl'>
            {
                productCartItem.map(el =>{
                    return(
                        <CartProduct
                         key={el._id}
                         id={el._id}
                         qty={el.qty}
                          image={el.image}
                          name={el.name}
                          category={el.category}
                          total={el.total}
                          price={el.price}
                        />
                    )
                })
            }
          </div>

          {/* total cart items */}
          <div className='w-full max-w-md ml-auto'>
            <h2 className='bg-blue-500 text-lg text-white p-2 flex justify-center'>Summary</h2>
            <div className='flex w-full py-2 text-lg border-b'>
               <p>Total Quantity</p>
               <p className='ml-auto w-32 font-bold'>{totalQty}</p>
            </div>
            <div className='flex w-full py-2 text-lg border-b'>
               <p>Total Price</p>
               <p className='ml-auto w-32 font-bold'><span className='text-red-700'>₹</span>{totalPrice}</p>
            </div>
            <button onClick={handlePayment} className='bg-red-500 w-full text-lg items-center rounded text-white py-2'>Payment</button>
          </div>
          </div>
        :
          <>
          <div className='flex w-full justify-center items-center flex-col'>
            <img src="https://semisearch.in/site-assets/images/no-cart.gif" className='w-full max-w-sm'></img>
            <p className='font-bold text-4xl text-slate-500'>Empty Cart </p>
          </div>
          </>
        }
    </div>
    </>
  )
}

export default Cart