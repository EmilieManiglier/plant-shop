require 'rails_helper'

RSpec.describe Category, type: :model do
  it 'is valid with name' do
    category = Category.new(name: 'Category 1')
    expect(category).to be_valid
  end

  it 'is not valid without a name' do
    category = Category.new(name: nil)
    category.valid?
    expect(category.errors[:name]).to include("can't be blank")
  end
end
