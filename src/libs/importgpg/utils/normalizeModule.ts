const normalizeModule = <T extends ((...args: any) => any) | Record<any, any>>(
  module: T
): T => {
  if (typeof module === 'function') {
    return module
  }

  if (
    typeof module === 'object' &&
    module !== null &&
    !Array.isArray(module) &&
    typeof module.default === 'function'
  ) {
    return module.default
  }

  throw new Error('Invalid module')
}

export default normalizeModule
