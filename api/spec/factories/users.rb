# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:firstname) { |n| "firstname-#{n}" }
    sequence(:lastname) { |n| "lastname-#{n}" }
    sequence(:email) { |n| "user-#{n}@mail.com" }
    sequence(:phone_number) { |n| "123456789#{n}" }
    role { 'user' }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
