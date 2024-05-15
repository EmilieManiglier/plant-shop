# frozen_string_literal: true

# ProductSerializer
class ProductSerializer < Blueprinter::Base
  identifier :id

  view :base_view do
    association :categories, blueprint: CategorySerializer

    fields :name, :description, :price, :stock

    field :image do |product|
      Rails.application.routes.url_helpers.url_for(product.image) if product.image.attached?
    end
  end

  view :index do
    include_view :base_view

    field(:favorite_id) do |product, options|
      favorite = product.favorites.find_by(user_id: options[:current_user].id)
      favorite&.id
    end
  end
end
