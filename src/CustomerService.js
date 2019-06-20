`use strict`;

module.exports = class CustomerService {
  constructor(apiReference) {
    this.api = apiReference
  }  

  async list() {
    // TODO : handle arguments
    return await this.api.get('/customers/query')
  }
}
