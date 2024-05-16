# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Product do
  it 'is valid with name and price' do
    product = described_class.new(name: 'Product 1', price: 100)
    expect(product).to be_valid
  end
end
