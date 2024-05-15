# frozen_string_literal: true

# UserSerializer
class UserSerializer < ApplicationSerializer
  identifier :id

  fields :email, :firstname, :lastname, :role, :phone_number
end
