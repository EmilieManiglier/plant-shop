# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'api/v1/products', type: :request do
  let(:product) { create(:product) }

  after do |example|
    if response.body.present?
      example.metadata[:response][:content] = {
        'application/json' => {
          example: JSON.parse(response.body, symbolize_names: true)
        }
      }
    end
  end

  path '/api/v1/products' do
    get('list products') do
      tags 'Products'
      response(200, 'successful') do
        run_test!
      end
    end

    post('create product') do
      tags 'Products'
      consumes 'application/json'
      parameter name: :product_params, in: :body, required: true, schema: { '$ref' => '#/components/schemas/product' }

      response(201, 'successful') do
        run_test!
      end
    end
  end

  path '/api/v1/products/{id}' do
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('show product') do
      tags 'Products'
      response(200, 'successful') do
        run_test!
      end
    end

    put('update product') do
      tags 'Products'
      consumes 'application/json'
      parameter name: :product_params, in: :body, required: true, schema: { '$ref' => '#/components/schemas/product' }

      response(200, 'successful') do
        run_test!
      end
    end

    delete('delete product') do
      tags 'Products'
      response(200, 'successful') do
        run_test!
      end
    end
  end
end
