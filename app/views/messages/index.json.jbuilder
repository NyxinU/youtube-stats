json.messages do 
  @messages.each do |message|
    json.set! message.uid do 
      json.partial! 'messages/message', message: message 
    end 
  end 
end 