const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainElement = document.querySelector("main");

function getTrainers() {
	fetch(TRAINERS_URL)
		.then(response => response.json())
		.then(json => renderTrainers(json));
}

function renderTrainers(json) {
	mainElement.innerHTML = "";
	json.forEach((trainer) => {
		const card = document.createElement("div");
		card.classList.add("card");
		card.dataset.id = trainer.id;
		
		const nameParagraph = document.createElement("p")
		nameParagraph.innerHTML = trainer.name;
		card.appendChild(nameParagraph);

		const list = document.createElement("ul")
		card.appendChild(list);

		trainer.pokemons.forEach((pokemon) => {
			const pokemonElement = document.createElement("li");
			pokemonElement.innerText = pokemon.nickname;

			const releaseButton = document.createElement("button");
			releaseButton.addEventListener("click", (e) => releasePokemon(e.target.dataset.id));
			releaseButton.classList.add("release");
			releaseButton.dataset["id"] = pokemon.id;
			releaseButton.innerText = "Release";
			pokemonElement.appendChild(releaseButton);
			card.appendChild(pokemonElement);
		});

		mainElement.appendChild(card);
	});
}

function releasePokemon(id) {
	fetch(`${POKEMONS_URL}/${id}`, {
		method: 'DELETE'
	})
		.then(() => getTrainers());
}

getTrainers();
