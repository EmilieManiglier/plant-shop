# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ProductsController do
  let(:product) { create(:product) }

  describe '#GET /api/v1/products' do
    context 'when user is not authenticated' do
      before { get '/api/v1/products' }

      it_behaves_like 'unauthorized status'
    end

    context 'when user is authenticated' do
      include_context 'with authenticated user'

      before { get '/api/v1/products' }

      it_behaves_like 'successful status'
    end
  end

  describe '#GET /api/v1/products/:id' do
    include_context 'with authenticated user'

    before { get "/api/v1/products/#{product.id}" }

    it_behaves_like 'successful status'
  end

  describe '#POST /api/v1/products' do
    let(:params) do
      {
        name: 'New product name',
        description: 'Product description',
        price: 10.0
      }
    end

    include_context 'with authenticated user'

    before { post '/api/v1/products', params: { product: params } }

    it_behaves_like 'created status'
  end

  describe '#PUT /api/v1/products/:id' do
    let(:params) do
      {
        name: 'Updated product name',
        description: 'Updated product description',
        price: 20.0
      }
    end

    include_context 'with authenticated user'

    before { put "/api/v1/products/#{product.id}", params: { product: params } }

    it_behaves_like 'successful status'

    it 'updates product information' do
      product.reload

      expect(product.name).to eq(params[:name])
      expect(product.description).to eq(params[:description])
      expect(product.price).to eq(params[:price])
    end
  end

  describe '#DELETE /api/v1/products/:id' do
    include_context 'with authenticated user'

    before { delete "/api/v1/products/#{product.id}" }

    it_behaves_like 'no_content status'
  end
end
