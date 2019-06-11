Rails.application.routes.draw do
  resources :pokemons, only: [:index, :show, :destroy, :new, :create]
  resources :trainers, only: [:index, :show, :destroy, :new, :create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
