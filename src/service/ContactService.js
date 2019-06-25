`use strict`;

module.exports = class ContactService {

  constructor(apiReference) {
    this.api = apiReference
    this.name = 'contacts'
  }

  async list(opt) {
    opt = opt || {}
    opt.pagesize = opt.pagesize || 100
    opt.pagenumber = opt.pagenumber || 1

    return await this.api.get(`contacts`, opt)
  }

  async create() {
    if (arguments.length === 2) {
      return (await this.createFull(arguments[0], arguments[1]))
    }

    throw new Error('Invalid parameters for creating payment method')

  }

  async createFull(customerId, fullname) {
    const contacts = {
        customerId,
        fullname
    }
    return (await this.api.post(`contacts`, contacts))

  }
}
