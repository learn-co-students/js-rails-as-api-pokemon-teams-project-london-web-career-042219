const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainEl = document.querySelector('main');


const handleErrors = (response) => {
 if (!response.ok) {
   throw Error(response.statusText);
 }
 return response;
};

const createPokemon = (trainer_id) => {
 const options = {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     trainer_id,
   }),
 };

  return fetch(POKEMONS_URL, options)
   .then(handleErrors)
   .then(resp => resp.json())
   .catch(err => console.error(err));
};

const removePokemon = (pokemon) => {
 const ul = document.querySelector(`.card[data-id="${pokemon.trainer_id}"] ul`);
 const li = ul.querySelector(`li[data-pokemon-id="${pokemon.id}"`);
 ul.removeChild(li);
};

const destroyPokemon = (id) => {
 const options = {
   method: 'DELETE',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({}),
 };

  return fetch(`${POKEMONS_URL}/${id}`, options)
   .then(handleErrors)
   .then(resp => resp.json())
   .then(removePokemon)
   .catch(err => console.error(err));
};

const createPokemonLi = (pokemon) => {
 const li = document.createElement('li');
 li.setAttribute('data-pokemon-id', pokemon.id);
 li.innerHTML = `
   ${pokemon.nickname} (${pokemon.species})
   <button class="release" data-pokemon-id="${pokemon.id}">
     Release
   </button>
 `;

  const releaseBtn = li.querySelector('.release');
 releaseBtn.addEventListener('click', (event) => {
   event.preventDefault();
   destroyPokemon(pokemon.id);
 });
 return li;
};

const addPokemon = (trainer_id) => {
 createPokemon(trainer_id)
   .then((pokemon) => {
     if (pokemon) {
       const li = createPokemonLi(pokemon);
       const card = document.querySelector(`.card[data-id="${pokemon.trainer_id}"]`);
       card.querySelector('ul').appendChild(li);
     }
   });
};

const fetchTrainers = () => fetch(TRAINERS_URL)
 .then(handleErrors)
 .then(resp => resp.json())
 .catch(err => console.error(err));


const createPokemonsList = (pokemons) => {
 const ul = document.createElement('ul');
 pokemons.forEach((pokemon) => {
   const li = createPokemonLi(pokemon);
   ul.appendChild(li);
 });
 return ul;
};

const createTrainerCard = (trainer) => {
 const card = document.createElement('div');
 card.className = 'card';
 card.setAttribute('data-id', trainer.id);
 card.innerHTML = `
   <p>${trainer.name}</p>
   <button data-trainer-id="${trainer.id}">Add pokemon</button>
 `;
 const pokemonList = createPokemonsList(trainer.pokemons);

  const addBtn = card.querySelector('button');
 addBtn.addEventListener('click', (e) => {
   e.preventDefault();
   addPokemon(trainer.id);
 });

  card.appendChild(pokemonList);
 return card;
};

const addTrainers = (trainers) => {
 trainers.forEach((trainer) => {
   const card = createTrainerCard(trainer);
   mainEl.appendChild(card);
 });
};

document.addEventListener('DOMContentLoaded', () => {
 fetchTrainers()
   .then((trainers) => {
     if (trainers) {
       addTrainers(trainers);
     }
   });
});