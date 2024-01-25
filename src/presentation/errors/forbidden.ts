export class Forbidden extends Error {
  constructor () {
    super('Forbidden')
    this.name = 'ForbiddenError'
  }
}
