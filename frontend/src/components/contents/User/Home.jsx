import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../axios/AxiosInterceptor'
import {Modal, ModalContent, ModalHeader,Input, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { toast } from 'react-toastify';


function Home() {
    const[is_location, setIsLocation] = useState(true)
    const {isOpen, onOpen,onClose, onOpenChange} = useDisclosure()
    const [city_name, setCityname] = useState()
    const [state, setState] = useState()
    const [pin_code, setPinCode] = useState()
    const [country, setCountry] = useState()
    const [country_code, setCountryCode] = useState()

    useEffect(()=>{
        axiosInstance.get('/auth/getlocation')
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            if (error.response.status==400){
                setIsLocation(false)  
                onOpen()   
            }
        })

    },[])

    const handleClose = () =>{
        if(is_location){
            onClose()

        }
        else{
            toast.error('Please Fill All fields', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                })
                onOpen()
        }

    }
    
    const handleSubmit = () =>{
     if(city_name && state && pin_code && country && country_code){
        const data = {
            'city_name':city_name,
            'state' : state,
            'pin_code': pin_code,
            'country':country,
            'country_code':country_code
        }
        axiosInstance.post('/auth/addlocation/', data)
        .then(response=>{
            toast.success(`${response.data.message}`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                })
            setIsLocation(true)
            onClose()
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
                })
        })
    }
    else{
        toast.error('Please Fill All fields', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
            })
            onOpen()

    }
    }

  return (
    <div>
        {!is_location &&
         <>
           <Modal isOpen={isOpen} onClose={handleClose} onOpenChange={onOpenChange}>
             <ModalContent>
               {(onClose) => (
                 <>
                   <ModalHeader className="flex flex-col gap-1">Location</ModalHeader>
                   <ModalBody>
                    <div className='flex flex-col gap-2'>
                     <Input type="text" value={city_name} onChange={e=>setCityname(e.target.value)} label="City Name" placeholder="Enter your city name" />
                     <Input type="text" value={state} onChange={e=>setState(e.target.value)} label="State" placeholder="Enter your state" />
                     <Input type="text" value={pin_code} onChange={e=>setPinCode(e.target.value)} label="Pin Code" placeholder="Enter your pin code" />
                     <Input type="text" value={country} onChange={e=>setCountry(e.target.value)} label="Country" placeholder="Enter your country" />
                     <Input type="text" value={country_code} onChange={e=>setCountryCode(e.target.value)} label="Country Code" placeholder="Enter your country code" />
                    </div>
                   </ModalBody>
                   <ModalFooter>
                     <Button color="danger" variant="light" onPress={onClose}>
                       Close
                     </Button>
                     <Button color="primary" onPress={handleSubmit}>
                       Submit
                     </Button>
                   </ModalFooter>
                 </>
               )}
             </ModalContent>
           </Modal>
         </> 
        } 
    <div>
    </div>
      
    </div>
  )
}

export default Home
