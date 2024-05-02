# frozen_string_literal: true

# ProductSerializer
class ProductSerializer < Blueprinter::Base
  identifier :id

  association :categories, blueprint: CategorySerializer

  fields :name, :description, :price, :stock

  field :image do |product|
    Rails.application.routes.url_helpers.url_for(product.image) if product.image.attached?
  end

  field(:favorite_id) do |product, options|
    favorite = Favorite.find_by(user_id: options[:scope][:current_user].id, product_id: product.id)
    favorite.id if favorite
  end
end
