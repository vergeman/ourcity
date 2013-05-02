require 'json'


def load_user_lib( filename )
  File.open( filename, "r" ) do |f|
    JSON.load( f )
  end
end

def save_file( obj, filename )
  File.open(filename, "w") do |f|
    JSON.dump(obj, f)
  end
end


obj =  load_user_lib('app/js/San_Diego_Neighborhoods.geojson')

obj["features"] = obj["features"].sort_by { |o| o["properties"]["name"] }

save_file(obj, "app/js/sorted.json")

