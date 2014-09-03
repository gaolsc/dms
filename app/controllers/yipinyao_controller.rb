class YipinyaoController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :check_signature
  TOKEN = 'ysiupninnyypaeongfeigls0902'

  def auth
    echostr = params[:echostr]
    render text: echostr, status: :ok
  end

  def service
    data = params[:xml]
    if data[:MsgType] == "text"
      if data[:Content] == '菜' || data[:Content] == 'cai'
        render xml: :yipinyao, status: :ok
      else
        render xml: :fun, status: :ok
      end
    end

    head :forbidden
  end

  private

  def check_signature
    signature = params[:signature]
    timestamp = params[:timestamp]
    nonce = params[:nonce]
    tmp_str = [TOKEN, timestamp, nonce].sort!.join
    tmp_str = Digest::SHA1.hexdigest(tmp_str)
    render text: "Forbidden", status: :forbidden if tmp_str != signature
  end

end