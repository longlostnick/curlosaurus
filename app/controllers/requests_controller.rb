require 'json'
require 'curb'

class RequestsController < ApplicationController

  # ajax request initiated by form
  def create
    roar = Curl::Easy.new(params[:url])

    method = params[:method]

    begin
      if method == 'get'
        roar.http_get
      elsif method == 'post' || method == 'put' || method == 'delete'
        roar.send("http_#{method}", params[:body])
      end

      render :text => roar.body_str
    rescue => e
      render :text => e
    end
  end

  private

  def add_auth(user, pass)
    @auth = {:username => user, :password => pass }
  end

  def is_json(json)
    begin
      JSON.parse(json)
      return true
    rescue
      return false
    end
  end
end
