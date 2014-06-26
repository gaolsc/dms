class CreateMenuItems < ActiveRecord::Migration
  def change
    create_table :menu_items do |t|
      t.string :label
      t.decimal :price
      t.string :preview_url
      t.boolean :enabled

      t.timestamps
    end
  end
end
