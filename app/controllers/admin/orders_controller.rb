class Admin::OrdersController < Admin::AdminController
  def index
    if params[:all]
      @orders = Order.order(created_at: :desc, updated_at: :desc)
    else
      @orders = Order.includes(:line_items).today.order(created_at: :desc, updated_at: :desc)
    end
  end

  def eager
    @orders = Order.includes(:line_items).today.where(status: Order::ST_NEW).order(created_at: :asc)
  end

  def create
    contact = params[:contact]
    orders = params[:orders]
    order = Order.create_order(contact, orders)
    render json: order, status: :created
  end

  def update
    order = Order.find(params[:id])
    order.update_attributes!(order_params)
    render json: order, status: :ok
  end

  def show
    @order = Order.find(params[:id])
    @line_items = @order.line_items
    @total_price = @line_items.inject(0) { |memo, el| memo + el.price }
  end

  def destroy
  end

  private

  def order_params
    params.require(:order).permit(:status, :ship_address, :realname, :weixin_openid, :tel)
  end
end
