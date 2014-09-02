class YipinyaoController < ApplicationController
  skip_before_action :verify_authenticity_token
  TOKEN = 'ysiupninnyypaeongfeigls0902'

  def auth
    echostr = params[:echostr]
    render text: echostr, status: :ok
  end

  def service
  end

  private

  def signature_valid?
    signature = params[:signature]
    timestamp = params[:timestamp]
    nonce = params[:nonce]
    token = TOKEN
    tmp_str = [token, timestamp, nonce].sort!.join
    tmp_str = Digest::SHA1.hexdigest(tmp_str)
    tmp_str == signature
  end

end