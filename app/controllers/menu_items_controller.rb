class MenuItemsController < ApplicationController
  before_action :set_menu_item, only: [:show, :edit, :update, :destroy]

  def index
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
    _menu_item_params = {preview_url: preview_url}.merge(_menu_item_params)
    item = MenuItem.new(_menu_item_params)
    item.save()
    render json: true, status: :created
  end

  def update
    respond_to do |format|
      if @menu_item.update(menu_item_params)
        format.html { redirect_to @menu_item, notice: 'Menu item was successfully updated.' }
        format.json { render :show, status: :ok, location: @menu_item }
      else
        format.html { render :edit }
        format.json { render json: @menu_item.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @menu_item.destroy
    respond_to do |format|
      format.html { redirect_to menu_items_url, notice: 'Menu item was successfully destroyed.' }
      format.json { head :no_content }
    end
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
