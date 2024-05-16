# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  it 'is not valid without email and password' do
    user = described_class.new(email: '', password: '')
    expect(user).not_to be_valid
  end

  it 'is valid with email and password' do
    user = described_class.new(email: 'test@test.fr', password: 'password')
    expect(user).to be_valid
  end

  it 'validates the uniqueness of email' do
    described_class.new(email: 'user-1@test.fr', password: 'password').save
    user2 = described_class.new(email: 'user-1@test.fr', password: 'password')
    expect(user2).not_to be_valid
  end

  it 'sends an email after sign up' do
    user = described_class.new(
      email: 'new-user-1@test.fr',
      password: 'password',
      firstname: 'John',
      lastname: 'Doe'
    )

    expect { user.save }.to change { ActionMailer::Base.deliveries.count }.by(1)
  end
end
