export class GoogleSearchLink {
  constructor (input) {
    this.input = input
  }

  static get base () {
    return 'https://google.com/search'
  }

  get link () {
    return `${GoogleSearchLink.base}?q=${this.input}`
  }
}
