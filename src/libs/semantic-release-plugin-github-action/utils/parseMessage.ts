import type {
  AddChannelContext,
  GenerateNotesContext,
  PrepareContext,
  PublishContext,
  SuccessContext
} from 'semantic-release'

import getNested from './getNested'

type Context =
| AddChannelContext
| GenerateNotesContext
| PrepareContext
| PublishContext
| SuccessContext

const parseMessage = (
  context: Context,
  message: string = ''
): string => {
  const matches = [...message.matchAll(/{(.*?)}/g)]
  const paths = matches.map((match) => match[1])

  const parsedMessage = paths.reduce((acc, key) => {
    const value = getNested(context, key)
    return acc.replace(`{${key}}`, `${value}`)
  }, message)

  return parsedMessage
}

export default parseMessage
