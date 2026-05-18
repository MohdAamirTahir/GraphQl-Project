const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const schema = require('./Schema/schema');
const connectDb = require("./config/dbconn"); 
const cors = require("cors")
const app = express();

app.use(cors());
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

const startServer = async () => {
  try {
    await connectDb();
    app.listen(8000, () => {
      console.log("Server listening on 8000");
    });
  } catch (err) {
    console.log("Server not started due to DB error:", err);
  }
};

startServer();