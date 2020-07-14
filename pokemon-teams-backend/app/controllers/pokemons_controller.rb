class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    if trainer.pokemons.count >= 6
      render json: { error: 'You have too many Pokemons...' }, status: 400
    else
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainer_id])

       if pokemon.save
        render json: pokemon
      else
        render json: { error: 'Cannot create pokemon.' }, status: 400
      end
    end
  end

   def destroy
    pokemon = Pokemon.find_by(id: params[:id])

     if pokemon
      pokemon.destroy
      render json: pokemon, except: [:created_at, :updated_at]
    else
      render json: { error: "Cannot delete pokemon. [id: #{params[:id]}]" }, status: 400
    end

   end

 end