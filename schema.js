const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    pokemon(id: ID!): Pokemon
  }

  type Pokemon {
    id: ID!
    name: String
    desc: String
    pic: String
    types: [PokemonType!]!
    height: Int
    weight: Int
    evolution: [PokemonSpecies]
  }

  type PokemonType {
    id: Int!
    name: String!
  }

  type PokemonSpecies {
    id: String
    name: String
    url: String
  }
`

module.exports = typeDefs
