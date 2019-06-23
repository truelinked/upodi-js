`use strict`;

module.exports = class PaymentMethodService {
  constructor(apiReference) {
    this.api = apiReference
  }

  async list(customerId, opt) {
    opt = opt || {}
    opt.pagesize = opt.pagesize || 100
    opt.pagenumber = opt.pagenumber || 1

    return await this.api.get(`paymentmethods/${customerId}`, opt)
  }

  async create() {

    if (arguments.length === 2 && typeof arguments[1] === 'object') {
      return (await this.createFull(arguments[0], arguments[1]))
    }

    throw new Error('Invalid parameters for creating payment method')

  }

  async createFull(customerId, paymentmethod) {

    return (await this.api.post(`paymentmethods/${customerId}`, paymentmethod))

  }
}
