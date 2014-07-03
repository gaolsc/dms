class CreateMenuItems < ActiveRecord::Migration
  def change
    create_table :menu_items do |t|
      t.string :label
      t.decimal :price
      t.boolean :enabled
      t.string :preview_url
      t.text :desc

      t.timestamps
    end
  end
end
