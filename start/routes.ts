/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
// import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import NewAccountController from '#controllers/new_account_controller'
import UserController from '#controllers/users_controller'
import TodosController from '#controllers/todos_controller'

// Register
router.post('/register', [NewAccountController, 'store'])

// Login
router.post('/login', [NewAccountController, 'login'])

router
  .group(() => {
    router.get('/users', [UserController, 'index'])
    router.get('/users/:id', [UserController, 'show'])
    router.post('/users', [UserController, 'store'])
    router.put('/users/:id', [UserController, 'update'])
    router.delete('/users/:id', [UserController, 'destroy'])
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('/todos', [TodosController, 'index'])
    router.post('/todos', [TodosController, 'store'])
    router.get('/todos/:id', [TodosController, 'show'])
    router.put('/todos/:id', [TodosController, 'update'])
    router.delete('/todos/:id', [TodosController, 'destroy'])
  })
  .use(middleware.auth())
  



// router.get('/', () => {
//   return { hello: 'world' }
// })

// router
//   .group(() => {
//     router
//       .group(() => {
//         router.post('signup', [controllers.NewAccount, 'store'])
//         router.post('login', [controllers.AccessToken, 'store'])
//         router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
//       })
//       .prefix('auth')
//       .as('auth')

//     router
//       .group(() => {
//         router.get('/profile', [controllers.Profile, 'show'])
//       })
//       .prefix('account')
//       .as('profile')
//       .use(middleware.auth())
//   })
//   .prefix('/api/v1')
