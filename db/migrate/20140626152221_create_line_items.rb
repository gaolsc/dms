class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|
      t.references :order, index: true
      t.string :label
      t.decimal :price
      t.integer :number

      t.timestamps
    end
  end
end
