import { store } from '../store'

const warn = (
  message: any
): void => {
  if (store.verbose) {
    console.log('\u001B[33mWARNING:\u001B[39m')
    console.log(`\u001B[33m${message}\u001B[39m`)
  }
}

export default warn
