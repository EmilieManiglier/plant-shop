# frozen_string_literal: true

module Api
  module V1
    # FavoritesController
    class FavoritesController < ApiBaseController
      def index
        render json: FavoriteSerializer.render(current_user.favorites)
      end

      def create
        favorite = Favorite.new(favorite_params.merge(user_id: current_user.id))

        if favorite.save
          render json: FavoriteSerializer.render(favorite), status: :created
        else
          render json: favorite.errors, status: :unprocessable_entity
        end
      end

      def destroy
        favorite = current_user.favorites.find(params[:id])
        render status: :no_content if favorite.destroy
      end

      private

      def favorite_params
        params.require(:favorite).permit(:product_id)
      end
    end
  end
end
