require 'curb'
require 'coderay'
require 'yajl'

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

      body = format_body(roar.content_type, roar.body_str)

      render :json => {
        :success => true,
        :header => roar.header_str,
        :body   => body
      }
    rescue => e
      render :json => {
        :success => false,
        :message => e.to_s
      }
    end
  end

  private
  
  #TODO: maybe move these to a new file?

  def format_body(type, body)
    type.to_s

    if type.include? 'json'
      parsed = Yajl::Parser.parse(body)
      json = Yajl::Encoder.new(:pretty => true).encode(parsed)
      colorize :js => json
    elsif type.include? 'html'
      colorize :html => body
    else
      body.inspect
    end
  end

  def colorize(hash = {})
    CodeRay.scan(hash.values.first, hash.keys.first).html
  end
end
