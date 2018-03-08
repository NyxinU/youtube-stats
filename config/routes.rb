Rails.application.routes.draw do
  get 'videos/index'

  get 'videos/show'

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  resources :sessions, only: [:create, :destroy]
  resource :home, only: [:show]
  resources :videos, only: [:index, :show]

  root to: "home#show"
end
