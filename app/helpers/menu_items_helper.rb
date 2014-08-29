module MenuItemsHelper
  def action_label(item)
    item.enabled ? '下架' : '上架'
  end
end
