# frozen_string_literal: true

# FavoriteSerializer
class FavoriteSerializer < Blueprinter::Base
  identifier :id

  association :product, blueprint: ProductSerializer
end
