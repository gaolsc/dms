Rails.application.routes.draw do
  namespace :admin do
    resources :orders, only: [:index, :update, :destroy, :show] do
      get 'eager', on: :collection
    end
  end

  post    '/orders'                =>  'admin/orders#create'
  get     '/admin/menu_items'      =>  'menu_items#man_index'
  get     '/admin'                 =>  'menu_items#man_index'
  get     '/admin/menu_items/new'  =>  'menu_items#new'
  put     '/admin/menu_items/:id'  =>  'menu_items#update'
  post    '/admin/menu_items'      =>  'menu_items#create'
  delete  '/admin/menu_items/:id'  =>  'menu_items#destroy'

  devise_for :users
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'menu_items#index'
  resources :menu_items, only: [:index]

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
