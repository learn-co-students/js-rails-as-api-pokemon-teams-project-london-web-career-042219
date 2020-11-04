document.addEventListener("DOMContentLoaded", function() {
  fetchThenRenderTrainers();
});
////////////////////////
const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers/`;
const POKEMONS_URL = `${BASE_URL}/pokemons/`;
////////////////////////
function fetchTrainerData() {
  return fetch(TRAINERS_URL).then(response => response.json());
}
////////////////////////
function makeTrainerCard(trainer) {
  let div = document.createElement("div");
  div.className = "card";
  div.dataset.id = trainer.id;

  let p = document.createElement("p");
  p.innerText = `${trainer.name}`;
  div.appendChild(p);

  let addButton = document.createElement("button");
  addButton.innerText = "Add Pokemon";
  addButton.className = "addBtn";
  addButton.dataset.id = trainer.id;
  div.appendChild(addButton);

  let ul = document.createElement("ul");
  div.appendChild(ul);

  trainer.pokemons.forEach(function(pokemon) {
    li = document.createElement("li");
    li.innerText = `${pokemon.nickname} (${pokemon.species})`;
    ul.appendChild(li);
    releaseButton = document.createElement("button");
    releaseButton.className = "release";
    releaseButton.innerText = "Release";
    releaseButton.dataset.trainerId = trainer.id;
    releaseButton.dataset.pokemonId = pokemon.id;
    releaseButton.addEventListener("click", event =>
      releasePokemon(event, pokemon)
    );
    li.appendChild(releaseButton);
  });
  return div;
}
////////////////////////
function releasePokemon(e, pokemon) {
  e.target.parentElement.remove();
  removePokemoneFromServeer(pokemon.id);
}
////////////////////////
function removePokemoneFromServeer(id) {
  return fetch(POKEMONS_URL + id, {
    method: "DELETE"
  });
}
////////////////////////
const main = document.querySelector("main");
////////////////////////
function renderTrainers(json) {
  json.forEach(function(trainer) {
    main.appendChild(makeTrainerCard(trainer));
  });
}
////////////////////////
function fetchThenRenderTrainers() {
  fetchTrainerData().then(renderTrainers);
}
////////////////////////
const addBtn = document.querySelector("addBtn");
////////////////////////
addBtn.addEventListener("click", addPokemon);
////////////////////////
function addPokemon(e) {
  e.preventDefault;
}
////////////////////////
function addPokemonToServer(pokemon) {
  return fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pokemon)
  });
}
////////////////////////
