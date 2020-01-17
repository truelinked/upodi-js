`use strict`;

module.exports = class InvoiceService {
  constructor(apiReference) {
    this.api = apiReference
    this.name = 'invoices'

  }

  async list(opt) {

    opt = opt || {}
    opt.$pagesize = opt.pagesize || 100
    opt.$pagenumber = opt.pagenumber || 1

    return await this.api.get('invoices', opt)
  }

  async query(opt) {
    opt = opt || {}
    var query = {}
    query.pagesize = opt.pagesize || 100
    query.pagenumber = opt.pagenumber || 1
    
    if (opt.CustomerID) {
      query.$filter = `CustomerID eq guid'${opt.CustomerID}'`
    }

    return await this.api.get('invoices/query', query)
  }
}
