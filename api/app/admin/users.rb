ActiveAdmin.register User do
  menu label: proc { I18n.t('active_admin.navigation.users') }

  config.sort_order = 'id_asc'

  permit_params :city,
                :country,
                :email,
                :firstname,
                :lastname,
                :password,
                :phone_number,
                :street,
                :zip_code

  filter :email
  filter :firstname
  filter :lastname
  filter :phone_number
  filter :street
  filter :city
  filter :zip_code
  filter :country

  index do
    selectable_column
    id_column
    column :email
    column :firstname
    column :lastname
    column :phone_number
    column(:favorites) { |user| user.favorites.count }
    actions
  end

  show do
    attributes_table do
      row :email
      row :firstname
      row :lastname
      row :phone_number
      row :street
      row :city
      row :zip_code
      row :country
      row(:favorites) { |user| user.favorites.count }
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs I18n.t('active_admin.informations') do
      f.input :email
      if f.object.new_record?
        f.input :password
      end
      f.input :firstname
      f.input :lastname
      f.input :phone_number
      f.input :street
      f.input :city
      f.input :zip_code
      f.input :country, as: :string
    end
    f.actions
  end
end
