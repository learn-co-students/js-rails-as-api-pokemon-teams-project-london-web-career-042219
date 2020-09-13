class TrainersController < ApplicationController
  before_action :find_trainer, only: [:show, :edit, :update, :destroy]

  def index
    trainers = Trainer.all
    options = {include: [:pokemons]}
    render json: TrainerSerializer.new(trainers, options)
  end

  def show
    options = {include: [:pokemons]}
    render json: TrainerSerializer.new(@trainer, options)
  end

private

  def find_trainer
      @trainer = Trainer.find(params[:id])
  end
end
