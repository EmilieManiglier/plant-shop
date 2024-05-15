# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'api/v1/favorites', type: :request do
	path '/api/v1/favorites' do
		get('list favorites') do
			tags 'Favorites'
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

		post('create favorite') do
			tags 'Favorites'
			consumes 'application/json'
			parameter name: :product_id, in: :body, required: true, schema: {
				type: :object,
				properties: {
					product_id: { type: :integer }
				}
			}

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
	end

	path '/api/v1/favorites/{id}' do
		delete('delete favorite') do
			tags 'Favorites'
			parameter name: 'id', in: :path, type: :string, description: 'id'

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
	end
end
