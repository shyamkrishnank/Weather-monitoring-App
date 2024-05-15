import React, { useState } from 'react'
import {Image, Input, Button} from "@nextui-org/react";
import { axiosInstance } from '../axios/AxiosInterceptor';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logged } from '../../../Slices/AuthSlice';


function LoginForm() {
   const [username, setUsername] = useState()
   const [password, setPassword] = useState()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleSubmit = () =>{
    const data = {
      'username':username,
      'password':password
    }
    if (username && password){
    axiosInstance.post('/auth/login/',data )
    .then(response=>{
      dispatch(logged())
      toast.success('Logged In Successfully!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
       navigate('/user')
    })
    .catch(error=>{
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
    })
     }
     else{
      toast.error('Please fill all fields', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });

     }
   }


    return (
        <div className='mt-7'>
            <div className='flex justify-center gap-4 w-full '>
              <div className='basis-1/2 flex justify-end mt-10'>
                <Image
                width={350}
                src='https://i.pinimg.com/564x/af/8c/fc/af8cfcc8ad5392a4a2d07b3741849fcc.jpg'
                />

              </div>
                    <div className=' basis-1/2 mt-24'>
                      <div className='w-6/12 flex flex-col gap-6 justify-center'>
                        <div className='flex justify-center'><h1 className='text-4xl font-semibold'>Log In</h1></div> 
                        <div className='flex flex-col gap-6 mt-4'>
                        <div>
                         <Input type="text" value={username} onChange={e=>setUsername(e.target.value)} label="Username" placeholder="Enter your usename" />
                        </div>
                        <div>
                         <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} label="Password" placeholder="Enter your password" />
                        </div>
                        <div className='flex justify-center'>
                        <Button onClick={handleSubmit} color="success" variant="bordered">
                         Submit
                        </Button>
                        </div>                         
                        </div>
                      </div>
                    </div>
            </div>
        </div>
      )
    }

export default LoginForm
