require 'curb'
require 'json'

class RequestsController < ApplicationController

  # ajax request initiated by form
  def create
    type = params[:type]

    begin
      stuff_back = Curl::Easy.send("perform", params[:url]) do |curl|
        curl.headers['Accept'] = 'application/json'
        curl.headers['Content-Type'] = 'application/json'
        curl.headers['Api-Version'] = '2.2'
      end

      @data = stuff_back.body_str

      if (is_json(@data))
         render :text => @data
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
