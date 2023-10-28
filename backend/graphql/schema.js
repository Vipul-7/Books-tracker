const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type RootMutation {
        
    }
    type RootQuery {
        
    }
    schema {
        mutation : RootMutation
        query : RootQuery
    }
`)