const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const PokeAPI = require('./datasource/poke')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    pokeAPI: new PokeAPI()
  })
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
