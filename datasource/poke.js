const { RESTDataSource } = require('apollo-datasource-rest')

class PokeAPI extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = 'https://pokeapi.co/api/v2/'
  }

  pokemonReducer (pokemon, pokemonSpecies, pokemonEvolution) {
    return {
      id: pokemon.id || 0,
      name: pokemon.name,
      desc: this.getDescription(pokemonSpecies.flavor_text_entries),
      pic: pokemon.sprites.front_default, // image URL of the front facing Pokemon
      types: this.getTypes(pokemon.types),
      height: pokemon.height,
      weight: pokemon.weight,
      evolution: this.getEvolution(pokemonEvolution.chain, pokemon.name) || {}
    }
  }

  getDescription (entries) {
    return entries.find(item => item.language.name === 'en').flavor_text
  }

  getTypes (types) {
    return types.map(({ slot, type }) => {
      return {
        'id': slot, // the type's index
        'name': type.name // the type's name (e.g. electric, leaf)
      }
    })
  }

  getEvolution (evolves, name) {
    return Object.keys(evolves.evolves_to).map(function (key) {
        console.log(evolves.evolves_to[key].evolves_to[0].species.name)
      return {
        'id': evolves.evolves_to[key],
        'name': name === evolves.evolves_to[key].species.name
          ? evolves.evolves_to[key].evolves_to[0].species.name
          : evolves.evolves_to[key].species.name,
        'url': evolves.evolves_to[key].species.url
      }
    })
  }

  async getPokemonById ({ id }) {
    const pokemonResponse = await this.get(`pokemon/${id}`)
    const pokemonSpeciesResponse = await this.get(`pokemon-species/${id}`)
    const pokemonEvolutionResponse = await this.get(pokemonSpeciesResponse.evolution_chain.url)

    return this.pokemonReducer(
      pokemonResponse,
      pokemonSpeciesResponse,
      pokemonEvolutionResponse
    )
  }
}

module.exports = PokeAPI
