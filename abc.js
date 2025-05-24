const splitLines = require('./splitLines')

const a = '' +
' N \n' +
' R \r' +
' RN \r\n' +
' NR \n\r ' +
' N \n' +
' R \r' +
' RN \r\n' +
' NR \n\r ' +
' N \n' +
' R \r' +
' RN \r\n' +
' NR \n\r ' +
' bonus '

const b = '' +
' R \r' +
' RN \r\n' +
' NR \n\r ' +
' N \n' +
' R \r' +
' RN \r\n' +
' NR \n\r ' +
' N \n' +
' R \r' +
' RN \r\n' +
' NR \n\r ' +
' N \n' +
' bonus '

const c = '' +
' RN \r\n' +
' NR \n\r ' +
' N \n' +
' R \r' +
' RN \r\n' +
' NR \n\r ' +
' N \n' +
' R \r' +
' RN \r\n' +
' NR \n\r ' +
' N \n' +
' R \r' +
' bonus '

const d = '' +
' NR \n\r ' +
' N \n' +
' R \r' +
' RN \r\n' +
' NR \n\r ' +
' N \n' +
' R \r' +
' RN \r\n' +
' NR \n\r ' +
' N \n' +
' R \r' +
' RN \r\n' +
' bonus '

const n = '' +
' N \n' +
' N \n' +
' N \n' +
' bonus '

const r = '' +
' R \r' +
' R \r' +
' R \r' +
' bonus '

const nr = '' +
' NR \n\r' +
' NR \n\r' +
' NR \n\r' +
' bonus '

const rn = '' +
' RN \r\n' +
' RN \r\n' +
' RN \r\n' +
' bonus '

const main = () => {
  console.log(splitLines(a, true))
  console.log(splitLines(b, true))
  console.log(splitLines(c, true))
  console.log(splitLines(d, true))

  console.log(splitLines(n, true))
  console.log(splitLines(r, true))
  console.log(splitLines(nr, true))
  console.log(splitLines(rn, true))
}

main()
