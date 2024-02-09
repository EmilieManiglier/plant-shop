# frozen_string_literal: true

# ProductSerializer
class ProductSerializer < Blueprinter::Base
  identifier :id

  association :categories, blueprint: CategorySerializer

  fields :name, :description, :price, :stock

  field :image do |product|
    Rails.application.routes.url_helpers.url_for(product.image)
  end
end
