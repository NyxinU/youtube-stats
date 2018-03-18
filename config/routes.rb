Rails.application.routes.draw do
  get 'messages/index'

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  resources :sessions, only: [:create, :destroy]
  defaults format: :json do 
    resources :messages, only: [:index, :create, :show]
  end 
  get '/video/:id', to: 'videos#show', as: 'video'
  root to: 'home#show'
end
