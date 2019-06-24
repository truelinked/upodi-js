`use strict`;

module.exports = class Subscription {
  constructor(apiReference) {
    this.api = apiReference
  }

  async list(opt) {
    
    opt = opt || {}
    opt.pagesize = opt.pagesize || 100
    opt.pagenumber = opt.pagenumber || 1

    return await this.api.get('subscriptions', opt)
  }


  async create() {

    if (arguments.length === 2) {
      return (await this.createStandard(arguments[0], arguments[1]))
    }

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      return (await this.createFullSubscription(arguments[0]))
    }

    throw new Error('Invalid parameters for creating customer')

  }

  async createStandard(customerid, productplanid) {

    return (await this.createFullSubscription({
      customerid:customerid,
      productplanid:productplanid,
      autorenew:true,
      initialterminterval:12,
      initialtermperiod:300,
      initialterm:"12 months",
      renewalterminterval:12,
      renewaltermperiod:300,
      renewalterm:"12 months"
    }))

  }

  async createFullSubscription(subscription) {
    subscription.autorenew = true
    if (!subscription.customerid) {
      throw new Error('Missing customerid')
    }
    if(!subscription.productplanid){
      throw new Error('Missing productplanid')
    }
    return (await this.api.post('subscriptions', subscription))

  }
}
