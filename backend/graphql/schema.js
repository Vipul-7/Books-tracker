const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Book {
        id : ID!
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

    input BookInput {
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

    type RootMutation {
        addToFavorite(bookData: BookInput! ): Boolean!
    }

    type RootQuery {
        favoriteBooks: [Book!]!
    }

    schema {
        mutation: RootMutation
        query: RootQuery
    }
`);
