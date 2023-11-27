// const { buildSchema } = require("graphql");

module.exports = `
    type Book {
        id : ID!
        bookId : String!
        image : String!
        title : String!
        author : [String!]!
        description : String
        categories : [String!]!
        language : String!
        pages : Int!
        previewLink :  String!
        readPages : Int!
        textSnippet : String!
    }

    type User{
        id : ID!
        profilePic : String!
        email : String!
        name : String!
        favoriteBooksCount : Int!
        toReadBooksCount : Int!
        haveReadBooksCount : Int!
        currentReadBooksCount : Int!
    }

    input BookInput {
        image : String!
        bookId : String!
        title : String!
        author : [String!]!
        description : String
        categories : [String!]!
        language : String!
        pages : Int!
        previewLink :  String!
        textSnippet : String!
    }

    input FeedbackInput{
        message: String!
        rating: Int!
    }

    type Mutation {
        addToFavorite(bookData: BookInput! ): Boolean!
        removeFromFavorite(id: ID!): Boolean!
        addToToRead(bookData: BookInput! ): Boolean!
        removeFromToRead(id: ID!): Boolean!
        addToHaveRead(bookData: BookInput! ): Boolean!
        removeFromHaveRead(id: ID!): Boolean!
        addToCurrentRead(bookData: BookInput! ): Boolean!
        removeFromCurrentRead(id: ID!): Boolean!
        updateReadPages(id: ID!, readPages: Int!): Boolean!
        createFeedback(feedbackData : FeedbackInput!): Boolean!
    }

    type Query {
        favoriteBooks: [Book!]!
        toReadBooks: [Book!]!
        haveReadBooks: [Book!]!
        currentReadBooks: [Book!]!
        getUser : User!
    }
`;

// module.exports = { typeDefs }
