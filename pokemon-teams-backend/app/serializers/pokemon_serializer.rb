class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :species, :nickname, :id
end
