import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { signupValidator } from '#validators/user'

export default class UserController {

  // Get all users
  /**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */  
  async index({ serialize }: HttpContext) {
    const users = await User.all()
    return serialize(users.map(user => (UserTransformer.transform(user))))
  }

   // Create new user
  /**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             fullName: John Doe
 *             email: john@example.com
 *             password: 12345678
 *     responses:
 *       201:
 *         description: User created
 */
  async store({ request, serialize }: HttpContext) {
    const { fullName, email, password } = await request.validateUsing(signupValidator)
    const user = await User.create({ fullName, email, password })
    return serialize(UserTransformer.transform(user))
  }

  /**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single user
 *     tags: [Users]
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
 *         description: User found
 *       404:
 *         description: User not found
 */
  async show({ params, response, serialize }: HttpContext) {
  const user = await User.find(params.id)
  if (!user) return response.notFound({ message: 'User not found' })

    return serialize(UserTransformer.transform(user))
  }

   // Update user
  /**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
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
 *             fullName: Updated Name
 *             email: updated@example.com
 *             password: newpassword
 *     responses:
 *       200:
 *         description: User updated
 */
  async update({ params, request, response, serialize }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'User not found' })

    const data = request.only(['fullName', 'email', 'password'])
    user.merge(data)
    await user.save()

    return serialize(UserTransformer.transform(user))
  }

   // Delete user
   /**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
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
 *         description: User deleted
 */
  async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'User not found' })

    await user.delete()
    return response.ok({ message: 'User deleted successfully' })
  }

}