# frozen_string_literal: true

products_ids = Product.ids

def check_favorite(user, product)
  Favorite.exists?(user_id: user, product_id: product)
end

15.times do
  user = rand(1..10)
  product = products_ids.sample

  # Create favorite if it doesn't exist
  Favorite.create!(user_id: user, product_id: product) unless check_favorite(user, product)
end
