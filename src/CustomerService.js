`use strict`;

module.exports = class CustomerService {
  constructor(apiReference) {
    this.api = apiReference
  }  

  async list() {
    // TODO : handle arguments
    return await this.api.send('customers/query')
  }
  async post() {

    const body = {fullname:"emil georgi",autobill:true}

    return await this.api.post('customers', body)
  }
}
