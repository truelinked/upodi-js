`use strict`;

module.exports = class DiscountService {

  constructor(apiReference) {
    this.api = apiReference
    this.name = 'discounts'
  }

  async list(opt) {
    opt = opt || { };

    opt.pagesize = opt.pagesize || 100
    opt.pagenumber = opt.pagenumber || 1

    return await this.api.get(`discounts`, opt)
  }

  async get(discountId) {
    if (!discountId) {
      throw new Error('missing discountId')
    }

    return (await this.api.get(`discounts/${discountId}`))
  }

  async create(discount) {
    return (await this.api.post('discounts', discount))
  }

  async generateDiscountCode(discountId, data) {
    return (await this.api.put(`discounts/${discountId}/generatediscountcodes`, data))
  }

  async applyDiscountCode(subscriptionId, DiscountCode) {
    return (await this.api.put(`discounts/applydiscountcodesubscription/${subscriptionId}`, { DiscountCode }))
  }
}
