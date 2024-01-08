# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  if Rails.env.development?
    mount Rswag::Api::Engine => '/api-docs'
    mount Rswag::Ui::Engine => '/api-docs'
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :products
    end
  end
end
