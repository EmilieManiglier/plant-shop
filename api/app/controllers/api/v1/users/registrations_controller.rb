# frozen_string_literal: true

module Api
  module V1
    module Users
      # RegistrationsController
      class RegistrationsController < Devise::RegistrationsController
        respond_to :json
      end
    end
  end
end
