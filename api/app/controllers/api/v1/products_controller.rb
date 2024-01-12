# frozen_string_literal: true

module Api
  module V1
    # ProductsController
    class ProductsController < ApplicationController
      before_action :authenticate_user!

      # GET /products
      def index
        render json: ProductSerializer.render(Product.all)
      end

      # GET /products/1
      def show
        render json: ProductSerializer.render(Product.find(params[:id]))
      end
    end
  end
end
