class PokemonsController < ApplicationController


  before_action :find_pokemon, only: [:show, :edit, :update, :destroy]

  def index
    pokemons = Pokemon.all
    options = {include: [:trainer]}
    render json: PokemonSerializer.new(pokemons, options)
  end

  def show
    options = {include: [:trainer]}
    render json: PokemonSerializer.new(@pokemon, options)
  end

private

  def find_pokemon
      @pokemon = Pokemon.find(params[:id])
  end

end
