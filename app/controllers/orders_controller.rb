class OrdersController < ApplicationController
  def index
    if params[:today]
      @orders = Order.includes(:line_item).today.order(:created_at, :desc)
    else
      @orders = Order.order(:created_at, :desc)
    end
  end

  def create
    contact = params[:contact]
    orders = params[:orders]
    order = Order.create_order(contact, orders)
    render json: order, status: :created
  end

  def destroy
  end
end
