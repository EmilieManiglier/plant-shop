# frozen_string_literal: true

RSpec.shared_examples 'successful status' do
  it 'returns successful http status code' do
    expect(response).to have_http_status(:successful)
  end
end

RSpec.shared_examples 'created status' do
  it 'returns created http status code' do
    expect(response).to have_http_status(:created)
  end
end

RSpec.shared_examples 'no_content status' do
  it 'returns no_content http status code' do
    expect(response).to have_http_status(:no_content)
  end
end

RSpec.shared_examples 'unauthorized status' do
  it 'returns unauthorized http status code' do
    expect(response).to have_http_status(:unauthorized)
  end
end
