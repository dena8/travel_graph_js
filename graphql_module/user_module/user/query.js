const { gql } = require("graphql-modules");



module.exports = gql`
scalar Date

type User {
      id: ID!
      username: String!
      password: String! 
      email: String
      authority: Authority,     
      createdAt: Date ,
      updatedAt: Date
     
} 

input InputUserType{
    username: String!
    password: String! 
    email: String!
}

type Query{
    users:[User]!
    user(id:String): User
}

type Mutation{
    addUser(userInput: InputUserType):User
}
   
`;
