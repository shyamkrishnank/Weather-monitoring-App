import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../axios/AxiosInterceptor'
import { Button } from '@nextui-org/react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,Input, useDisclosure} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";



function Records() {

    const [records, setRecords] = useState()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [criterion, setCriterion] = useState()
    const [comparison_operator, setComparisonOperator] = useState() 
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


    useEffect(()=>{
        axiosInstance.get('/weather/getrecords/')
        .then(response=>{
            setRecords(response.data.records)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])



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
                <Select
                    label="Criterion"
                    placeholder="Select a critiria"
                    className="max-w-xs"
                >
                    {critirias.map((critiria) => (
                    <SelectItem key={critiria.value} value={criterion} onChange={e=>setComparisonOperator(e.target.value)}>
                        {critiria.key}
                    </SelectItem>
                    ))}
                    </Select>


                    <Select
                    label="Comparison Operator"
                    placeholder="Select an operator"
                    className="max-w-xs"
                >
                    {comparison_operators.map((comparison) => (
                    <SelectItem key={comparison.value} value={}>
                        {comparison.key}
                    </SelectItem>
                    ))}
                    </Select>

                  <Input type="text" label="" placeholder="Enter your email" />


                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
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
