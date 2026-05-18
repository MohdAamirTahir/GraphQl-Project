const User = require("../models/User");
const Task = require("../models/Tasks");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
} = require("graphql");

const TaskSchema = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserSchema,
      resolve(parent, args) {
        return User.findById(parent.user);
      },
    },
  }),
});
const UserSchema = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

//query ingraphql
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //get All Tasks
    tasks: {
      type: new GraphQLList(TaskSchema),
      resolve(parent, args) {
        return Task.find();
      },
    },
    //get Single Task
    task: {
      type: TaskSchema,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Task.findById(args.id);
      },
    },
    //get All Users
    users: {
      type: new GraphQLList(UserSchema),
      resolve(parent, args) {
        return User.find();
      },
    },
    user: {
      type: UserSchema,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
  },
});

// mutation in graphql
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserSchema,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
        });
        return user.save();
      },
    },
    updateuser: {
      type: UserSchema,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString},
        email: { type:GraphQLString},
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
            },
          },
          {
            new: true,
          },
        );
      },
    },
    deleteuser:{
        type:UserSchema,
        args:{
            id:{type:GraphQLNonNull(GraphQLID)}
        },
        resolve(parent,args){
            Task.find({user:args.id}).then((task)=>{
              task.forEach(data=>{data.deleteOne();})
            })
            return User.findByIdAndDelete(args.id);
        }
    },
    addTask:{
        type:TaskSchema,
        args:{
        title:{type: GraphQLNonNull(GraphQLString)},
        description:{type: GraphQLNonNull(GraphQLString)},
        user:{type: GraphQLNonNull(GraphQLID)},
        },
        resolve(parent,args){
            const task = new Task({
                title:args.title,
                description:args.description,
                user:args.user
            })
            return task.save();
        }
    },
    updateTask:{
    type:TaskSchema,
    args:{
      id: { type: GraphQLNonNull(GraphQLID) },
      title: { type: GraphQLString },
      description:{ type:GraphQLString },
    },
    resolve(parent,args){
     return Task.findByIdAndUpdate(args.id,{
      $set:{
        title:args.title,
        description:args.description
      }
     },{new:true})
    }
    },

    deleteTask:{
      type:TaskSchema,
      args:{
        id:{type:GraphQLNonNull(GraphQLID)}
      },
      resolve(parent,args){
            return Task.findByIdAndDelete(args.id)
      }
    }
    
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
