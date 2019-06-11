class PokemonsController < ApplicationController
    def index
        pokemons=Pokemon.all 
        render json: PokemonSerializer.new(pokemons)
    end

    def show
        pokemon=Pokemon.find(params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def destroy
        pokemon=Pokemon.find(params[:id])
        pokemon.destroy
    end

    def create
        pokemon=Pokemon.create( species:Faker::Games::Pokemon.name, 
                nickname:Faker::Name.first_name,
                trainer_id:params[:pokemon][:trainer_id] )
# Need to sort out how to return the data 
        render json: pokemon
    end
end
