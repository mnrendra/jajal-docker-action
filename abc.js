const context = {
  nextRelease: {
    version: '1.2.3',
    notes: 'hallo\n\nworld!'
  },
  branch: {
    name: 'main',
    meta: {
      name: 'susu'
    }
  }
}

console.log(context['nextRelease.version'])

const str = 'release: {branch.meta.name} v{nextRelease.version}\n\n{nextRelease.notes}\n\non branch: {branch.name}'

const matches = [...str.matchAll(/{(.*?)}/g)].map(m => m[1])

const getNested = (object, path) => {
  let msg = ''
  path.split('.').forEach((key) => {
    msg = object[key]
  })
  return 
}

let msg = str

matches.forEach((key) => {
  const val = getNested(context, key)
  console.log('val:', val)
  msg = msg.replace(`{${key}}`, val)
})

console.log(msg)
