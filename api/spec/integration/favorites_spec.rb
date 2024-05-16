# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'API Favorites', type: :request do
	path '/api/v1/favorites' do
		get 'user favorites list' do
			tags 'Favorites'
			response(200, 'successful') do
				run_test!
			end
		end

		post 'create favorite' do
			tags 'Favorites'
			consumes 'application/json'
			parameter name: :product_id, in: :body, required: true, schema: {
				type: :object,
				properties: {
					product_id: { type: :integer }
				}
			}

			response(201, 'successful') do
				run_test!
			end
		end
	end

	path '/api/v1/favorites/{id}' do
		delete 'delete favorite' do
			tags 'Favorites'
			let(:favorite) { create(:favorite) }
			let(:id) { favorite.id }
			parameter name: 'id', in: :path, type: :string, description: 'id'

			response(204, 'no content') do
				run_test!
			end
		end
	end
end
