class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
      render json: trainers,
      except: [:updated_at, :created_at],
      include: [
      {
        :pokemons => {
          except: [:updated_at, :created_at]
        }
      }
    ]
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    if trainer
      render json: trainer,
      except: [:updated_at, :created_at],
      include: [
        {
          :pokemons => {
            except: [:updated_at, :created_at]
          }
        }
      ]
    else
      render json: {message: "Trainer Not Found"}
    end
  end
end
