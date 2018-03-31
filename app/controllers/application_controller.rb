class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  protect_from_forgery prepend: true
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  def after_sign_out_path_for(resource)
   new_user_session_path
  end
end
