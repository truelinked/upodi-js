`use strict`;

module.exports = class TransactionService {
  constructor(apiReference) {
    this.api = apiReference
    this.name = 'transactions'

  }

  async list(opt) {

    opt = opt || {}
    opt.$pagesize = opt.pagesize || 100
    opt.$pagenumber = opt.pagenumber || 1

    return await this.api.get('transactions', opt)
  }

  async get(transactionId) {
    if (!transactionId) {
      throw new Error('missing transactionId')
    }

    return (await this.api.get(`transactions/${transactionId}`))
  }
}
