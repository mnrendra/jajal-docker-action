const args = ['a', 'b', 'c']

const command = args.shift()

const flags = [`"${command}"`, ...args]

console.log(flags)
