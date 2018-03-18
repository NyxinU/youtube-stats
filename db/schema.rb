# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180309023311) do

  create_table "messages", id: false, force: :cascade do |t|
    t.string "uid", null: false
    t.string "author", null: false
    t.string "live_chat_id", null: false
    t.string "display_message", null: false
    t.datetime "published_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author"], name: "index_messages_on_author"
    t.index ["live_chat_id"], name: "index_messages_on_live_chat_id"
    t.index ["uid"], name: "index_messages_on_uid"
  end

# Could not dump table "users" because of following StandardError
#   Unknown type 'profile_image_url' for column 'display_name'

end
