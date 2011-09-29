require 'rest_client'

class RequestsController < ApplicationController

  USERNAME = 'soa_reader'
  PASSWORD = 'sinatra4thew1n'

  # ajax request initiated by form
  def create
    type = params[:type]
    url = "http://#{USERNAME}:#{PASSWORD}@#{params[:url]}"

    begin

      if type == 'get'
        @roar = RestClient.get(url)
      elsif type == 'post' || type == 'put' || type == 'delete'
        @roar = RestClient.send(type, url, params[:data])
      end

      if (is_json(@roar))
         render :text => @roar
      else
         render :text => "ROAR. The response must be in json format!"
      end
    rescue => e
      render :text => e
    end
  end

  private

  def is_json(json)
    begin
      JSON.parse(json)
      return true
    rescue
      return false
    end
  end
end
