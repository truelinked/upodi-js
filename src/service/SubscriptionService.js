`use strict`;

module.exports = class SubscriptionService {
  constructor(apiReference) {
    this.api = apiReference
    this.name = 'subscriptions'
  }

  async list(opt) {

    opt = opt || {}
    opt.$pagesize = opt.pagesize || 100
    opt.$pagenumber = opt.pagenumber || 1

    return await this.api.get('subscriptions', opt)
  }

  async query(opt) {

    opt = opt || {}

    var query = {}
    query.pagesize = opt.pagesize || 100
    query.pagenumber = opt.pagenumber || 1

    let filter = [];
    if (opt.CustomerID) {
      filter.push(`CustomerID eq guid'${opt.CustomerID}'`);
    }

    if(opt.StateCode) {
      filter.push(`StateCode eq '${opt.StateCode}'`);
    }

    query.$filter = filter.join(' and ');

    return await this.api.get('subscriptions/query', query)
  }

  async create() {

    if (arguments.length === 2) {
      return (await this.createStandard(arguments[0], arguments[1]))
    }

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      return (await this.createFullSubscription(arguments[0]))
    }

    throw new Error('Invalid parameters for creating subscriptions')

  }

  async createStandard(customerid, productplanid) {

    return (await this.createFullSubscription({
      customerid: customerid,
      productplanid: productplanid,
      autorenew: true,
      initialterminterval: 12,
      initialtermperiod: 300,
      initialterm: "12 months",
      renewalterminterval: 12,
      renewaltermperiod: 300,
      renewalterm: "12 months"
    }))

  }

  async createFullSubscription(subscription) {

    if (!subscription.customerid) {
      throw new Error('Missing customerid')
    }
    if (!subscription.productplanid) {
      throw new Error('Missing productplanid')
    }
    return (await this.api.post('subscriptions', subscription))

  }

  async get(subscriptionId) {
    if (!subscriptionId) {
      throw new Error('missing subscriptionId')
    }

    return (await this.api.get(`subscriptions/${subscriptionId}`))
  }

  async delete(subscriptionId) {
    if (!subscriptionId) {
      throw new Error('missing subscriptionId')
    }

    return (await this.api.delete(`subscriptions/${subscriptionId}`))
  }

  async activate(subscriptionId) {
    if (!subscriptionId) {
      throw new Error('missing subscriptionId')
    }

    return (await this.api.put(`subscriptions/${subscriptionId}/activate`))
  }

  async cancel(subscriptionId) {
    if (!subscriptionId) {
      throw new Error('missing subscriptionId')
    }

    return (await this.api.put(`subscriptions/${subscriptionId}/cancel`))
  }

  async expire(subscriptionId) {
    if (!subscriptionId) {
      throw new Error('missing subscriptionId')
    }

    return (await this.api.put(`subscriptions/${subscriptionId}/expire`))
  }

  async hold(subscriptionId) {
    if (!subscriptionId) {
      throw new Error('missing subscriptionId')
    }

    return (await this.api.put(`subscriptions/${subscriptionId}/hold`))
  }

  async resume(subscriptionId) {
    if (!subscriptionId) {
      throw new Error('missing subscriptionId')
    }

    return (await this.api.put(`subscriptions/${subscriptionId}/hold`))
  }
}