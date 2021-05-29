import * as aes256 from 'aes256'

export function encrypt (passwort, dienststelle, daten) {
  const key = `${passwort}-${dienststelle}`
  return aes256.encrypt(key, daten)
}

export function decrypt (passwort, dienststelle, daten) {
  const key = `${passwort}-${dienststelle}`
  return aes256.decrypt(key, daten)
}
