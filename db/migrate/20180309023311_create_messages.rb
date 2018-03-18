class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages, id: false do |t|
      t.string :uid, null: false, unique: true 
      t.string :author, null: false
      t.string :live_chat_id, null: false
      t.string :display_message, null: false
      t.datetime :published_at, null: false

      t.timestamps
    end
    add_index :messages, :uid
    add_index :messages, :author
    add_index :messages, :live_chat_id
  end
end
