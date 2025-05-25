import type { Command, Result } from './libs'

import {
  commit,
  git,
  push,
  tag
} from './libs'

const main = git

const setPropertyDescriptor = (
  value: (...args: any) => any
): PropertyDescriptor => ({
  value,
  enumerable: true,
  configurable: false,
  writable: false
})

Object.defineProperties(main, {
  commit: setPropertyDescriptor(commit),
  tag: setPropertyDescriptor(tag),
  push: setPropertyDescriptor(push)
})

export interface Git {
  (command: Command, args: string[]): Promise<Result>
  commit: typeof commit
  tag: typeof tag
  push: typeof push
}

export default main as Git
