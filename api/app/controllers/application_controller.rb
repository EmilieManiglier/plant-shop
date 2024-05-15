# frozen_string_literal: true

# ApplicationController
class ApplicationController < ActionController::API
  # ActionController::API doesn't include the module for rendering JSON
  # So we need to include it manually
  include ActionController::MimeResponds

  before_action :authenticate_user!
end
