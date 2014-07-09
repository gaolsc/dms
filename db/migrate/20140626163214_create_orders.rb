class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.integer :status
      t.string :realname
      t.string :ship_address
      t.string :tel
      t.string :weixin_openid
      t.timestamps
    end
  end
end
