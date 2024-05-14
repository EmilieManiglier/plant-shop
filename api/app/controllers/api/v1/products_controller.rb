# frozen_string_literal: true

module Api
  module V1
    # ProductsController
    class ProductsController < ApplicationController
      before_action :authenticate_user!

      # TODO : Refacto current_user scope for each method
      def index
        render json: ProductSerializer.render(Product.all, scope: { current_user: current_user })
      end

      def show
        product = Product.find(params[:id])
        render json: ProductSerializer.render(product, scope: { current_user: current_user })
      end

      def create
        product = Product.new(permitted_params)

        if product.save
          render json: ProductSerializer.render(product, scope: { current_user: current_user }), status: :created
        else
          render json: product.errors, status: :unprocessable_entity
        end
      end

      private

      def permitted_params
        params.require(:product).permit(:name, :description, :price, :stock, :image)
      end
    end
  end
end
