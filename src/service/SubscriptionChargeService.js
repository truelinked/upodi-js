`use strict`;

module.exports = class SubscriptionChargesService {
  constructor(apiReference) {
    this.api = apiReference
    this.name = 'subscriptionCharges'

  }

  async list(opt) {

    opt = opt || {}
    opt.$pagesize = opt.pagesize || 100
    opt.$pagenumber = opt.pagenumber || 1

    return await this.api.get('subscriptioncharges', opt)
  }

  async query(opt) {
    opt = opt || {}
    var query = {}
    query.pagesize = opt.pagesize || 100
    query.pagenumber = opt.pagenumber || 1

    var filter = []
    
    if (opt.SubscriptionID) {
      filter.push(`SubscriptionID eq guid'${opt.SubscriptionID}'`)
    }

    if (opt.NextCharge) {
      if (opt.NextCharge.from || opt.NextCharge.to) {

        if (opt.NextCharge.from) {
          filter.push(`NextChargeDate gt guid'${opt.NextCharge.from}'`)
        }

        if (opt.NextCharge.to) {
          filter.push(`NextChargeDate lt guid'${opt.NextCharge.to}'`)
        }
      }else {
        throw new Error('Invalid NextChargeQuery')
      }
    }

    if (filter.length>0) {
      query.$filter = filter.join(' or ')
    } 

    return await this.api.get('subscriptioncharges/query', query)
  }

  async set(subscriptionChargeId, obj) {
    return await this.api.put(`subscriptioncharges/${subscriptionChargeId}`, obj)
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