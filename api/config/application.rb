# frozen_string_literal: true

require_relative 'boot'

require 'rails'
# Pick the frameworks you want:
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_mailbox/engine'
require 'action_text/engine'
require 'action_view/railtie'
require 'action_cable/engine'
# require "sprockets/railtie"
require 'rails/test_unit/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Api
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    # Where the I18n library should search for translation files
    I18n.load_path += Dir[Rails.root.join('config/locales/**/*.{rb,yml}')]

    # Permitted locales available for the application
    I18n.available_locales = [:fr, :en]

    # Set default locale to something other than :en
    I18n.default_locale = :fr

    # TODO : This fix the issue with CSRF token in development mode but it's not a good practice
    # Find a better way to fix this
    if ENV['RAILS_ENV'] == 'development'
      # Allow cookies to be sent with cross-site requests
      config.action_dispatch.cookies_same_site_protection = :none
      # Disable CSRF protection, making testing easier
      config.action_controller.default_protect_from_forgery = false
    end
    # For ActiveAdmin : flash message and cookies
    config.middleware.use Rack::MethodOverride
    config.middleware.use ActionDispatch::Flash
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore,
                          key: "_#{ENV.fetch('COOKIE_NAME', '').downcase}_session",
                          expire_after: 10.days
  end
end
