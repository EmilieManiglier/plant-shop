# frozen_string_literal: true

class AddAddressToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :street, :string
    add_column :users, :city, :string
    add_column :users, :country, :string
    add_column :users, :zip_code, :string
  end
end
