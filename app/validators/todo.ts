import vine from '@vinejs/vine'

export const createTodoValidator = vine.create({
  title: vine.string().minLength(1),
  description: vine.string().optional(),
})

export const updateTodoValidator = vine.create({
  title: vine.string().optional(),
  description: vine.string().optional(),
  isCompleted: vine.boolean().optional(),
})