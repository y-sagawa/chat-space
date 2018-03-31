class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    respond_to do |format|
      format.html {
        @group = Group.find(params[:group_id])
        @messages = @group.messages.includes(:user)
      }
      format.json{ @new_messages = Message.where('id > ?', params[:message][:id]).includes(:user)}
    end
  end

  def create
    @message = @group.messages.new(message_params)
    @message.save!
    respond_to do |format|
      format.html{ redirect_to group_messages_path }
      format.json
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
