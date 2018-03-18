class MessagesController < ApplicationController
  def index
    @messages = Message.find_by(live_chat_id: params[:liveChatId])

    render :index
  end

  def create
    @message = Message.new(message_params)

    render :show 
  end 

  private 

  def message_params
    params.require(:message).permit(:id, :uid, :author, :live_chat_id, :display_message, :published_at)
  end 
end
