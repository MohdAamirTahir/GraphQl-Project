import { gql } from "@apollo/client";

export const Get_Users = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;
export const SINGLE_USER = gql`
  query singleuser($id:ID!){
    user(id:$id) {
      id
      name
      email
      password
    }
  }
`;

export const ALL_TASK = gql`
   query alltask{
     tasks{
        title
        description
        id
        user{
          id name email
        }  
     }
   }
`;
export const SINGLE_TASK = gql`
  query singletask($id:ID!){
    task(id:$id) {
      id
      title 
      description
      user{
        name 
        email
      }
    }
  }
`;