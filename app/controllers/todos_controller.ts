 import type { HttpContext } from '@adonisjs/core/http'
 import Todo from '#models/todo'
import { createTodoValidator, updateTodoValidator } from '#validators/todo'

export default class TodosController {
    
  // Get all todos for logged-in user
  /**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos for logged-in user
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 */
  async index({ auth }: HttpContext) {
    return await Todo.query().where('user_id', auth.user!.id)
  }

  // Create todo
  /**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Buy milk
 *             completed: false
 *     responses:
 *       201:
 *         description: Todo created
 */
  async store({ request, auth }: HttpContext) {
    const data = await request.validateUsing(createTodoValidator)

    return await Todo.create({
      ...data,
      userId: auth.user!.id,
    })
  }

  // Get single todo
  /**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a single todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo found
 *       404:
 *         description: Todo not found
 */
  async show({ params, auth, response }: HttpContext) {
    const todo = await Todo
      .query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .first()

    if (!todo) return response.notFound({ message: 'Todo not found' })

    return todo
  }

  // Update todo
  /**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             title: Updated task
 *             completed: true
 *     responses:
 *       200:
 *         description: Todo updated
 */
  async update({ params, request, auth, response }: HttpContext) {
    const todo = await Todo
      .query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .first()

    if (!todo) return response.notFound({ message: 'Todo not found' })

    const data = await request.validateUsing(updateTodoValidator)

    todo.merge(data)
    await todo.save()

    return todo
  }

   // Delete todo
   /**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted
 */
  async destroy({ params, auth, response }: HttpContext) {
    const todo = await Todo
      .query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .first()

    if (!todo) return response.notFound({ message: 'Todo not found' })

    await todo.delete()

    return response.ok({ message: 'Todo deleted successfully' })
  }

  
    

}