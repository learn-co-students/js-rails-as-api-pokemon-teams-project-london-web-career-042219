const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const trainerCards = document.getElementById("trainer-cards");

function fetchTeamsJson() {
  return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(assignPokemonToTeams);
}

function assignPokemonToTeams(trainersJson) {
  trainersJson.data.forEach(trainer => {
    const teams = [];
    teams.push(parseTeam(trainer, trainersJson.included));
  });
}

function parseTeam(trainer, pokemons) {
  const team = {};
  const relatedPokemon = relatedPokemonIds(trainer.relationships.pokemons.data);

  team["trainer"] = {};
  team["pokemons"] = [];

  team.trainer.name = trainer.attributes.name;
  team.trainer.id = trainer.id;

  team.pokemons.concat(pokemonOnTeam);
}

function relatedPokemonIds(relatedPokemonArr) {
  const temp = [];
  relatedPokemonArr.forEach(pokemon => {
    temp.push(pokemon.id);
  });
  return temp;
}

function pokemonOnTeam(relatedPokemon, pokemons) {
  const pokemonArray = [];
  pokemons.forEach(pokemon => {
    if (relatedPokemon.includes(pokemon.id)) {
      pokemonArray.push({
        id: pokemon.id,
        nickname: pokemon.attributes.nickname,
        species: pokemon.attributes.species
      });
    }
  });
}
