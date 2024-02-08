# frozen_string_literal: true

# Product
class Product < ApplicationRecord
  has_many :product_categories
  has_many :categories, through: :product_categories
  has_many :favorites, dependent: :destroy
end
