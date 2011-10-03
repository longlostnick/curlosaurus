require 'curb'

class RequestsController < ApplicationController

  # ajax request initiated by form
  def create
    roar = Curl::Easy.new(params[:url])

    if params[:auth] == '1'
      roar.http_auth_types = :basic
      roar.username = params[:user]
      roar.password = params[:pass]
    end

    if params[:follow] == '1'
      roar.follow_location = true
    end

    method = params[:method]

    begin
      if method == 'get' || method == 'delete'
        roar.send("http_#{method}")
      elsif method == 'post' || method == 'put'
        roar.send("http_#{method}", params[:body])
      end

      roar.perform

      render :partial => 'result', :locals => { :result => roar }
    rescue => e
      render :text => e.to_s
    end
  end
end
