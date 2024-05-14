# frozen_string_literal: true

require 'rails_helper'
require 'swagger_helper'

describe 'api/v1/users', type: :request do
  path '/api/v1/users/account_update' do
    put 'update user informations' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          user: {
            type: :object,
            properties: {
              password: { type: :string },
              password_confirmation: { type: :string },
              current_password: { type: :string },
							firstname: { type: :string },
							lastname: { type: :string },
							phone_number: { type: :string },
            }
          }
        }
      }

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
end
