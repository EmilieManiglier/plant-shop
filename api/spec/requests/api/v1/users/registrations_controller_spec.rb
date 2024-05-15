# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::Users::RegistrationsController do
  include_context 'with authenticated user'

  describe '#PUT /api/v1/users/account_update' do
    let(:params) do
      {
        firstname: 'Firstname updated',
        lastname: 'Lastname updated',
        current_password: 'password'
      }
    end

    before do
      put '/api/v1/users/account_update', params: { user: params }
      user.reload
    end

    it_behaves_like 'successful status'

    it 'updates user information' do
      expect(user.firstname).to eq(params[:firstname])
      expect(user.lastname).to eq(params[:lastname])
    end
  end
end
