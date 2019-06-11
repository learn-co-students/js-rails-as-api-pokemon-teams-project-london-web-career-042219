class TrainersController < ApplicationController

    def index
        trainers=Trainer.all
        render json: trainers, include: [:pokemons]
        #render json: TrainerSerializer.new(trainers)
    end

    def show
        trainer=Trainer.find(params[:id])
        render json: trainer, include: [:pokemons]
        #render json: TrainerSerializer.new(trainer).data
    end


end
