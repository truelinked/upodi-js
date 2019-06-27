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
  async setAmount(subscriptionID, amout){
    return await this.api.put(`subscriptions/${subscriptionID}/resume`, null, {CustomPrice: amout})
  }
}
