# frozen_string_literal: true

ActiveAdmin.register Category do
  menu priority: 3, label: proc { I18n.t('active_admin.navigation.categories') }

  config.sort_order = 'id_asc'

  permit_params :name

  filter :name

  index do
    selectable_column
    id_column
    column :name
    actions
  end
end
