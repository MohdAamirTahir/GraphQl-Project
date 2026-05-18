import React, { useState } from "react";
import { ADD_TASK } from "../Mutations/Mutations";
import { ALL_TASK, Get_Users } from "../Queries/query.jsx";
import { useMutation, useQuery } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";

const Addtask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("");
  const { data, loading, error } = useQuery(Get_Users);
  const usenavigate = useNavigate()
  const [addtask] = useMutation(ADD_TASK, {
    variables: { title, description, user },
    refetchQueries:[{query:ALL_TASK}]
  });

  const onSubmit = (e) => {
     e.preventDefault();
      if (!title || !description || !user) {
        alert("Please fill all fields");
        return;
      }
     addtask(title,description,user)
     setTitle("")
     setDescription("")
     setUser("")
     usenavigate('/tasks')
  };
  return (
    <div className="flex flex-col items-center">
      {!loading && !error && (
        <form
          className="flex flex-col w-[320px] mt-[50px] rounded-3xl h-[230px] bg-gray-200 items-center justify-center"
          onSubmit={onSubmit}
        >
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Title"
            className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400"
          />
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Enter Description"
            className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 m-3"
          />
          <select
            className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400"
            value={user}
            onChange={(e)=>setUser(e.target.value)}
          >
            <option value="">Select Option</option>
            {data.users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
           <button
          type="submit"
          className="w-[300px] bg-slate-900 text-white rounded-md mt-3 font-bold text-lg"
        >
          Submit
        </button>
        </form>
      )}
    </div>
  );
};

export default Addtask;
