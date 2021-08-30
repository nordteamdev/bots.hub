import initUserMethods from './userMethods.js'

export default class {
  constructor (henta) {
    this.henta = henta
  }

  init (henta) {
    initUserMethods(this)
  }
}