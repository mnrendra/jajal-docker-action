import gpgConnectAgent from './gpgConnectAgent'

const killAgent = async (): Promise<void> => {
  const killAgent = await gpgConnectAgent('KILLAGENT')
  console.log('susu----------killAgent:', killAgent)
}

export default killAgent
