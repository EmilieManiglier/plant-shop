AdminUser.create!(email: 'admin@kinoba.fr', password: 'password', password_confirmation: 'password') if Rails.env.development?
