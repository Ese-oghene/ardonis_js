/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  newAccount: {
    store: typeof routes['new_account.store']
    login: typeof routes['new_account.login']
  }
  user: {
    index: typeof routes['user.index']
    show: typeof routes['user.show']
    store: typeof routes['user.store']
    update: typeof routes['user.update']
    destroy: typeof routes['user.destroy']
  }
  todos: {
    index: typeof routes['todos.index']
    store: typeof routes['todos.store']
    show: typeof routes['todos.show']
    update: typeof routes['todos.update']
    destroy: typeof routes['todos.destroy']
  }
}
