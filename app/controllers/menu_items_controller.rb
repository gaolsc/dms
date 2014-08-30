class MenuItemsController < ApplicationController
  before_action :set_menu_item, only: [:show, :edit, :update, :destroy]

  def index
    @menu_items = MenuItem.where(enabled: true).order(:created_at, :desc)
  end

  def man_index
    @menu_items = MenuItem.order(:created_at, :desc)
  end

  def show
  end

  def edit
  end

  def create
    _menu_item_params = params.permit(:label, :price, :desc)
    preview_data = params[:preview].read()
    preview_url = "previews/#{Time.now.to_i}.jpg"
    File.open("public/" + preview_url, "wb") { |f| f.write(preview_data) }
    _menu_item_params = {preview_url: preview_url, enabled: true}.merge(_menu_item_params)
    item = MenuItem.new(_menu_item_params)
    item.save()
    redirect_to admin_menu_items_path
  end

  def update
    @menu_item.update(menu_item_params)
    render json: @menu_item, status: :ok
  end

  def destroy
    @menu_item.destroy
    render json: true, status: :ok
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_menu_item
    @menu_item = MenuItem.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def menu_item_params
    params.require(:menu_item).permit(:label, :price, :enabled, :preview_url, :desc)
  end
end
