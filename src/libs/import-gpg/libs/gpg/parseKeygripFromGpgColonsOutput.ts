import { splitLines } from '../../helpers'

const parseKeygripFromGpgColonsOutput = (
  output: string,
  fingerprint: string
): string => {
  let keygrip = ''
  let fingerPrintFound = false

  const lines = splitLines(output, true)

  for (const line of lines) {
    if (line.startsWith('fpr:') && line.includes(`:${fingerprint}:`)) {
      fingerPrintFound = true
      continue
    }

    if (line.startsWith('grp:') && fingerPrintFound) {
      keygrip = line.replace(/(grp|:)/g, '').trim()
      break
    }
  }

  return keygrip
}

export default parseKeygripFromGpgColonsOutput
