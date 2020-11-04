class PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    render json: pokemons,
    except: [:updated_at, :created_at],
    include: [
      {
        :trainer => {
          except: [:updated_at, :created_at, :id]
        }
      }
    ]
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    if pokemon
      render json: pokemon,
      except: [:updated_at, :created_at],
      include: [
        {
          :trainer => {
            except: [:updated_at, :created_at, :id]
          }
        }
      ]
    else
      render json: { message: "Pokemon Not Found"}
    end
  end

  def new
    pokemon = Pokemon.new
  end

  def create
    pokemon = Pokemon.new(params[:id, :species, :nickname, :trainer_id])
  end


  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    render json: {message: "Pokemon Successfully Deleted"}
  end
end
