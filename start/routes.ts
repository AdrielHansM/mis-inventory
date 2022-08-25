import Route from '@ioc:Adonis/Core/Route'
 
Route.group(() => {
  Route.get('/ping', async ()=> {return {response: 'pong'}})
  Route.post('/auth/register', 'AuthController.register')
  Route.post('/auth/login', 'AuthController.login')

  Route.group(() => {
    Route.get('/', 'ManufacturersController.index')
    Route.post('/', 'ManufacturersController.store').middleware('auth')
    Route.get('/search', 'ManufacturersController.search')
    Route.get('/:id', 'ManufacturersController.show')
    Route.patch('/:id', 'ManufacturersController.update').middleware('auth')
    Route.delete('/:id', 'ManufacturersController.destroy').middleware('auth')
  }).prefix('manufacturer')

  Route.group(() => {
    Route.get('/', 'ProductsController.index')
    Route.post('/', 'ProductsController.store').middleware('auth')
    Route.get('/search', 'ProductsController.search')
    Route.get('/:id', 'ProductsController.show')
    Route.patch('/:id', 'ProductsController.update').middleware('auth')
    Route.delete('/:id', 'ProductsController.destroy').middleware('auth')
  }).prefix('products')

  Route.group(() => {
    Route.get('/', 'InventoriesController.index')
    Route.post('/', 'InventoriesController.store').middleware('auth')
    Route.get('/search', 'InventoriesController.search')
    Route.get('/:id', 'InventoriesController.show')
    Route.patch('/:id', 'InventoriesController.update').middleware('auth')
    Route.delete('/:id', 'InventoriesController.destroy').middleware('auth')
  }).prefix('inventory')

  Route.group(() => {
    Route.get('/', 'TransactionsController.index')
    Route.post('/', 'TransactionsController.store').middleware('auth')
    Route.get('/:id', 'TransactionsController.show')
    Route.delete('/:id', 'TransactionsController.destroy').middleware('auth')
  }).prefix('transaction')

  Route.group(() => {
    Route.get('/', 'CustomersController.index')
    Route.post('/', 'CustomersController.store').middleware('auth')
    Route.get('/search', 'CustomersController.search')
    Route.get('/:id', 'CustomersController.show')
    Route.patch('/:id', 'CustomersController.update').middleware('auth')
    Route.delete('/:id', 'CustomersController.destroy').middleware('auth')
  }).prefix('customers')

  Route.resource('transactions', 'TransactionsController').apiOnly().middleware({
    store: 'auth',
    update: 'auth',
    destroy: 'auth'
  })

}).prefix('api')