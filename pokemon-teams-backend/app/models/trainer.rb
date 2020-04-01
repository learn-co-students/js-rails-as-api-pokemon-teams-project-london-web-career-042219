class Trainer < ApplicationRecord
  has_many :pokemons

  def pokemonsArr
    self.pokemons
  end
end
