# frozen_string_literal: true

module Api
  module V1
    module Users
      # SessionsController
      class SessionsController < Devise::SessionsController
        respond_to :json

        def create
          super do |resource|
            return render422(resource.errors) if resource.errors.present?

            return render json: UserSerializer.render(resource), status: :ok
          end
        end
      end
    end
  end
end
