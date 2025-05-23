import { store } from '../store'

const debug = (
  message: string
): void => {
  if (store.verbose) {
    console.log(`'\u001B[90m'${message}\u001B[39m`)
  }
}

export default debug
