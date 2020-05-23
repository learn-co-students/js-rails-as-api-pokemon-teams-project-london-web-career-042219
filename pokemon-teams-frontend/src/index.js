const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const TRAINER_NODE = document.querySelector( "main") // Where we will add our trainers, when we manipulate the DOM

function getTrainerData() {
    fetch( TRAINERS_URL )
        .then( function(response) {
            return response.json();
        })
        .then( displayTrainers );
//    .catch( displayFetchError ) DO THS LATER
}

function displayTrainers( trainers ) {

    trainers.forEach (function(trainer) {
        renderTrainer(trainer)
    });

}

function renderTrainer(trainerObj ) {
    trainerDiv=document.createElement("DIV")
    trainerDiv.setAttribute("class","card")
    trainerDiv.setAttribute("data-id", trainerObj["id"] )

    trainerDiv.innerHTML=`<p>${trainerObj["name"]}</p><button id=addPokemonBtn"${trainerObj["id"]} data-trainer-id="${trainerObj["id"]}">Add Pokemon</button>`
    TRAINER_NODE.appendChild(trainerDiv)


    // Now display the pokemon for this trainer
    let pokemonNode=document.createElement('UL')
    trainerDiv.appendChild(pokemonNode)
    trainerObj.pokemons.forEach (function(pokemon) {
         renderPokemon( pokemonNode, pokemon)
    });

    // Now add the event listener for the Add Pokemon button
    addPokemonId=document.getElementById(`addPokemonBtn"${trainerObj["id"]}`)
    addPokemonId.addEventListener("click", event => addPokemon(event, trainerObj.id, pokemonNode ) )

}


function renderPokemon( pokemonNode, pokemonObj ) {

    thisNode=document.createElement('LI')
    thisNode.innerHTML=`${pokemonObj.nickname} (${pokemonObj.species}) <button class="release" id=releasePokemonBtn${pokemonObj.id} data-pokemon-id=${pokemonObj.id}>Release</button>`
    pokemonNode.appendChild(thisNode)
    // Add the event listener to release the Pokemon
    let releasePokemonId=document.getElementById(`releasePokemonBtn${pokemonObj.id}`);
    releasePokemonId.addEventListener("click", (event) => releasePokemon( event, pokemonObj) );
}


function addPokemon( event, trainerId, pokemonNode ) {

    console.log(`Go add a pokemon to ${trainerId}`)
    console.log(pokemonNode) 
    // Work to complete
    // So, to add a pokemon, I need to generate a pokemon hash, with the trainer_id
    // then push it into a FETCH with a POST method
    // the create path in the pokemon controller will create the new pokemon
    // take, the returned value which will include the fakr generateed details and ID
    // then render the pokemon
    // using an existing function
    let pokemonObj = { trainer_id:trainerId };
 
    let configObj = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(pokemonObj)
        };

    fetch( `${POKEMONS_URL}`, configObj )
            .then( data => data.json() )
            .then( data => renderPokemon( pokemonNode, data ))
            .catch( error => console.log );

}

function releasePokemon( event, pokemonObj ) {    
    // Now need to delete from the database
    // Just delete the pokemon

        fetch( `${POKEMONS_URL}/${pokemonObj.id}`, {method:"DELETE"} )
        .then( () => { event.target.parentNode.parentElement.removeChild(event.target.parentNode) } )
        .catch( error => console.log );

} 

// Using document.body.onload means this will only run when the DOM is loaded.
document.body.onload = getTrainerData()