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
image_dir = Rails.root.join('db', 'seeds', 'images')

# Attach images to products
Product.all.each_with_index do |product, i|
  # increment i by 1 to match the image file name
  i += 1
  image_path = image_dir.join("plant-#{i}.jpg")
  product.image.attach(io: File.open(image_path), filename: "plant-#{i}.jpg", content_type: 'image/jpg')
end

10.times do
  ProductCategory.create!(
    category_id: categories_ids.sample,
    product_id: products_ids.sample
  )
end
