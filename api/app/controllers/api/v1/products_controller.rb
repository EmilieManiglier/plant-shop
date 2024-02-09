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
        product = Product.find(params[:id])
        render json: ProductSerializer.render(product)
      end

      def create
        product = Product.new(permitted_params)

        if product.save
          render json: ProductSerializer.render(product), status: :created
        else
          render json: product.errors, status: :unprocessable_entity
        end
      end

      private

      def permitted_params
        params.permit(:name, :description, :price, :stock, :image)
      end
    end
  end
end
