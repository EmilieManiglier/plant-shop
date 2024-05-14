# frozen_string_literal: true

FactoryBot.define do
	factory :product do
		sequence(:name) { |n| "product-#{n}" }
		sequence(:description) { |n| "description-#{n}" }
		sequence(:price) { |n| n }
	end
end
