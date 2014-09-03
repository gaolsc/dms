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
      page = (data[:Content] == '菜' || data[:Content] == 'cai') ? :yipinyao : :fun
      render xml: page, status: :ok
    else
      head :forbidden
    end
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