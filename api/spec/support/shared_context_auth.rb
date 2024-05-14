# frozen_string_literal: true

RSpec.shared_context 'with authenticated user' do
  let(:user) { create(:user) }

  before { sign_in user }
end
