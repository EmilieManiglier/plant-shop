# frozen_string_literal: true

# User
class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  has_many :favorites, dependent: :destroy

  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: self

  validates :email, presence: true, uniqueness: true, format: { with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/ }

  enum role: { shop_owner: 'shop_owner', user: 'user' }
end
