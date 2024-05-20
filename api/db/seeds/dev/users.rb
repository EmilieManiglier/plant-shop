# frozen_string_literal: true

Faker::Config.locale = 'fr'

10.times do |i|
  # Skip the callback to avoid sending emails
  User.skip_callback(:create, :after, :send_email_to_new_user)
  User.create!(
    email: "user-#{i}@kinoba.fr",
    password: 'password',
    firstname: Faker::Name.first_name,
    lastname: Faker::Name.last_name,
    role: 'user',
    phone_number: Faker::PhoneNumber.cell_phone_in_e164
  )
  User.set_callback(:create, :after, :send_email_to_new_user)
end
