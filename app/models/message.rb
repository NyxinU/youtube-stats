class Message < ApplicationRecord
  validates :uid, uniqueness: true
end
