class PokemonsController < ApplicationController

  def destroy
    Pokemon.find(params[:id]).update(trainer_id: nil);
  end
end
