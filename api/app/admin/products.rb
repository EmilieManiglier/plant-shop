# frozen_string_literal: true

ActiveAdmin.register Product do
  menu priority: 2, label: proc { I18n.t('active_admin.navigation.products') }

  config.sort_order = 'id_asc'

  permit_params :name, :price, :description, :stock, :image, category_ids: []

  filter :name
  filter :price
  filter :stock
  filter :description
  filter :categories

  index do
    selectable_column
    id_column
    column :name
    number_column :price, as: :currency, unit: '€', format: '%n%u'
    column :stock
    column :description
    column :categories do |product|
      product.categories do |category|
        category.name
      end
    end
    actions
  end

  show do
    attributes_table do
      row :name
      number_row :price, as: :currency, unit: '€', format: '%n%u'
      row :stock
      row :description
      row :categories do |product|
        product.categories do |category|
          category.name
        end
      end
      row :image do |product|
        if product.image.attached?
          image_tag url_for(product.image), width: 200
        else
          I18n.t('active_admin.products.no_image')
        end
      end
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs I18n.t('active_admin.informations')  do
      f.input :name
      f.input :description
      f.input :price
      f.input :stock
      f.input :image, as: :file
      f.input :categories,
              as: :select,
              multiple: true,
              label: I18n.t('active_admin.navigation.categories'),
              collection: Category.all
    end
    f.actions
  end
end
