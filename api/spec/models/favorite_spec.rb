require 'rails_helper'

RSpec.describe Favorite, type: :model do
  it 'is valid with user_id and product_id' do
    user = User.create(email: 'test@test.fr', password: 'password')
    product = Product.create(name: 'Product 1', price: 10)
    favorite = Favorite.new(user_id: user.id, product_id: product.id)
    expect(favorite).to be_valid
  end
end
