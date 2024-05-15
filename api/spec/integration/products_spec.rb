# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'API Products', type: :request do
  path '/api/v1/products' do
    get 'list products' do
      tags 'Products'
      response(200, 'successful') do

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    post 'create product' do
      tags 'Products'
      consumes 'application/json'
      parameter name: :product, in: :body, required: true, schema: { '$ref' => '#/components/schemas/product' }

      response(201, 'successful') do
        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end

  path '/api/v1/products/{id}' do
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get 'show product' do
      tags 'Products'
      response(200, 'successful') do
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    put 'update product' do
      tags 'Products'
      consumes 'application/json'
      parameter name: :product, in: :body, required: true, schema: { '$ref' => '#/components/schemas/product' }

      response(200, 'successful') do
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    delete 'delete product' do
      tags 'Products'
      response(204, 'no content') do
        run_test!
      end
    end
  end
end
