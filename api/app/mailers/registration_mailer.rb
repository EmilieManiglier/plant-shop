# frozen_string_literal: true

class RegistrationMailer < ApplicationMailer
	default :from => 'notifications@leaf-place.com'

	def welcome_email(user)
		@user = user
		@url = 'http://localhost:5100/connexion'
		mail(to: @user.email, subject: 'Welcome to Leaf Place')
	end
end
