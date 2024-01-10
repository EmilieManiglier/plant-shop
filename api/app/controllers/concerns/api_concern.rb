# frozen_string_literal: true

# Api common methods/helpers
module ApiConcern
  extend ActiveSupport::Concern

  included do
    include JsonErrors

    respond_to :json
  end
end
