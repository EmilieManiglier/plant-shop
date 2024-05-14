require 'rails_helper'

RSpec.describe Product, type: :model do
  it 'is valid with name, price, category_id' do
		category = Category.create(name: 'Category 1')
		product = Product.new(name: 'Product 1', price: 100, category_id: category.id)
		expect(product).to be_valid
	end
end
