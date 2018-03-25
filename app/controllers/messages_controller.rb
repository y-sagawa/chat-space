class MessagesController < ApplicationController
  before_action :set_group, :set_messages

  def index
    @message = Message.new
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html{ redirect_to group_messages_path }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_messages
    @messages = @group.messages.includes(:user)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
