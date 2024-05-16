# frozen_string_literal: true

module Api
  module V1
    module Users
      # RegistrationsController
      class RegistrationsController < Devise::RegistrationsController
        include ApiConcern

        before_action :configure_permitted_parameters if :devise_controller?

        def update
          super do |resource|
            return render422(resource.errors) if resource.errors.present?

            return render json: UserSerializer.render(resource)
          end
        end

        protected

        # Define permission to firstname, lastname, role...
        # for the sign_up form in order to add users into the database
        def configure_permitted_parameters
          devise_parameter_sanitizer.permit(:sign_up, keys: sign_up_attributes)
          devise_parameter_sanitizer.permit(:account_update, keys: account_update_attributes)
        end

        private

        def sign_up_attributes
          [
            :email,
            :firstname,
            :lastname,
            :phone_number
          ]
        end

        def account_update_attributes
          [
            :firstname,
            :lastname,
            :phone_number,
            :password,
            :password_confirmation
          ]
        end
      end
    end
  end
end
