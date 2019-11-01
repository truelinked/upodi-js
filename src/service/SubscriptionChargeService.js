`use strict`;

module.exports = class SubscriptionChargesService {
  constructor(apiReference) {
    this.api = apiReference
    this.name = 'subscriptionCharges'

  }

  async list(opt) {

    opt = opt || {}
    opt.pagesize = opt.pagesize || 100
    opt.pagenumber = opt.pagenumber || 1

    return await this.api.get('subscriptioncharges', opt)
  }

  async query(opt) {
    opt = opt || {}
    var query = {}
    query.pagesize = opt.pagesize || 100
    query.pagenumber = opt.pagenumber || 1
    
    if (opt.SubscriptionID) {
      query.$filter = `SubscriptionID eq guid'${opt.SubscriptionID}'`
    }

    return await this.api.get('subscriptioncharges/query', query)
  }

  async set(subscriptionChargeId, obj) {
    return await this.api.put(`subscriptioncharges/${subscriptionChargeId}`, null, obj)
  }

  async setPrice(subscriptionChargeId, price) {
    return await this.set(subscriptionChargeId, {
      CustomPrice: price
    })
  }

  async setChargeDate(subscriptionChargeId, date) {
    return await this.set(subscriptionChargeId, {
      NextChargeDate: date
    })
  }
}