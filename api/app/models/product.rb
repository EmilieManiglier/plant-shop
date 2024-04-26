# frozen_string_literal: true

# Product
class Product < ApplicationRecord
  has_many :product_categories
  has_many :categories, through: :product_categories
  has_many :favorites, dependent: :destroy

  has_one_attached :image

  validates :image, blob: { content_type: ['image/png', 'image/jpg', 'image/jpeg'], size_range: 1..2.megabytes }
end
