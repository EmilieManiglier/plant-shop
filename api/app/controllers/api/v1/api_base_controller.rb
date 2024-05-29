# frozen_string_literal: true

module Api
  module V1
    # API Base controller
    class ApiBaseController < ActionController::API
			# ActionController::API doesn't include the module for rendering JSON
			# So we need to include it manually
			include ActionController::MimeResponds

      include ApiConcern

      before_action :authenticate_user!
    end
  end
end
