const chalk = (
  message,
  color,
  close = '\u001B[39m'
) => {
  return message.split('\n').map((line) => {
    line = color + line

    line = line.endsWith('\r')
      ? line.slice(0, -1) + close + '\r'
      : line + close

    return line
  }).join('\n')
}

console.log(chalk('abc\ndef\r\nghi\njkl\r\nmno\rpqi\nrst', '\u001B[90m'))

console.log('-------')

console.log('\u001B[90m' + 'abc\ndef\r\nghi\njkl\r\nmno\rpqi\nrst' + '\u001B[39m')
