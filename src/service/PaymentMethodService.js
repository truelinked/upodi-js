`use strict`;

module.exports = class PaymentMethodService {
  constructor(apiReference) {
    this.api = apiReference
    this.name = 'paymentMethods'

  }

  async list(opt) {

    opt = opt || {}
    opt.$pagesize = opt.pagesize || 100
    opt.$pagenumber = opt.pagenumber || 1

    return await this.api.get(`paymentmethods`, opt)
  }

  async create() {

    if (arguments.length === 2 && typeof arguments[1] === 'object') {
      return (await this.createFull(arguments[0], arguments[1]))
    }

    throw new Error('Invalid parameters for creating payment method')
  }

  async delete(paymentMethodId) {
    return (await this.api.delete(`paymentmethods/${paymentMethodId}`))
  }

  async createFull(customerId, paymentmethod) {

    return (await this.api.post(`paymentmethods/${customerId}`, paymentmethod))

  }
}
