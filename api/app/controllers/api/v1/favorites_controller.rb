# frozen_string_literal: true

module Api
  module V1
    # FavoritesController
    class FavoritesController < ApplicationController
      before_action :authenticate_user!

      def index
        render json: FavoriteSerializer.render(current_user.favorites)
      end

      def create
        favorite = current_user.favorites.build(favorite_params)

        if favorite.save
          render json: FavoriteSerializer.render(favorite)
        else
          render json: favorite.errors, status: :unprocessable_entity
        end
      end

      def destroy
        favorite = current_user.favorites.find(params[:id])
        render json: nil, status: :no_content if favorite.destroy
      end

      private

      def favorite_params
        params.require(:favorite).permit(:product_id)
      end
    end
  end
end
