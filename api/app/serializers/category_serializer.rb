# frozen_string_literal: true

# Category Serializer
class CategorySerializer < Blueprinter::Base
  identifier :id

  fields :name
end
