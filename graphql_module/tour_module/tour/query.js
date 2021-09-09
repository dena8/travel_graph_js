const { gql } = require("graphql-modules");

module.exports = gql`
    type Tour{
        id: ID!
        name: String!
        description: String!
        region: String!
        participants: Int!
        difficultyLevel: Int!
        image: String!
        price: Float!
        enabled: Boolean
        startDate: Date!
        createdAt: Date
        updatedAt: Date
        category:Category
        creator:User

    }

    input CreateTourInputType{
        name: String!
        description: String!
        category:String!
        region: String!
        participants: Int!
        difficultyLevel: String!
        image: String!
        price: Float!
        startDate: String!
         
    }

    input DeleteTourInputType{
        id:String!
    }

    extend type Mutation {
        addTour(tourInput: CreateTourInputType):Tour
        deleteTour(id:String):Boolean
    }

    extend type Query{
        tours:[Tour]
        tour(id:String):Tour
    }




`