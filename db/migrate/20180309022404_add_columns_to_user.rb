class AddColumnsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :display_name, :profile_image_url
  end
end
