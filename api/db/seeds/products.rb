# frozen_string_literal: true

10.times do
  Product.create!(
    name: Faker::Commerce.product_name,
    description: Faker::Lorem.unique.paragraph,
    price: Faker::Number.decimal(l_digits: 2),
    stock: Faker::Number.number(digits: 2)
  )
end
