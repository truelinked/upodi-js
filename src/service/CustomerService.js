`use strict`;

module.exports = class CustomerService {
  constructor(apiReference) {
    this.api = apiReference
    this.name = 'customers'

  }

  async list(opt) {

    opt = opt || {}
    opt.pagesize = opt.pagesize || 100
    opt.pagenumber = opt.pagenumber || 1

    return await this.api.get('customers', opt)
  }

  async create() {

    if (arguments.length === 3) {
      return (await this.createStandard(arguments[0], arguments[1], arguments[2]))
    }

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      return (await this.createFullCustomer(arguments[0]))
    }

    throw new TypeError('Invalid parameters for creating customer')

  }

  async getByAccountNumber(accNumber) {
    if (!accNumber) {
      throw new Error('Invalid account number')
    }
    
    return await this.api.get(`customers/byaccountnumber/${accNumber}`, {}) 
  }

  async getPaymentMethods(customerId) {
    if (!customerId) {
      throw new Error('Invalid customerId')
    }
    
    return await this.api.get(`customers/${customerId}/paymentmethods`, {}) 
  }

  async createStandard(accountnumber, fullname, currencycode) {

    return (await this.createFullCustomer({
      accountnumber,
      fullname,
      currencycode,
      autobill: true
    }))

  }

  async createFullCustomer(customer) {

    customer.autobill = true

    if (!customer.fullname) {
      throw new Error('Missing customer name')
    }

    return (await this.api.post('customers', customer))

  }
}
