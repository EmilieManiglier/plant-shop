# frozen_string_literal: true

class UserSerializer < ApplicationSerializer
  identifier :id

  fields :email, :firstname, :lastname, :role, :phone_number
end
