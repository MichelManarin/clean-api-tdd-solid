// força o intelisense compreender o campo setado no proxy do request do express
declare namespace Express {
  interface Request {
    accountId?: string
  }
}
