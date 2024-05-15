# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Category do
  it 'is valid with name' do
    category = described_class.new(name: 'Category 1')
    expect(category).to be_valid
  end

  it 'is not valid without a name' do
    category = described_class.new(name: nil)
    category.valid?
    expect(category.errors[:name]).to include("can't be blank")
  end
end
