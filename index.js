const {ApolloServer, gql} = require('apollo-server')
const typeDefs = require('./schema');
const resolvers = require('./resolvers')

let db

const server = new ApolloServer({
    typeDefs, resolvers,
})

server.listen().then(({url}) => {
    console.log(`Server running on ${url}`)
})