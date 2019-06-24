`use strict`;

module.exports = class Productplan {
  constructor(apiReference) {
    this.api = apiReference
  }

  async list(opt) {
    
    opt = opt || {}
    opt.pagesize = opt.pagesize || 100
    opt.pagenumber = opt.pagenumber || 1

    return await this.api.get('productplans', opt)
  }
}
