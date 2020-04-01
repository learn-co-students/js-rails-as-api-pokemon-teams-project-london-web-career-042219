class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    name = pokemon.nickname
    pokemon.delete
    render json: {text: "#{name} was released"}
  end

  def create
    pokemon = Pokemon.create(trainer_id: params["trainer_id"], nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
    render json: pokemon
  end
end
