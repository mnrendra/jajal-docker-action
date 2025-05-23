const parseStdoutLines = (
  stdout: string
): string[] => {
  return stdout.replace(/\r/g, '').trim().split(/\n/)
}

export default parseStdoutLines
