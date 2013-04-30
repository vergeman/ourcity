require 'sinatra/base'
require 'sinatra/assetpack'

class App < Sinatra::Base
  set :root, File.dirname(__FILE__) # You must set app root


  register Sinatra::AssetPack

  assets do

    js :app, '/js/app.js', [
      '/js/*.js'                     
    ]

    css :application, '/css/application.css', [
      '/css/app.css'
    ]

    js_compression  :jsmin    # :jsmin | :yui | :closure | :uglify
    css_compression :simple   # :simple | :sass | :yui | :sqwish
    
  end

  
  get '/' do
    erb :index
  end

end






