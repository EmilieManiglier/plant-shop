# frozen_string_literal: true

# ProductSerializer
class ProductSerializer < Blueprinter::Base
  identifier :id

  fields :name, :description, :price, :stock

  association :categories, blueprint: CategorySerializer
end
