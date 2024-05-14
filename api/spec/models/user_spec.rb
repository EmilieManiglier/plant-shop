require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is not valid without email and password' do
    user = User.new(email: '', password: '')
    expect(user).to_not be_valid
  end

  it 'is valid with email and password' do
    user = User.new(email: 'test@test.fr', password: 'password')
    expect(user).to be_valid
  end

  it 'validates the uniqueness of email' do
    user = User.new(email: 'user-1@test.fr', password: 'password').save
    user2 = User.new(email: 'user-1@test.fr', password: 'password')
    expect(user2).to be_invalid
  end
end
