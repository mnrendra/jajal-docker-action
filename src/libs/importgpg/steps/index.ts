import type { Configs, Params, PushGpgsign, Scope } from './configGit'

import configGit from './configGit'
import configGPGAgent, { type KeygripPair } from './configGPGAgent'
import getGPGInfo, { type GPGInfo } from './getGPGInfo'
import getPrivateKeyInfo from './getPrivateKeyInfo'
import importGPGKey from './importGPGKey'
import printFingerprint from './printFingerprint'
import setGPGTrustLevel from './setTrustLevel'
import setWorkdir from './setWorkdir'

export {
  type Params as GitConfigParams,
  type Configs as GitConfigs,
  type PushGpgsign as GitPushGpgsign,
  type Scope as GitScope,
  type GPGInfo,
  type KeygripPair,
  configGit,
  configGPGAgent,
  getGPGInfo,
  getPrivateKeyInfo,
  importGPGKey,
  printFingerprint,
  setGPGTrustLevel,
  setWorkdir
}
