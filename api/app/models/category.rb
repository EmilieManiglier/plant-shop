# frozen_string_literal: true

# Category
class Category < ApplicationRecord
  has_many :product_categories
  has_many :products, through: :product_categories
  validates :name, presence: true
end
