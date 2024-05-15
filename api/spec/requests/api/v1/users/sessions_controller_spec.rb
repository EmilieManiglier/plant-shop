# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::Users::SessionsController do
  describe '#POST /api/v1/users/sign_in' do
    let(:user) { create(:user) }
    let(:params) do
      {
        email: user.email,
        password: user.password
      }
    end

    before { post '/api/v1/users/sign_in', params: { user: params } }

    context 'when user provides valid credentials' do
      it_behaves_like 'successful status'
    end

    context 'when user provides invalid credentials' do
      let(:params) do
        {
          email: user.email,
          password: 'wrong_password'
        }
      end

      it_behaves_like 'unauthorized status'
    end
  end
end
