# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users, skip: :all

  devise_scope :user do
    scope '/api/v1/users', defaults: { format: :json } do
      post   '/sign_in',       to: 'api/v1/users/sessions#create'
      delete '/sign_out',      to: 'api/v1/users/sessions#destroy'
      post   '/sign_up',       to: 'api/v1/users/registrations#create'
      put    '/account_update', to: 'api/v1/users/registrations#update'
    end
  end

  if Rails.env.development?
    mount Rswag::Api::Engine => '/api-docs'
    mount Rswag::Ui::Engine => '/api-docs'
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end


  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :products
      resources :favorites, only: %i[index create destroy]
    end
  end
end
