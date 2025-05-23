import { store } from '../store'

const success = (
  message: string
): void => {
  if (store.verbose) {
    console.log(`\u001B[32m${message}\u001B[39m`)
  }
}

export default success
