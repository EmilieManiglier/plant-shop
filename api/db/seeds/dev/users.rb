# frozen_string_literal: true

Faker::Config.locale = 'fr'

10.times do |i|
  User.create!(
    email: "user-#{i}@kinoba.fr",
    password: 'password',
    firstname: Faker::Name.first_name,
    lastname: Faker::Name.last_name,
    role: 'user',
    phone_number: Faker::PhoneNumber.cell_phone_in_e164
  )
end
