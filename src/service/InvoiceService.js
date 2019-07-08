`use strict`;

module.exports = class InvoiceService {
  constructor(apiReference) {
    this.api = apiReference
    this.name = 'invoices'

  }

  async list(opt) {
    
    opt = opt || {}
    opt.pagesize = opt.pagesize || 100
    opt.pagenumber = opt.pagenumber || 1

    return await this.api.get('invoices', opt)
  }

  async create() {

    if (arguments.length === 2) {
      return (await this.createStandard(arguments[0], arguments[1]))
    }

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      return (await this.createFullCustomer(arguments[0]))
    }

    throw new Error('Invalid parameters for creating customer')

  }


  async createStandard(customerid, currencycode) {

    return (await this.createFullCustomer({
      customerid,
      currencycode,
    }))

  }

  async createFullCustomer(customer) {

    if (!customer.customerid) {
      throw new Error('Missing customer id')
    }
    if (!customer.currencycode) {
        throw new Error('Missing currencycode')
      }

    return (await this.api.post('invoices', customer))

  }
}
