const { gql } = require("graphql-modules");

module.exports = gql`
type Category {
    id: ID!
    name: String!
    createdAt: Date
    updatedAt: Date
}

input InputCategoryType{
    name: String!
}

extend type Mutation {
    addCategory(categoryInput: InputCategoryType): Category
  }

  extend type Query{
      categories:[Category]
      category (id:String):Category
  }

`;
