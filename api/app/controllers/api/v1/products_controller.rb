# frozen_string_literal: true

module Api
  module V1
    # ProductsController
    class ProductsController < ApiBaseController
      def index
        render json: json_response(Product.all, 'index')
      end

      def show
        product = Product.find(params[:id])
        render json: json_response(product)
      end

      def create
        product = Product.new(permitted_params)

        if product.save
          render json: json_response(product), status: :created
        else
          render json: product.errors, status: :unprocessable_entity
        end
      end

      def update
        product = Product.find(params[:id])

        if product.update(permitted_params)
          render json: json_response(product)
        else
          render json: product.errors, status: :unprocessable_entity
        end
      end

      def destroy
        product = Product.find(params[:id])
        render status: :no_content if product.destroy
      end

      private

      def permitted_params
        params.require(:product).permit(:name, :description, :price, :stock, :image)
      end

      def json_response(record, view = 'base_view')
        ProductSerializer.render(record, current_user:, view: view.to_sym)
      end
    end
  end
end
