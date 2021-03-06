require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    config.i18n.default_locale = :ja
    # Initialize configuration defaults for originally generated Rails version.
    config.time_zone = 'Tokyo'
    config.load_defaults 5.1
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.generators do |g|
      g.helper false
      g.template_engine false
      g.test_framework :rspec, view_specs: false, helper_specs: false, fixture: true
      g.fixtrue_replacement :factory_girl, dir: "spec/support/factories"
    end
  end
end
