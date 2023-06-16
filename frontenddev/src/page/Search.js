import React from 'react'
import Allproduct from '../Component/Allproduct'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from '../redux/productSlide'

const Search = () => {
    const {filterby} = useParams()
    

 
  return (
    <div className='p-2 md:p-4'>
        
      <Allproduct heading={"Searched Products"}/>
    </div>
  )
}

export default Search