# frozen_string_literal: true

# Product
class Product < ApplicationRecord
  belongs_to :category, optional: true
end
