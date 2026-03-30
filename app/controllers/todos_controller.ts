 import type { HttpContext } from '@adonisjs/core/http'
 import Todo from '#models/todo'
import { createTodoValidator, updateTodoValidator } from '#validators/todo'

export default class TodosController {
    
  // Get all todos for logged-in user
  async index({ auth }: HttpContext) {
    return await Todo.query().where('user_id', auth.user!.id)
  }

  // Create todo
  async store({ request, auth }: HttpContext) {
    const data = await request.validateUsing(createTodoValidator)

    return await Todo.create({
      ...data,
      userId: auth.user!.id,
    })
  }

  // Get single todo
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