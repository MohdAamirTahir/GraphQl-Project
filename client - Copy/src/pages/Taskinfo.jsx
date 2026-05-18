import React,{useState}from 'react' 
import { useNavigate } from 'react-router-dom'
import { useMutation } from "@apollo/client/react";
import { DELETE_TASK } from '../Mutations/Mutations';
import { ALL_TASK } from '../Queries/query';
const Taskinfo = ({task})=>{
    const [optionvalue,setoptionvalue] =  useState(["Delete","View","Edit"])
    const [deletetask] = useMutation(DELETE_TASK,{
        variables:{id:task.id},
        refetchQueries:[{query:ALL_TASK}]
    })
    

    const navigate = useNavigate()
    const handlechange = (e)=>{
       if(e.target.value ==="Delete"){
         deletetask()
       }else if(e.target.value ==="Edit"){
          navigate(`/edittask/${task.id}`)
       }else if(e.target.value ==="View"){
          navigate(`/viewtask/${task.id}`)
       }else{
          alert("You Click on Wrong One")
       }
    }
   return(
       <div>
            <hr className='bg-black h-1'/>
            <div>
                <ul className='flex '>
                    <li className='ml-4 mt-1 p-2'>{task.title}</li>
                    <li className='ml-4 mt-1 p-2'>{task.description}</li>
                    <li className='ml-4 mt-1 p-2'>{task?.user?.name || "No User"}</li>
                    <li className='ml-4 mt-1 p-2'>
                        <select className='bg-gray-700 rounded-md p-1 text-white font-semibold m-1' onChange={(user)=>handlechange(user)}>
                             <option value="">Select Option</option>
                             {
                                optionvalue.map((v,i)=>(
                                    <option key={i} value={v}>{v}</option>
                                 ))
                             }
                        </select>
                    </li>
                </ul>
            </div>
        </div>
   )
}

export default Taskinfo