class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.references :user
      t.integer :status

      t.timestamps
    end
  end
end
