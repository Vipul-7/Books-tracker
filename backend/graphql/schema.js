const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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
        readPages : Int!
        textSnippet : String!
    }

    type RootMutation {
        addToFavorite(bookData: BookInput! ): Boolean!
        addToToRead(bookData: BookInput! ): Boolean!
        addToHaveRead(bookData: BookInput! ): Boolean!
    }

    type RootQuery {
        favoriteBooks: [Book!]!
        toReadBooks: [Book!]!
        haveReadBooks: [Book!]!
    }

    schema {
        mutation: RootMutation
        query: RootQuery
    }
`);
