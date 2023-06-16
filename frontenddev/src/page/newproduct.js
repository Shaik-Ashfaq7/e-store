import React, { useState } from 'react'
import {BsCloudUpload} from'react-icons/bs'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { toast } from 'react-hot-toast'

const Newproduct = () => {
    const [data,setData] = useState ({
      name : "",
      category : "",
      image : "",
      price : "",
      description : "",
    })
    
    const handleOnChange =(e)=>{
      const {name,value} =e.target

      setData((preve)=>{
         return{
                ...preve,
                [name] : value
         }
      })

    }

    const uploadImage =async(e) =>{
       const data= await ImagetoBase64(e.target.files[0])
       //console.log(data)
       setData((preve)=>{
        return{
           ...preve,
              image  : data
        }
       })

    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
         console.log(data)
       
         const{name,image,price,category}= data
         if(name && image && price && category){
          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })
              
          const fetchRes = await fetchData.json()
          console.log(fetchRes)
          toast(fetchRes.message)

          setData(()=>{
             return{
              name : "",
              category : "",
              image : "",
              price : "",
              description : "",
             }
          })
         }
         else{
          toast("Enter Required fields")
         }

        
    }
  return (
    <div className='p-4'>
     <form className='m-auto w-full max-w-md p-4 shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
      <label htmlFor='name' >Name</label>
      <input type={"text"} name="name" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name}/>
      <label htmlFor='category' className='mt-2'>Category</label>

      <select className=' bg-slate-200 my-1' name="category" onChange={handleOnChange} value={data.category}>
        <option value={"other"}>Select Category</option>
        <option value={"fruits  "} >Fruits</option>
        <option value={"vegetables"}>Vegetables</option>
        <option value={"icecream"}>Icecream</option>
        <option value={"dosa"}>Dosa </option>

      </select>
      <label htmlFor='image' >Upload Image
      <div  className=' h-40 bg-slate-200 w-full rounded flex items-center justify-center cursor-pointer '>
        {
          data.image ? <img src={data.image} className="h-full"/> : <span className='text-6xl'><BsCloudUpload/></span>
        }
        
        
        <input type={"file"} accept='image/*' id='image' onChange={uploadImage} className='hidden'></input>
      </div>
      </label>

      <label htmlFor='price' >Price</label>
      <input type={"text"} name="price" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.price}/>
      <label htmlFor='description' >Description</label>
      <textarea rows={2} className='bg-slate-200 p-1 my-1 resize-none' name="description" onChange={handleOnChange} value={data.description}></textarea>
      <button type="submit" className="mt-4 mb-2 m-auto max-w-[120px] w-full bg-red-400 hover:bg-red-600 text-xl font-medium text-white text-center py-1 rounded-full">
          Save
        </button>
     </form>

    </div>
  )
}

export default Newproduct