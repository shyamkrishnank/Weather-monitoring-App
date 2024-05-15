import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../axios/AxiosInterceptor'
import { Button } from '@nextui-org/react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,Input, useDisclosure} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import { toast } from 'react-toastify';



function Records() {

    const [records, setRecords] = useState()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [criterion, setCriterion] = useState()
    const [comparison_operator, setComparisonOperator] = useState() 
    const [frequency, setFrequency] = useState()
    const [value, setValue] = useState()


    const critirias = [
        {'key':'temperature', 'value':'Temperature'},
        {'key':'humidity','value':'Humidity'},
        {'key':'pressure', 'value':'Pressure'}
    ]
    const comparison_operators = [
        {'key':'<','value':'<'},
        {'key':'>','value':'>'},
        {'key':'<=','value':'<='},
        {'key':'>=','value':'>='},
        {'key':'==','value':'=='},

    ]
    const frequency_choices = [
        {'key':'Daily','value':'Daily'},
        {'key':'Montly','value':'Montly'},
        {'key':'Yearly','value':'Yearly'}
    ]


    useEffect(()=>{
        axiosInstance.get('/weather/getrecords/')
        .then(response=>{
            setRecords(response.data.records)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])

    const handleSubmit = () =>{
        if (value && frequency && comparison_operator && criterion){
            const data = {
                'value':value,
                'frequency':frequency,
                'comparison_operator':comparison_operator,
                'criterion':criterion
            }
            console.log(data)

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
     <div className='flex w-full justify-end pr-8'><Button color="success" onPress={onOpen} >Add Records</Button></div>
     <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Recorde</ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-3'>

                <Input type="number" label="Value" placeholder="Enter the value"  value={value} onChange={e=>setValue(e.target.value)} />

                <Select
                    label="Criterion"
                    placeholder="Select a critiria"
                    className="max-w-xs"
                    value={criterion} 
                    onChange={e=>setCriterion(e.target.value)}
                >
                    {critirias.map((critiria) => (
                    <SelectItem key={critiria.value} >
                        {critiria.key}
                    </SelectItem>
                    ))}
                    </Select>


                    <Select
                    label="Comparison Operator"
                    placeholder="Select an operator"
                    className="max-w-xs"
                    value={comparison_operator} 
                    onChange={e=>setComparisonOperator(e.target.value)}
                >
                    {comparison_operators.map((comparison) => (
                    <SelectItem key={comparison.value} >
                        {comparison.key}
                    </SelectItem>
                    ))}
                    </Select>

                    <Select
                    label="Comparison Operator"
                    placeholder="Select an operator"
                    className="max-w-xs"
                    value={frequency}
                     onChange={e=>setFrequency(e.target.value)}
                >
                    {frequency_choices.map((frequence) => (
                    <SelectItem key={frequence.value}>
                        {frequence.key}
                    </SelectItem>
                    ))}
                    </Select>




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
        {records?.length > 0 ?
        <div>

        </div>
        :
        <div className='mt-4 ml-12'>
            No Records added Yet!

        </div>

        }
      
    </div>
  )
}

export default Records
