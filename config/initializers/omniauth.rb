OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '436886276203-nrmpjohdea8o1gfir6psc5u12efs5t6p.apps.googleusercontent.com', '46Tff400uot3mOE9Wj7O94eV', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end