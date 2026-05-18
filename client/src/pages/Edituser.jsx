import { useQuery } from '@apollo/client/react'
import { useMutation } from "@apollo/client/react";
import React,{useState,useEffect} from 'react'
import { Get_Users, SINGLE_USER } from '../Queries/query'
import { useParams } from 'react-router-dom'
import { EDIT_USER } from '../Mutations/Mutations';
import { useNavigate } from "react-router-dom";


const Edituser = () => {
    const { id } = useParams(); 
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(SINGLE_USER, {
    variables: { id }
    });

    const[edituser] = useMutation(EDIT_USER,{
        variables:{id,name,email},
        refetchQueries:[{query:Get_Users}]
    })
    const setdetails = () =>{
        if(data){
            setname(data.user.name)
            setemail(data.user.email)
            setpassword(data.user.password)
        }
    }
    const onSubmit = (e)=>{
       e.preventDefault();
       edituser(name,email);
       navigate("/");
    }
    useEffect(()=>{
        setdetails()
    },[data])
  return (
  <div className="flex flex-col items-center">
      <form className="flex flex-col w-[320px] mt-[50px] rounded-3xl h-[230px] bg-gray-200 items-center justify-center" onSubmit={onSubmit}>
        <input
          onChange={(e)=>setname(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter name"
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400"
        />
        <input
          onChange={(e)=>setemail(e.target.value)}
          value={email}
          type="email"
          placeholder="Enter Email"
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 m-3"
        />
        <input
          value={password}
          disabled
          type="text"
          placeholder="Enter Password"
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400"
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

export default Edituser
