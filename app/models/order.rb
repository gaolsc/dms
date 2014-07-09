class Order < ActiveRecord::Base
  has_many :line_items, dependent: :destroy

  scope :today, -> { where("created_at >= ?", Time.now.beginning_of_day) }

  PASSWORD = '123456'
  ST_NEW = 0
  ST_OVER = 1
  ST_OBSOLETE= 2

  class << self
    def create_order(contact, orders)
      order = Order.new({status: ST_NEW}.merge(contact))

      menu_items = MenuItem.find(orders.keys());
      menu_items.each do |item|
        id = item.id
        count = orders[id.to_s]
        order.line_items << item.to_line_item(count)
      end
      order.save!
      order
    end

  end
end
