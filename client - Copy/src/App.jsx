import React from 'react'
import {Routes,Route} from 'react-router-dom'
import {ApolloClient,InMemoryCache,HttpLink } from '@apollo/client'
import { ApolloProvider } from "@apollo/client/react";
import Navbar from './component/Navbar'
import Users from './pages/Users'
import Adduser from './pages/adduser';
import Viewuser from './pages/Viewuser';
import Edituser from './pages/Edituser';
import Addtask from './pages/Addtask';
import Tasks from './pages/Tasks';
import Viewtask from './pages/Viewtask';
import Edittask from './pages/Edittask';

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8000/graphql",
  }),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Users />}/>
        <Route path='/adduser' element={<Adduser />}/>
        <Route path='/viewuser/:id' element={<Viewuser />}/>
        <Route path='/edituser/:id' element={<Edituser/>}/>
        <Route path='/addtask' element={<Addtask/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
        <Route path='/viewtask/:id' element={<Viewtask/>}/>
        <Route path='/edittask/:id' element={<Edittask/>}/>

      </Routes>
    </ApolloProvider>
  )
}

export default App

