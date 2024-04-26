# frozen_string_literal: true

5.times do
  Category.create!(
    name: Faker::Commerce.unique.department
  )
end

10.times do
  Product.create!(
    name: Faker::Commerce.product_name,
    description: Faker::Lorem.unique.paragraph,
    price: Faker::Number.decimal(l_digits: 2),
    stock: Faker::Number.number(digits: 2)
  )
end

categories_ids = Category.all.ids
products_ids = Product.all.ids

10.times do
  ProductCategory.create!(
    category_id: categories_ids.sample,
    product_id: products_ids.sample
  )
end
