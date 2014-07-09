class MenuItem < ActiveRecord::Base
  def to_line_item(count)
    LineItem.new(label: label, price: price, number: count)
  end
end
