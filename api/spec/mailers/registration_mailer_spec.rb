# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RegistrationMailer do
  describe 'welcome_email' do
    let(:new_user) { create(:user) }
    let(:mail) { described_class.welcome_email(new_user) }

    it 'renders the subject' do
      expect(mail.subject).to eq('Bienvenue sur Leaf Place')
    end

    it 'sends to the user email' do
      expect(mail.to).to eq([new_user.email])
    end

    it 'renders user full name' do
      expect(mail.body.encoded).to match("#{new_user.firstname} #{new_user.lastname}")
    end
  end
end
