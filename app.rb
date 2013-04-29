require 'sinatra'

get '/' do
  'Hello world!'
end

get '/map' do
 send_file File.join('./', 'map.html')
end
