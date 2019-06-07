import { createTransform } from 'redux-persist'
import CryptoJSCore from 'crypto-js/core'
import AES from 'crypto-js/aes'
import { makeEncryptor, makeDecryptor } from './helpers'

const makeSyncEncryptor = secretKey =>
  makeEncryptor(state => AES.encrypt(state, secretKey).toString())

const makeSyncDecryptor = (secretKey, onError) =>
  makeDecryptor(state => {
    try {
      const bytes = AES.decrypt(state, secretKey)
      const decryptedString = bytes.toString(CryptoJSCore.enc.Utf8)

      let dString
      if (
        decryptedString.includes('T') &&
        decryptedString.includes(':') &&
        decryptedString.includes('-') &&
        decryptedString.includes('+')
      ) {
        // dates cannot be JSON parsed by default
        dString = new Date(decryptedString)
      }
      if (dString && isValidDate(dString)) {
        return decryptedString
      } else {
        return JSON.parse(decryptedString)
      }
    } catch (err) {
      throw new Error(`Could not decrypt state. More info: ${err.message}`)
    }
  }, onError)

function isValidDate(d) {
  return d instanceof Date && !isNaN(d)
}

export default config => {
  const inbound = makeSyncEncryptor(config.u)
  const outbound = makeSyncDecryptor(config.u, config.onError)
  return createTransform(inbound, outbound, config)
}
