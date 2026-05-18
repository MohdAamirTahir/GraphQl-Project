import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_USER } from "../Mutations/Mutations";
import { useNavigate } from "react-router-dom";
import { Get_Users } from "../Queries/query";


const Adduser = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
   const navigate = useNavigate();
  const [addUser] = useMutation(ADD_USER, {
  refetchQueries: [{ query: Get_Users }],
});
const onSubmit = async (e) => {
  e.preventDefault();
  try {
    await addUser({
      variables: { name, email, password },
    });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col w-[320px] mt-[50px] rounded-3xl h-[230px] bg-gray-200 items-center justify-center" onSubmit={onSubmit}>
        <input
          onChange={(e)=>setname(e.target.value)}
          type="text"
          placeholder="Enter name"
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400"
        />
        <input
          onChange={(e)=>setemail(e.target.value)}
          type="email"
          placeholder="Enter Email"
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 m-3"
        />
        <input
          onChange={(e)=>setpassword(e.target.value)}
          type="password"
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
  );
};
export default Adduser;
