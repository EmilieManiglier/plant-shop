# frozen_string_literal: true

class UserSerializer < ApplicationSerializer
  identifier :id

  fields :email
end
