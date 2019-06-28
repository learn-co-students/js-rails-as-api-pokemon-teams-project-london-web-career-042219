const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


// const renderPokemon = ({id, species, nickname}) =>{
// const div = document.createElement("div");
// div.class = "card";
// div["data-id"] = pokemon.id
// document.getElementById("pokemon-collection").appendChild(div);
// const button = document.createElement("button");
// button["data-trainer-id"] = pokemon
// }




document.addEventListener("DOMContentLoaded", () => {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(({data: trainersArr}) => {

    trainersArr.forEach(({attributes: {name, pokemons}, id}) => {
      const div = document.createElement("div");
      const collectionDiv = document.getElementById("pokemon-collection")
      collectionDiv.appendChild(div);
      div.class = "card";
      div["data-id"] = id;
      const p = document.createElement("p");
      p.innerText = name;
      div.appendChild(p);
      const button = document.createElement("button");
      button["data-trainer-id"] = id;
      button.innerText = "Add Pokemon";
      button.class = "add"
      div.appendChild(button);
      const ul = document.createElement("ul");
      div.appendChild(ul);
      pokemons.forEach(pokemon => {
        li = document.createElement("li");
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        const releaseButton = document.createElement("button");
        li.append(releaseButton);
        releaseButton.class = "release";
        releaseButton.innerText = "Release"
        releaseButton["data-pokemon-id"] = pokemon.id;
        ul.appendChild(li)
      })
    })

    document.addEventListener("click", ({target}) => {
      target.class === "release" && fetch(POKEMONS_URL + "/" + target["data-pokemon-id"], {method: "DELETE"})
      .then(resp => resp.json())
      .then(({text}) => {
        console.log(text);
        target.parentElement.remove();
      })
      target.class === "add" && fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({trainer_id: target["data-trainer-id"]})
      })
      .then(resp => resp.json())
      .then(pokemon => {
        li = document.createElement("li");
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        const releaseButton = document.createElement("button");
        li.append(releaseButton);
        releaseButton.class = "release";
        releaseButton.innerText = "Release"
        releaseButton["data-pokemon-id"] = pokemon.id;
        target.parentElement.querySelector("ul").appendChild(li)
      })
    })
  })

})
