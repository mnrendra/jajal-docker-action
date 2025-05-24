const splitLines = (
  stdout,
  isTrimmed = false
) => {
  // const stdoutLines = stdout
  //   .split('\n')
  //   .map((line) => line.endsWith('\r') ? line.slice(0, -1) : line)
  //   .join('\r')
  //   .split('\r')
  //   .map((line) => isTrimmed ? line.trim() : line)

  // return stdoutLines

  const stdoutLines = stdout
    .split(/\n\r|\r\n|\r|\n/)
    .map((line) => isTrimmed ? line.trim() : line)

  return stdoutLines
}

module.exports = splitLines
