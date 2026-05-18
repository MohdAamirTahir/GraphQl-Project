import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from "@apollo/client/react";
import { EDIT_TASK } from '../Mutations/Mutations';
import { useNavigate, useParams } from 'react-router-dom';
import { ALL_TASK, SINGLE_TASK } from '../Queries/query';

const Edittask = () => {
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [user, setUser] = useState("");
      const navigate = useNavigate()
      const {id} = useParams();
      const {data,loading,error} = useQuery(SINGLE_TASK,{
        variables:{id}
      })
      const[edittask] = useMutation(EDIT_TASK,{
        variables:{id,title,description},
        refetchQueries:[{query:ALL_TASK}]
    })
    
    const setdetails = () =>{
        if(data){
            setTitle(data.task.title)
            setDescription(data.task.description)
            setUser(data.task.user.name)
        }
    }
    const onSubmit = (e)=>{
       e.preventDefault();
       edittask(title,description);
       navigate("/tasks");
    }
    useEffect(()=>{
        setdetails()
    },[data])
  return (
   <div className="flex flex-col items-center">
      <form className="flex flex-col w-[320px] mt-[50px] rounded-3xl h-[230px] bg-gray-200 items-center justify-center" onSubmit={onSubmit}>
        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          type="text"
          placeholder="Enter Title"
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400"
        />
        <input
        value={description}
          onChange={(e)=>setDescription(e.target.value)}
          type="text"
          placeholder="Enter Description"
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 m-3"
        />
        <input
          value={user}
          type="text"
          disabled
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 m-3"
        />
        <button
          type="submit"
          className="w-[300px] bg-slate-900 text-white rounded-md mt-3 font-bold text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Edittask
