module Admin::OrdersHelper
  def elapsed(order_at)
    secs = Time.now.getlocal - order_at.getlocal
    hours = (secs / 3600).floor
    minutes = ((secs - hours * 3600) / 60).floor

    if hours > 0
      elapse_time = "<span style='color:red'>#{hours}时#{minutes}分钟</span>"
    elsif hours > 24
      elapse_time = "大于一天"
    else
      elapse_time = "#{minutes}分钟"
    end

    elapse_time
  end
end
