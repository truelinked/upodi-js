`use strict`;

module.exports = class TransactionService {
  constructor(apiReference) {
    this.api = apiReference
    this.name = 'transactions'

  }

  async query(opt) {

    opt = opt || {}

    var query = {}
    query.pagesize = opt.pagesize || 100
    query.pagenumber = opt.pagenumber || 1

    if (opt.CustomerID) {
      query.$filter = `CustomerID eq guid'${opt.CustomerID}'`
    }

    if (opt.InvoiceID) {
      query.$filter = `InvoiceID eq guid'${opt.InvoiceID}'`
    }

    return await this.api.get('transactions/query', query)
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
