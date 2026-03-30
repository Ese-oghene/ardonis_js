import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { signupValidator } from '#validators/user'

export default class UserController {

    // Get all users
  async index({ serialize }: HttpContext) {
    const users = await User.all()
    return serialize(users.map(user => (UserTransformer.transform(user))))
  }

   // Create new user
  async store({ request, serialize }: HttpContext) {
    const { fullName, email, password } = await request.validateUsing(signupValidator)
    const user = await User.create({ fullName, email, password })
    return serialize(UserTransformer.transform(user))
  }

  async show({ params, response, serialize }: HttpContext) {
  const user = await User.find(params.id)
  if (!user) return response.notFound({ message: 'User not found' })

    return serialize(UserTransformer.transform(user))
  }

   // Update user
  async update({ params, request, response, serialize }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'User not found' })

    const data = request.only(['fullName', 'email', 'password'])
    user.merge(data)
    await user.save()

    return serialize(UserTransformer.transform(user))
  }

   // Delete user
  async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'User not found' })

    await user.delete()
    return response.ok({ message: 'User deleted successfully' })
  }

}