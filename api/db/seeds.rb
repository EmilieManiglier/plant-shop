# frozen_string_literal: true

Product.create(name: 'Alocasia Regal Shield', description: 'lorem ipso', price: 20.00, stock: 10)

10.times do |i|
  User.create!(
    email: "user-#{i}@kinoba.fr",
    password: 'password'
  )
end
