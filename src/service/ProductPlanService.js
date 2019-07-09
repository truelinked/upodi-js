`use strict`;

module.exports = class ProductplanService {
  constructor(apiReference) {
    this.api = apiReference
    this.name = 'productPlans'

  }

  async list(opt) {
    
    opt = opt || {}
    opt.pagesize = opt.pagesize || 100
    opt.pagenumber = opt.pagenumber || 1

    return await this.api.get('productplans', opt)
  }
}
