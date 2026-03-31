/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

//import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerDefinition from '#config/swagger'


import NewAccountController from '#controllers/new_account_controller'
import UserController from '#controllers/users_controller'
import TodosController from '#controllers/todos_controller'

const options = {
  definition: swaggerDefinition,
  apis: ['./build/app/controllers/**/*.js'], // ✅ fix
}

const swaggerSpec = swaggerJsdoc(options)

// ✅ REQUIRED
router.get('/swagger.json', async ({ response }) => {
  return response.json(swaggerSpec)
})

// Swagger UI
router.get('/docs', async ({ response }) => {
  return response.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>API Docs</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>

        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
        <script>
          SwaggerUIBundle({
            url: '/swagger.json',
            dom_id: '#swagger-ui'
          });
        </script>
      </body>
    </html>
  `)
})

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
  


