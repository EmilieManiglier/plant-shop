# frozen_string_literal: true

require 'rails_helper'
require 'swagger_helper'

describe 'API Users', type: :request do
  path '/api/v1/users/account_update' do
    put 'update user informations' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: { '$ref' => '#/components/schemas/user' }

      response(200, 'update successful') do
        let(:id) { user.id }
        let(:user_params) do
          {
            user: {
              firstname: 'John',
              lastname: 'Doe',
              phone_number: '0614132768',
              current_password: 'password',
              password: 'password',
              password_confirmation: 'password'
            }
          }
        end
        run_test!
      end
    end
  end

  path '/api/v1/users/sign_up' do
    post 'register new account' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: { '$ref' => '#/components/schemas/new_user' }

      response(201, 'created') do
        let(:user) do
          {
            user: {
              firstname: 'John',
              lastname: 'Doe',
              email: 'new-user-1@test.fr',
              phone_number: '0614132768',
              password: 'password'
            }
          }
        end
        run_test!
      end
    end
  end
end
