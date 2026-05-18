import React from 'react'
import { useQuery } from "@apollo/client/react";
import { Get_Users } from '../Queries/query'
import UserInfo from './Userinfo'


const Users = () => {
    const { data, loading, error } = useQuery(Get_Users)
    return (
        <div>
            <div className='bg-white m-20 p-5 rounded'>
                <ul className='flex text-black font-bold text-lg mb-5'>
                    <li className='ml-4'>Name</li>
                    <li className='ml-20'>Email</li>
                    <li className='ml-20'>Action</li>
                </ul>
                {
                   !loading && !error && data.users.map((user) => (
                        <UserInfo key={user.id} user={user} />
                    ))
                }

            </div>
        </div>
    )
}
export default Users