# frozen_string_literal: true

require 'rails_helper'
require 'swagger_helper'

describe 'API Users', type: :request do
  path '/api/v1/users/sign_in' do
    let(:existing_user) { create(:user) }

    post 'log in' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          user: {
            type: :object,
            properties: {
              email: { type: :string },
              password: { type: :string }
            },
            required: [:email, :password]
          }
        }
      }

      response(201, 'successful') do
        let(:user) { { user: { email: existing_user.email, password: existing_user.password } } }
        run_test!
      end
    end
  end

  path '/api/v1/users/sign_out' do
    let(:existing_user) { create(:user) }
    before { sign_in(existing_user) }

    delete 'log out' do
      tags 'Users'

      response(204, 'no content') do
        run_test!
      end
    end
  end
end
